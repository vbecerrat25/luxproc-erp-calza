/**
 * Ambient synthesizer for simulated live studio drone / working atmosphere.
 * Uses browser Web Audio API with zero external dependencies.
 */

class AudioAmbienceEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private oscNodes: OscillatorNode[] = [];

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 2);
      this.masterGain.connect(this.ctx.destination);

      // Warm soothing harmonic chords (C-minor 9th / ambient space)
      const freqs = [130.81, 196.00, 261.63, 311.13, 392.00];

      this.oscNodes = freqs.map((freq) => {
        const osc = this.ctx!.createOscillator();
        const panner = typeof this.ctx!.createStereoPanner === 'function' ? this.ctx!.createStereoPanner() : null;
        const gain = this.ctx!.createGain();
        gain.gain.value = 0.05 / freqs.length;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

        if (panner) {
          panner.pan.value = (Math.random() * 2 - 1) * 0.4;
          osc.connect(gain);
          gain.connect(panner);
          panner.connect(this.masterGain!);
        } else {
          osc.connect(gain);
          gain.connect(this.masterGain!);
        }

        osc.start();
        return osc;
      });

      this.isPlaying = true;
    } catch {
      // Audio autoplay may be blocked until user gesture
      this.isPlaying = false;
    }
  }

  public stop() {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
      setTimeout(() => {
        this.oscNodes.forEach(o => {
          try { o.stop(); o.disconnect(); } catch { /* ignore */ }
        });
        this.oscNodes = [];
        this.isPlaying = false;
      }, 1000);
    } else {
      this.isPlaying = false;
    }
  }
}

export const ambientAudio = new AudioAmbienceEngine();

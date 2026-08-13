// Web Audio API ambient generator for Attack on Titan atmosphere

class AOTSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private masterGain: GainNode | null = null;
  private windGain: GainNode | null = null;
  private rumbleGain: GainNode | null = null;
  private droneOsc: OscillatorNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private heartbeatInterval: number | null = null;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    } catch {
      console.warn('Web Audio API not supported or blocked');
    }
  }

  public toggleSound(): boolean {
    this.init();
    if (!this.ctx || !this.masterGain) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      // Fade in master
      this.masterGain.gain.setTargetAtTime(0.4, this.ctx.currentTime, 0.5);
      this.startAtmosphericDrone();
      this.startDistantWind();
      this.startSubtleHeartbeat();
    } else {
      // Fade out
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.3);
      this.stopHeartbeat();
    }

    return !this.isMuted;
  }

  public getStatus(): boolean {
    return !this.isMuted;
  }

  private startAtmosphericDrone() {
    if (!this.ctx || !this.masterGain || this.droneOsc) return;

    try {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note - deep ominous drone

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      this.droneOsc = osc;
    } catch {
      // Ignore audio start failures
    }
  }

  private startDistantWind() {
    if (!this.ctx || !this.masterGain) return;

    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(280, this.ctx.currentTime);
      filter.Q.setValueAtTime(3.0, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      whiteNoise.start();
      this.noiseNode = whiteNoise;
      this.windGain = gain;
    } catch {
      // Ignore
    }
  }

  private startSubtleHeartbeat() {
    if (this.heartbeatInterval) return;
    this.heartbeatInterval = window.setInterval(() => {
      if (!this.isMuted) {
        this.triggerThump(45, 0.12, 0.4);
        setTimeout(() => {
          if (!this.isMuted) this.triggerThump(38, 0.08, 0.35);
        }, 220);
      }
    }, 2800);
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  public triggerThump(freq = 50, vol = 0.2, duration = 0.5) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(15, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Ignore
    }
  }

  public triggerBladeWhoosh() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {
      // Ignore
    }
  }

  public triggerSteamHiss() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.8;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.8);
      filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      whiteNoise.start();
      whiteNoise.stop(this.ctx.currentTime + 0.8);
    } catch {
      // Ignore
    }
  }

  public triggerTitanRoarRumble() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(90, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 1.2);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.2);
    } catch {
      // Ignore
    }
  }
}

export const soundEngine = new AOTSoundEngine();

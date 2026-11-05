# Appendix: Parameter Guide & MFX List

> **Source**: Roland SP-404MKII Reference Manual v5.50 (Pages 135–159)

<!-- [Page 135] -->
## Page 135

```text
Appendix

Parameter guide

SYSTEM
GENERAL


Parameter         Value                       Explanation

Edit Knob Mode    This sets how the values change when you move the knobs.

                  Catch                       When you move a knob, control data is only outputted when the position of the
                                              knob reaches or “catches up” to the value of its internal parameter.
                                               * In “Mixing the samples (DJ MODE) (p. 93)”, the knobs work in Catch mode,
                                                 regardless of the settings.

                  Direct                      When you move a knob, the control data (current position) is always outputted.

EFX Knob Mode     This sets how the values change when you move the knobs.

                  Catch                       When you move a knob, control data is only outputted when the position of the
                                              knob reaches or “catches up” to the value of its internal parameter.

                  Direct                      When you move a knob, the control data (current position) is always outputted.

                  Manual                      When you switch effects, control data corresponding to the position of the knob
                                              is outputted.

Load Project      This sets the project that loads when the unit starts up.

                  Last                        Loads the project that was used right before the power was last turned off.

                  1–16                        Loads a specified project.

Sub Pad Mode      This sets the functionality of the [SUB PAD] button in sample mode.

                  Retrig                      Retriggers the current pad (plays its sound again).

                  SkipBack                    Switches to skip-back mode.

Auto Trig Level   1–10                        Sets the level at which note input is detected (the level at which sampling
                                              automatically starts, and the level at which recording to the skip-back memory
                                              begins).

Scrn Saver Time   1, 5, 10 (min)              Sets the time before the screen saver starts (in minutes).
                                               * The pads for which samples are not set (blank pads) do not light up while the
                                                 screen saver is shown.

Scrn Saver Type   OldRave, Naminori           Selects the type of screen saver.

                  Custom                      When you select “Custom”, you can use an image file that you’ve imported as
                                              the screen image for the screen saver (Customizing the screen saver (p. 109)).

                  Disp Off                    Select “Disp Off” to turn off the display.

BPM Auto Dtct     OFF, ON                     When this is set to “ON”, the tempo (BPM) is automatically detected when you
                                              import a sample.

BPM Detect Rng    100-199, 80-159, 70-139, Selects the range at which the tempo (BPM) of a sample is automatically
                  50-99                    detected.

Pad MUTE          When Pad MUTE is on, this selects whether to monitor the muted samples.

                  Mst+Phn                     Muted samples are not outputted to any jack.

                  Master                      Muted samples can be output (monitored) from the PHONES jack. In this case,
                                              no effects are applied.

                                                                                                                            135
```

<!-- [Page 136] -->
## Page 136

```text
Appendix


Parameter             Value                      Explanation

PTN Change Mode       This sets how the samples play back when switching between patterns during pattern playback.

                      MKII                       Sample playback stops when the pattern changes.

                      SX                         Sample playback continues when the pattern changes.

Pop-up Time           Normal, Short, OFF         Sets how long the popup screens are displayed.
                                                 Set this to “Short” to make the popup screens display for a shorter time than the
                                                 “Normal” setting.
                                                 Set this to “OFF” if you don’t want popups to display.

MARK Function         This sets the function to be recalled when you press the [MARK] button.

                      SBS Def                    Recalls the skip-back sampling function (with a maximum recording time of 25
                                                 seconds).

                      SBS Long                   Recalls the skip-back sampling function (with a maximum recording time of 40
                                                 seconds).

                      Looper                     Recalls the looper function.

Reverse Type          This selects the point (time) at which reverse playback begins when you press the [REVERSE] button during
                      sample playback.

                      404                        Starts reverse playback at the sample’s end point. This works the same as the
                                                 SP-404SX.

                      303                        Starts reverse playback immediately from the playback position of the current
                                                 sample. This works the same as the SP-303.

USB IN                This selects where the audio signal input from the USB port is sent.

                      LINE IN                    Mixes the USB audio signal with the audio signal from the LINE IN jacks.

                      MIX OUT                    Mixes the USB audio signal with the MIXER output, without going through the
                                                 INPUT FX or BUS FX.

DJ Mode TS type       This lets you change how the audio is processed when changing the playback speed of a sample in DJ
                      mode.

                      VINYL                      Changes the playback speed and pitch at the same time, like an analog record.

                      BACKING                    Independently controls the playback speed and pitch.
                                                 Processes the sound as appropriate for musical instruments whose sounds have
                                                 a noticeable decay.

                      ENSEMBLE                   Independently controls the playback speed and pitch.
                                                 Processes the sound as appropriate for musical instruments that have a
                                                 sustaining sound.

Bend Sens (DJ)        10–200                     Sets how quickly the pitch of a sample changes when you press the [BEND-] and
                                                 [BEND+] pads.

FileSystem            Selects the character code for filenames that can be recognized by this unit when you import a sample.
                      The unit must be restarted once you’ve changed the settings and pressed the [EXIT] button to exit the
                      SYSTEM screen.

                      Multi-Byte                 Letters, numbers, symbols, double-byte characters (kanji, hiragana, katakana)
                                                 This lets the unit recognize and import files with filename that use double-byte
                                                 and similar characters. Note that this unit doesn’t correctly display double-byte
                                                 characters, and these characters appear garbled.

                      Latin1                     Letters, numbers, symbols
                                                 With this setting, files with double-byte characters in their filenames can’t be
                                                 recognized by this unit.

Bank Mute             OFF, ON                    When this is ON, the sound is automatically muted when a sample in another
                                                 bank is playing.

App Auto Connection   OFF, ON                    When this is ON, the unit automatically connects when you launch a third-party
                                                 app (such as Serato DJ, Koala Sampler, Melodics, etc.).


136
```

<!-- [Page 137] -->
## Page 137

```text
Appendix


Parameter         Value                      Explanation

Start-up Screen   Default, Skip              If this is set to Skip, some of the startup screens are skipped.


CLICK


Parameter         Value                      Explanation

Output Assign     OFF, ON                    When this is set to ON, the metronome sound is output from the LINE OUT jacks
                                             and from the USB port.

Click Level       1–5                        Sets the volume of the metronome.

Metronome:REC     OFF, ON                    When this is ON, the metronome sound is output while you are sampling or
                                             resampling.

Metronome:PTN     OFF, ON                    When this is ON, the metronome sound is output when a pattern is being
                                             recorded.

Count-In:REC      This selects how sampling or resampling starts.

                  OFF                        Sampling or resampling starts at the same time that you press the [REC] button.

                  1 MEAS, 2 MEAS             When you press the [REC] button, a count-in begins one or two measures before
                                             where sampling or resampling begins.

                  WAIT                       Sampling or resampling starts when you press a pad to play back a sample, or
                                             when audio is detected from an external device.

Count-In:PTN      This selects how pattern recording begins.

                  OFF                        Pattern recording starts at the same time that you press the [REC] button.

                  1 MEAS, 2 MEAS             When you press the [REC] button, a count-in of one or two measures begins
                                             before pattern recording starts.

                  WAIT                       Pattern recording starts when you press a pad to play back a sample, or when
                                             audio is detected from an external device.


MIDI


Parameter         Value                      Explanation

MIDI Sync         Specifies the tempo source.

                  Auto                       The tempo automatically synchronizes to the MIDI clocks if MIDI clocks are input
                                             via the MIDI IN connector or the USB port.

                  Internal                   The tempo specified on this unit is used.

                  MIDI                       The tempo synchronizes to the MIDI clocks received via the MIDI IN connector.

                  USB                        The tempo synchronizes to the MIDI clocks received via the USB port.

MIDI Sync Out     OFF, ON                    When this is ON, clocks, start and stop are transmitted to the device connected
                                             to this unit’s MIDI OUT connector.

SEQ Note Out      OFF, ON                    When this is set to “ON”, the note number corresponding to the pattern (pad) is
                                             output via the MIDI OUT connector when the pattern plays back.


                                                                                                                          137
```

<!-- [Page 138] -->
## Page 138

```text
Appendix


Parameter           Value                     Explanation

SYNC Delay          0–20ms                    Adjust this if there is a delay (latency) in sound between your external MIDI
                                              device and this unit.
                                              Larger values make this unit play back at a more delayed timing.
                                              When this is set to “0”, this unit plays and outputs MIDI messages with the same
                                              timing.

Bend SYNC(DJ)       This sets how the MIDI clock output from this unit changes when you press the [BEND-] or [BEND+] pads to
                    change the playback speed of this unit.

                    OFF                       MIDI clocks are output at a fixed rate.

                    ON                        MIDI clocks outputted from this unit are synchronized with this unit’s playback
                                              speed.
                                              With this setting, the tempo of MIDI devices connected externally changes in
                                              time with the playback speed of this unit.
                                               * If you press the [BEND-] [BEND+] pads while holding down the [REMAIN]
                                                 button, the MIDI clocks do not change (the effect is the same as the OFF
                                                 setting).

PAD Note Out        OFF, ON                   When this is set to “ON”, note numbers corresponding to the pads are output via
                                              the MIDI OUT connector when you play the pads.

Soft Through        OFF, ON                   If this is “ON”, MIDI messages that are input to the MIDI IN connector are output
                                              to the MIDI OUT connector.

USB-MIDI Thru       OFF, ON                   When this is “ON”, MIDI signals that are input via the USB port are output to the
                                              MIDI OUT connector. MIDI signals that are inputted via the MIDI IN connector
                                              are also outputted to the USB port.
                                              The inputted MIDI signals are also transmitted to the internal sound module at
                                              that time.

PC Rx               ON, OFF                   When this is ON, program change messages are received.

MIDI Mode           A, B                      Changes the note number assignment according to the mode you’ve selected.
                                              For details, refer to “MIDI note map (p. 170)”.

Pad MIDI Channels   1/2, 2/3–9/10, 10/11      Sets the offset value for the MIDI channel.
                                              This setting is enabled when “MIDI Mode” is set to “B”.

Note offset         -11–35                    Sets the offset value for the note number.
                                              This setting is enabled when “MIDI Mode” is set to “B”.

MIDI EXT SRC        This selects how the [EXT SOURCE] button is triggered when notes are received via an external MIDI
                    source.

                    TOGGLE                    A note-on message toggles the [EXT SOURCE] button on/off.

                    GATE                      A note-on message turns the [EXT SOURCE] button on, and a note-off message
                                              turns the [EXT SOURCE] button off.

                    THROUGH                   The [EXT SOURCE] button is not affected by external MIDI note data.


GAIN


Parameter           Value                     Explanation

Attenuator          OFF, ON                   When this is ON, the gain of the audio input from the LINE IN jacks is lowered.
                                              Turn the Attenuator on when the LINE IN input seems to be distorting.


138
```

<!-- [Page 139] -->
## Page 139

```text
Appendix


Parameter                     Value                        Explanation

Noise Gate                    Reduces the noise floor in the signal input from the LINE IN and INPUT jacks.

                              OFF                          The noise gate is not used.

                              -9dB, -12dB, -18dB           Reduces the noise floor at the specified level.

                              -Inf                         Reduces the noise floor to the bare minimum.

LINE OUT                      0, +6, +12 (dB)              Sets the gain of the audio output from the LINE OUT jacks.

PHONES OUT                    -18, -12, -6, 0, +6, +12     Sets the gain of the audio output from the PHONES OUT jacks.
                              (dB)

USB OUT                       -24, -12, 0 (dB)             Sets the gain of the audio output from the USB port.

Anti Feedback                 OFF, ON                      When this is “ON”, the anti-feedback function is enabled for the mic input.
                                                           This helps prevent mic feedback.


VERSION


Displays the version of this unit.


PAD SETTING
TRIGGER


Parameter                     Value                 Explanation

Curve Type                    Sets how the volume changes according to how hard you strike a pad.

                              Lin                   This is the standard setting. This produces the most natural balance between playing
                                                    dynamics and volume change.

                              Exp                   Compared to “Lin”, playing strongly produces a greater change in volume.

                              Log                   Compared to “Lin”, playing softly produces a greater change in volume.

                              Fix                   Sets the volume at a fixed level of 127.

Threshold                     1–100                 This sets the minimum sensitivity of the pads, at which the trigger signal is received only
                                                    when a pad is struck with at least a certain amount of force (velocity). This can be used
                                                    to prevent a pad from sounding due to vibrations from other pads.

Gain                          0–100                 The sensitivity is adjusted with the curve as-is. The larger the value, the greater the
                                                    sensitivity is when playing the pads.

Trig Span                     1–10                  Adjusts the sensitivity of the pads to repeated strikes. With lower values, the pads
                                                    detect repeated strikes within a shorter time interval. Set this value higher if you don’t
                                                    want the pad to accidentally detect repeated strikes.


                                                                                                                                              139
```

<!-- [Page 140] -->
## Page 140

```text
Appendix


LED


Parameter        Value                Explanation

LED Brightness   1–10                 Sets the brightness of the indicators on the buttons and pads. This sets the brightness
                                      when the buttons or pads are highlighted.

LED Glow         1–10                 Sets the brightness of the indicators on the buttons and pads. This sets the brightness
                                      when the buttons or pads are not highlighted.

Pad LED Mode     This selects the color of the pad illumination.

                 BUS                  Pad Color <BUS>
                                      The pads light up in the color set in “BUS COLOR”.
                                      In this mode, the pad colors change according to the bus through which the sample
                                      audio is sent.

                 PAD                  Pad Color <PAD>
                                      The pads light up in the color set in “PAD COLOR”.
                                      In this mode, the pad colors are set for individual pads (up to 16).

                 SAMPLE               Pad Color <SAMPLE>
                                      In this mode, the pad colors are set for individual samples (up to 2,560).
                                      For details, refer to “Setting the pad colors for each sample (Pad Color <SAMPLE>) (p.
                                      59)”.


BUS COLOR


Parameter        Value                        Explanation

BUS1 Color       Default, 1–127, White        Changes the pad color for each bus through which sample audio is sent.

BUS2 Color                                    This can be set for BUS 1, BUS 2 and DRY respectively.

DRY Color                                     This is enabled when Pad LED Mode is “BUS”.
                                               * Hold down the [SHIFT] button and turn the [VALUE] knob to change the value
                                                 in steps of 10.


PAD COLOR


Parameter        Value                        Explanation

PAD-1–PAD-16     Default, 1–127, White        Specifies the colors of individual pads.
                                              This is enabled when Pad LED Mode is “PAD”, and when a sample is either
                                              playing back or stopped while in sample mode.


140
```

<!-- [Page 141] -->
## Page 141

```text
Appendix


EFX SETTING
FAVORITE


Parameter         Value                      Explanation

Routing           TYPE A, TYPE B             Selects whether the connection between BUS 1 and BUS 2 is serial (TYPE A) or
                                             parallel (TYPE B).
                                             “Bus routings (p. 30)”

FAVORITE          Bypass, 1–16               Selects the slot (FAVORITE 1–16) where the BUS 3 and BUS 4 effect settings
                                             are saved.
                                             When the value is “Bypass”, the BUS 3 and BUS 4 effects are disabled.
                                             “Using effects with BUS 3, BUS 4 (FAVORITE) (p. 114)”


BUS 3, BUS 4


Parameter         Value                                                                        Explanation

EFX Type          Bypass, 303 VinylSim, 404 VinylSim, Cassette Sim, Lo-fi, Downer,             Selects the effects assigned to
                  Compressor, Equalizer, Isolator, Super Filter, Filter+Drive, WrmSaturator,   BUS 3 or BUS 4.
                  Overdrive, Distortion, Crusher, Ring Mod, SBF, Resonator, Hyper-Reso,
                                                                                               For details on the parameters of
                  Chromatic PS, Reverb, Ha-Dou, Zan-Zou, Sync Delay, TimeCtrlDly, Ko-
                                                                                               each effect, refer to “MFX List
                  Da-Ma, Tape Echo, Chorus, JUNO Chorus, Flanger, Phaser, Wah, Slicer,
                                                                                               (p. 143)”.
                  Tremolo/Pan, To-Gu-Ro, DJFX Looper, Scatter, SX Reverb, SX Delay,
                  Cloud Delay


SIDE CHAIN


Parameter      Value                                Explanation

SOURCE         DRY, BUS 1, BUS 2, BUS 3, BUS 4      Selects the bus (source bus) that activates the compression.

TARGET         OFF, DRY, BUS 1, BUS 2, BUS 3,       Selects the bus (target bus) to which the compression is applied.
               BUS 4

THRESHOLD      0–255                                Adjusts the volume threshold (threshold level) of the source bus, at which
                                                    compression is applied to the target bus. The larger the value, the lower
                                                    the threshold level is reduced, which applies compression at an even
                                                    lower volume.

RATIO          0–255                                Adjusts the compression ratio applied to the excessive level of the source
                                                    bus. Larger values apply deeper compression to the target bus, and
                                                    extreme values reduce the volume to zero.


                                                                                                                           141
```

<!-- [Page 142] -->
## Page 142

```text
Appendix


Parameter           Value                                   Explanation

RELEASE             0–255                                   Adjusts the time it takes for the compression effect to fade out (release
                                                            time). The larger this value, the more gradually the target bus volume
                                                            returns, and the effect continues for a while even after the source bus
                                                            volume falls below the threshold level.

GAIN                0.0dB–6.0dB                             Sets the amount that the final output is amplified (makeup gain). By
                                                            adjusting this, you can raise the overall volume of the sound that has
                                                            been lowered by compression.


DIRECT


Parameter               Value                                                                         Explanation

Direct FX1–Direct FX5   Filter+Drive, Resonator, Sync Delay, Isolator, DJFX Looper, Scatter,          You can assign the effects you
                        Downer, Ha-Dou, Ko-Da-Ma, Zan-Zou, To-Gu-Ro, SBF, Stopper, Tape               like to the effect buttons on the
                        Echo, TimeCtrlDly, Super Filter, WrmSaturator, 303 VinylSim, 404              top panel.
                        VinylSim, Cassette Sim, Lo-fi, Reverb, Chorus, JUNO Chorus, Flanger,
                                                                                                      For details on the parameters of
                        Phaser, Wah, Slicer, Tremolo/Pan, Chromatic PS, Hyper-Reso, Ring
                                                                                                      each effect, refer to “MFX List
                        Mod, Crusher, Overdrive, Distortion, Equalizer, Compressor, SX Reverb,
                                                                                                      (p. 143)”.
                        SX Delay, Cloud Delay, Back Spin


OTHER


Parameter               Value                                                                         Explanation

Mute Bus                Sets the scope of the mute bus.
                        “Playing a break in the performance (MUTE BUS) (p. 34)”

                        ALL                                                                           The mute bus is applied to both
                                                                                                      BUS 1 and BUS 2.

                        BUS                                                                           The mute bus is applied only to
                                                                                                      buses that are selected using
                                                                                                      the [BUS FX] button.

Input FX                Bypass, Auto Pitch (*), Vocoder (*), Harmony (*), Gt Amp Sim (*), Chorus, You can apply effects to the
                        JUNO Chorus, Reverb, TimeCtrlDly, Chromatic PS, Downer,                   audio that’s inputted to this unit.
                        WrmSaturator, 303 VinylSim, 404 VinylSim, Cassette Sim, Lo-fi,
                                                                                                  For details on the parameters of
                        Equalizer, Compressor
                                                                                                  each effect, refer to “MFX List
                        Effects marked with an (*) are for INPUT FX only.                         (p. 143)”.

Input Bus               You can configure the output destination for INPUT and LINE IN (INPUT BUS).
                        “Configuring the output destination for external input (p. 122)”

                        DRY                                                                           Sends the signal to the DRY bus
                                                                                                      (the BUS 1 and BUS 2 effects
                                                                                                      are not applied).

                        BUS1, BUS2                                                                    The signal is sent to BUS 1 or
                                                                                                      BUS 2.


142
```

<!-- [Page 143] -->
## Page 143

```text
Appendix


Parameter                      Value                                                                        Explanation

DRY Routing                    This sets the routing for audio sent to the DRY bus.

                               DRY                                                                          Audio is not sent through BUS
                                                                                                            1–BUS 4 (no effects are
                                                                                                            applied).

                               BUS3                                                                         Audio is inserted just before
                                                                                                            BUS 3. The BUS 3 and BUS 4
                                                                                                            effects are applied.

MFX TOP                        Scatter, Downer, Ha-Dou, Ko-Da-Ma, Zan-Zou, To-Gu-Ro, SBF, Stopper,          Sets the MFX that’s used when
                               Tape Echo, TimeCtrlDly, Super Filter, WrmSaturator, 303 VinylSim, 404        this unit is turned on.
                               VinylSim, Cassette Sim, Lo-fi, Reverb, Chorus, JUNO Chorus, Flanger,
                                                                                                            For details on the parameters of
                               Phaser, Wah, Slicer, Tremolo/Pan, Chromatic PS, Hyper-Reso, Ring
                                                                                                            each effect, refer to “MFX List
                               Mod, Crusher, Overdrive, Distortion, Equalizer, Compressor, SX Reverb,
                                                                                                            (p. 143)”.
                               SX Delay, Cloud Delay, Back Spin


MFX List
Filter+Drive
This is a filter with overdrive.
It cuts the specified frequencies and adds distortion.

Parameter                      Value                       Explanation

CUTOFF                         20–16000 (Hz)               Sets the cutoff frequency range in which the filter works.

RESONANCE                      0–100                       Adjusts the filter’s resonance level.
                                                           The larger the value, the more that the frequency range set in CUTOFF is
                                                           emphasized.

DRIVE                          0–100                       Adds distortion.

FLT TYPE                       Sets the type of filter.

                               HPF                         Cuts off the low frequencies.

                               LPF                         Cuts off the high frequencies.

LOW FREQ                       20–16000 (Hz)               Adjusts the frequency range that’s boosted or cut by the LOW GAIN parameter.

LOW GAIN                       -24–24 (dB)                 Adjusts the amount of boost/cut applied to the frequency range that’s set in LOW
                                                           FREQ.


Resonator
This effect uses “Karplus-Strong synthesis”, which is often used in physical modeling of sounds.
This lets you alter the sound with a maximum of six “resonators” that match different keys or chords.

Parameter                      Value                                                                 Explanation

ROOT                           C-1–G9                                                                Sets the reference pitch (root note).

BRIGHT                         0–100                                                                 Adjusts the tonal brightness.

FEEDBACK                       0–99 (%)                                                              Adjusts the amount of feedback for the
                                                                                                     effect.

CHORD                          Root, Oct, UpDn, P5, m3, m5, m7, m7oct, m0, m11, M3, M5, M7,          Sets the composite notes (chord) to
                               M7oct, M9, M11                                                        resonate.

PANNING                        0–100                                                                 Sets the panning for the resonator.

ENV MOD                        0–100                                                                 Larger values increase the amount of
                                                                                                     feedback according to the input level.


                                                                                                                                           143
```

<!-- [Page 144] -->
## Page 144

```text
Appendix


Sync Delay
Gives an echo effect in sync with the tempo.

Parameter       Value                                                                             Explanation

TIME            1/32, 1/16T, 1/32D, 1/16, 1/8T, 1/16D, 1/8, 1/4T, 1/8D, 1/4, 1/2T, 1/4D,          Sets the sound delay time.
                1/2, 1/1T, 1/2D, 1/1

FEEDBACK        0–99 (%)                                                                          Adjusts the amount of feedback for the effect.

LEVEL           0–100                                                                             Adjusts the volume of the effect sound.

L DAMP F        FLAT, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800 (Hz)                   Sets the frequency range that is attenuated
                                                                                                  each time the delay repeats.
H DAMP F        630, 800, 1000, 1250, 1600, 2000, 2500, 3150, 4000, 5000, 6300, 8000,
                10000, 12500, FLAT (Hz)


Isolator
This effect lets you cut off sounds in a specified frequency range.

Parameter                           Value                                                  Explanation

LOW                                 -INF, -41.87–+12 (dB)                                  Adjusts the amount of boost/cut in the low-frequency
                                                                                           range.

MID                                 -INF, -41.87–+12 (dB)                                  Adjusts the amount of boost/cut in the mid-frequency
                                                                                           range.

HIGH                                -INF, -41.87–+12 (dB)                                  Adjusts the amount of boost/cut in the high-frequency
                                                                                           range.


DJFX Looper
This effect loops the sound in short cycles.
You can vary the playback direction and playback speed of the input sound to get a turntable-type effect.

Parameter                    Value                          Explanation

LENGTH                       0.230–0.012 (sec)              Sets the length of the loop.

SPEED                        -100–100                       Sets the playback direction and playback speed.
                                                            The loop plays backward when this is set to a negative value, stops when this is
                                                            set to zero, and plays forward when this is set to a positive value.

LOOP SW                      OFF, ON                        Turn this ON while a sound is playing to make the sound play back in a loop, at a
                                                            length specified by the LENGTH parameter.
                                                            Turn this OFF to disable the loop.


Scatter
This effect swaps the sound played back by a loop in steps, altering its playback direction and gate length. This gives you the loop
playback a digital groove feeling.

Parameter                    Value                                                         Explanation

TYPE                         1–10                                                          Sets the scatter type.

DEPTH                        10, 20, 30, 40, 50, 60, 70, 80, 90, 100                       Adjusts the scatter depth.

SCATTER                      OFF, ON                                                       Switches the scatter effect on/off.

SPEED                        SINGLE, DOUBLE                                                Sets the scatter speed.


Downer
Cyclically slows down the audio playback speed.


144
```

<!-- [Page 145] -->
## Page 145

```text
Appendix


Parameter                    Value                                                     Explanation

DEPTH                        0–100                                                     Sets how much the playback speed should be
                                                                                       slowed down.

RATE                         2/1, 1/1, 1/2, 1/4, 1/8, 1/16, 1/32                       Sets the period at which the playback speed is
                                                                                       changed.

FILTER                       0–100                                                     Attenuates the high-frequency range.

PITCH                        OFF, ON                                                   When this is turned ON, pitches that were lowered
                                                                                       due to the change in speed are converted to their
                                                                                       original pitch.

RESONANCE                    0–100                                                     Adjusts the filter’s resonance level.
                                                                                       Increasing the value further emphasizes the effect,
                                                                                       for a more unusual sound.


Ha-Dou
This effect generates a wave-like sound based on the input audio.

Parameter                    Value                                                                           Explanation

MOD DEPTH                    0–100                                                                           Adjusts the depth of the effect
                                                                                                             sound.

TIME                         0–100                                                                           Sets the length of the effect
                                                                                                             sound.

LEVEL                        0–100                                                                           Adjusts the volume of the effect
                                                                                                             sound.

LOW CUT                      FLAT, 20, 25, 31, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500,       Sets the frequency range at
                             630, 800 (Hz)                                                                   which the effect sound is
                                                                                                             attenuated.
HIGH CUT                     630, 800, 1000, 1250, 1600, 2000, 2500, 3150, 4000, 5000, 6300, 8000,
                             10000, 12500, FLAT (Hz)

PRE DELAY                    0–100 (msec)                                                                    Sets the time it takes for the
                                                                                                             effect to sound.


Ko-Da-Ma
This creates a reverberating audio effect.

Parameter                    Value                                                                           Explanation

TIME                         1/32, 1/16T, 1/32D, 1/16, 1/8T, 1/16D, 1/8, 1/4T, 1/8D, 1/4, 1/2T, 1/4D,        Sets how much the effect sound
                             1/2, 1/1T, 1/2D, 1/1                                                            is delayed.

FEEDBACK                     0–99 (%)                                                                        Adjusts how much the effect
                                                                                                             sound is repeated.

SEND                         0–100                                                                           Adjusts the volume of sound
                                                                                                             sent to the effect.

L DAMP F                     FLAT, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800 (Hz)                 Sets the frequency range that is
                                                                                                             attenuated each time the delay
H DAMP F                     630, 800, 1000, 1250, 1600, 2000, 2500, 3150, 4000, 5000, 6300, 8000,
                                                                                                             repeats.
                             10000, 12500, FLAT (Hz)

MODE                         SINGLE, PAN                                                                     When this is set to “SINGLE”,
                                                                                                             the effect sound comes from the
                                                                                                             center; and when this is set to
                                                                                                             “PAN”, the effect sound is heard
                                                                                                             on the left and the right.


Zan-Zou
For left and right sounds, this effect applies delay to the negative phase of the sound. This gives the lingering effect of a sonic
“afterimage”.


                                                                                                                                              145
```

<!-- [Page 146] -->
## Page 146

```text
Appendix


The effect works for stereo sound, and does not have any effect on mono sound.

Parameter                   Value                                                                       Explanation

TIME                        0–100 (when the SYNC parameter is OFF)                                      Sets the sound delay time.
                            1/32, 1/16T, 1/32D, 1/16, 1/8T, 1/16D, 1/8, 1/4T, 1/8D, 1/4, 1/2T, 1/4D,
                            1/2, 1/1T, 1/2D, 1/1 (when the SYNC parameter is ON)

FEEDBACK                    0–99                                                                        Adjusts the amount of feedback
                                                                                                        for the effect.

HF DAMP                     200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3150,      Sets the frequency range at
                            4000, 5000, 6300, 8000, OFF (Hz)                                            which the effect sound is
                                                                                                        attenuated (how clearly defined
                                                                                                        the afterimage sounds).

LEVEL                       0–100                                                                       Adjusts the volume of the effect
                                                                                                        sound.

MODE                        2TAP, 3TAP, 4TAP                                                            Sets how the effect sound
                                                                                                        lingers.

SYNC                        OFF, ON                                                                     When this is ON, the effect
                                                                                                        sound synchronizes with the
                                                                                                        tempo.


To-Gu-Ro
This gives the sound an undulating effect, based on the image of a coiled-up snake.

Parameter                   Value                                                                       Explanation

DEPTH                       0–100                                                                       Adjusts how much the playback
                                                                                                        speed should be slowed down.

RATE                        0–100 (when the SYNC parameter is OFF)                                      Sets the period at which the
                                                                                                        playback speed is lowered.
                            2/1, 1/1, 1/2, 1/4, 1/8, 1/16, 1/32, 1/64, 1/128 (when the SYNC parameter
                            is ON)

RESONANCE                   0–100                                                                       Adjusts the filter’s resonance
                                                                                                        level.
                                                                                                        Increasing the value further
                                                                                                        emphasizes the effect, for a
                                                                                                        more unusual sound.

FLT MOD                     0–100                                                                       Attenuates the high-frequency
                                                                                                        range according to the playback
                                                                                                        speed.

AMP MOD                     0–100                                                                       Attenuates the volume
                                                                                                        according to the playback
                                                                                                        speed.

SYNC                        OFF, ON                                                                     When this is ON, the effect
                                                                                                        sound synchronizes with the
                                                                                                        tempo.


SBF
A sideband filter that lets specific frequency components pass through.

Parameter                   Value                              Explanation

INTERVAL                    0–100                              Sets the band interval. Larger values produce wider band intervals, and
                                                               the frequency of each band increases.

WIDTH                       0–100                              Sets the bandwidth. Larger values produce a narrower bandwidth, which
                                                               further isolates the specific frequency components that pass through the
                                                               filter.


146
```

<!-- [Page 147] -->
## Page 147

```text
Appendix


Parameter                     Value                                 Explanation

BALANCE                       100-0–0-100 (%)                       Adjusts the volume balance between the dry (original) sound and effect
                                                                    sound.

TYPE                          SBF1, SBF2, SBF3, SBF4,               Sets the range in which the filter works.
                              SBF5, SBF6

GAIN                          -INF, -52.3–+10.0 (dB)                Adjusts the volume of the effect sound.


Stopper
This effect lowers the sample playback speed, reproducing the sound of a turntable stopping.

Parameter                     Value                                 Explanation

DEPTH                         0–100                                 Adjusts how much the playback speed should be slowed down.

RATE                          4/1, 2/1, 1/1, 1/2, 1/4, 1/8, 1/16,   Sets the period at which the playback speed is changed.
                              1/32, 1/64

RESONANCE                     0–100                                 Adjusts the filter’s resonance level.
                                                                    Increasing the value further emphasizes the effect, for a more unusual
                                                                    sound.

FLT MOD                       0–100                                 Attenuates the high-frequency range according to the playback speed.

AMP MOD                       0–100                                 Lowers the volume according to the playback speed.


Tape Echo
This is a virtual tape echo effect that gives a realistic tape delay sound.
The effect simulates the tape echo section of a Roland RE-201 Space Echo.

Parameter                     Value                                 Explanation

TIME                          10–800 (msec)                         Sets the tape speed.
                                                                    Larger values make the tape speed slower, which creates a longer
                                                                    interval between delay sounds.

FEEDBACK                      0–99 (%)                              Adjusts the volume of the delay repeat sound.

LEVEL                         0–100                                 Adjusts the volume of the effect sound.

MODE                          S, M, L, S+M, S+L, M+L, S+M+L Selects the combination of playback heads to use.

W/F RATE                      0–100                                 Sets the speed of wow/flutter (the complex variation in pitch caused by
                                                                    tape wear and rotational irregularity).

W/F DEPTH                     0–100                                 Sets the depth of wow/flutter.


TimeCtrlDly
This is a delay in which the delay time can be varied smoothly.

Parameter                     Value                                                                     Explanation

TIME                          0–100 (msec) (when the SYNC parameter is OFF)                             Sets the sound delay time.
                              1/32, 1/16T, 1/32D, 1/16, 1/8T, 1/16D, 1/8, 1/4T, 1/8D, 1/4, 1/2T,
                              1/4D, 1/2, 1/1T, 1/2D, 1/1 (when the SYNC parameter is ON)

FEEDBACK                      0–99 (%)                                                                  Adjusts the amount of feedback for the
                                                                                                        effect.

LEVEL                         0–100                                                                     Sets the volume of the effect sound.

L DAMP F                      FLAT, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800 (Hz)           Sets the frequency range that is
                                                                                                        attenuated each time the delay repeats.
H DAMP F                      630, 800, 1000, 1250, 1600, 2000, 2500, 3150, 4000, 5000, 6300,
                              8000, 10000, 12500, FLAT (Hz)

SYNC                          OFF, ON                                                                   When this is ON, the effect sound
                                                                                                        synchronizes with the tempo.

                                                                                                                                            147
```

<!-- [Page 148] -->
## Page 148

```text
Appendix


Super Filter
This is a filter with an extremely sharp slope (attenuation characteristics). The cutoff frequency can be varied cyclically.

Parameter                    Value                                            Explanation

CUTOFF                       0–100                                            Sets the frequency range in which the filter works (the cutoff
                                                                              frequency). Higher values increase the frequency range.

RESONANCE                    0–100                                            Adjusts the filter’s resonance level.
                                                                              The larger the value, the more that the frequency range set in
                                                                              CUTOFF is emphasized.

FLT TYPE                     Sets the filter type.

                             LPF                                              A low-pass filter. This filter lets frequencies pass through that
                                                                              are higher than the frequency range set in CUTOFF.

                             BPF                                              A band-pass filter. This filter lets frequencies pass through
                                                                              that are near the frequency range set in CUTOFF.

                             HPF                                              A high-pass filter. This filter lets frequencies pass through that
                                                                              are higher than the frequency range set in CUTOFF.

DEPTH                        0–100                                            Sets the depth of the effect.

RATE                         0–100 (when the SYNC parameter is OFF)           Sets the cycle (period) of the effect.
                             2/1, 1/1D, 2/1T, 1/1, 1/2D, 1/1T, 1/2, 1/4D,
                             1/2T, 1/4, 1/8D, 1/4T, 1/8, 1/16D, 1/8T, 1/16,
                             1/32D, 1/16T, 1/32, 1/32T, 1/64, 1/64T
                             (when the SYNC parameter is ON)

SYNC                         OFF, ON                                          When this is ON, the effect sound synchronizes with the
                                                                              tempo.


WrmSaturator
This is a saturator effect with a characteristic warm sound.

 NOTE
This effect may output a very loud sound, depending on how the parameters are set. Use caution not to raise the values too much.

Parameter                          Value                           Explanation

DRIVE                              0–48 (dB)                       Adjusts the strength of the distortion.

Eq LOW                             -24–24 (dB)                     Adjusts the amount of boost/cut for the low-frequency range.

Eq HIGH                            -24–24 (dB)                     Adjusts the amount of boost/cut for the high-frequency range.

LEVEL                              0–100                           Adjusts the volume of the effect sound.


303 VinylSim
This effect models the Vinyl Sim effect of the SP-303. The effect simulates the sound of an analog record playing.

Parameter                          Value                           Explanation

COMP                               0–100                           Sets the compression feel, a unique part of the analog record’s sound.

NOISE                              0–100                           Adjusts the volume of the noise.

WOW FLUT                           0–100                           Sets the inconsistencies (wow/flutter) heard when the analog record
                                                                   “rotates”.

LEVEL                              0–100                           Adjusts the volume of the effect sound.


404 VinylSim
This effect models the Vinyl Sim effect of the SP-404SX. The effect simulates the sound of an analog record playing.


148
```

<!-- [Page 149] -->
## Page 149

```text
Appendix


Parameter                          Value                       Explanation

FREQUENCY                          0–100                       Sets the frequency characteristics of the playback system.

NOISE                              0–100                       Adjusts the volume of the noise.

WOW FLUT                           0–100                       Sets the inconsistencies (wow/flutter) heard when the analog record
                                                               “rotates”.


Cassette Sim
This effect simulates the sound of a cassette tape playing.

Parameter                          Value                       Explanation

TONE                               0–100                       Sets the tone.

HISS                               0–100                       Adjusts the volume of the noise.

AGE                                0–60 (years)                Sets how many years the cassette tape has deteriorated.

DRIVE                              0–100                       Adjusts the amount of distortion.

WOW FLUT                           0–100                       Sets the inconsistencies (wow/flutter) heard when the cassette tape
                                                               plays back.

Catch                              0–100                       Sets how much the cassette tape has stretched out.


Lo-fi
Degrades the tonal character.

Parameter                   Value                                                        Explanation

PRE FILT                    1–6                                                          Sets the type of pre-filter (the filter that the
                                                                                         sound passes through before effects are
                                                                                         applied).

LOFI TYPE                   1–9                                                          Larger settings cause more tonal degradation.

TONE                        -100–100                                                     Sets the tone. Larger settings emphasize the
                                                                                         high-frequency range. Smaller settings
                                                                                         emphasize the low-frequency range.

CUTOFF                      200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000,   Sets the frequency range in which the post-
                            2500, 3150, 4000, 5000, 6300, 8000 (Hz)                      filter (the filter that the sound passes through
                                                                                         after effects are applied) works.

BALANCE                     100-0–0-100 (%)                                              Adjusts the volume balance between the dry
                                                                                         (original) sound and effect sound.

LEVEL                       0–100                                                        Adjusts the volume of the effect sound.


 NOTE
This effect may output a very loud sound, depending on how the parameters are set. Use caution not to raise the values too much.


Reverb
This adds reverberation to the sound.

Parameter                         Value                              Explanation

TYPE                              AMBI, ROOM, HALL1, HALL2           Sets the type of reverb.

TIME                              0–100                              Sets the reverb time.

LEVEL                             0–100                              Adjusts the volume of the effect sound.

LOW CUT                           FLAT, 20–800 (Hz)                  Sets the frequency range at which the effect sound is attenuated.

HIGH CUT                          630–12500, FLAT (Hz)

PRE DELAY                         0–100 (ms)                         Sets the time before the effect sound is output.


                                                                                                                                        149
```

<!-- [Page 150] -->
## Page 150

```text
Appendix


Chorus
Adds spaciousness and richness to the sound.

Parameter                       Value                      Explanation

DEPTH                           0–100                      Sets the depth of the effect sound.

RATE                            0.33–2.30 (sec)            Sets the cycle (period) of the effect sound.

BALANCE                         100-0–0-100 (%)            Adjusts the volume balance between the dry (original) sound and effect sound.

EQ LOW                          -15–15 (dB)                Adjusts the amount of boost/cut of the low-frequency range.

EQ HIGH                         -15–15 (dB)                Adjusts the amount of boost/cut of the high-frequency range.

LEVEL                           0–100                      Adjusts the volume of the effect sound.


JUNO Chorus
This effect models the chorus section of the Roland JUNO-106 and JX series.

Parameter                      Value                                         Explanation

MODE                           JUNO 1, JUNO 2, JUNO12, JX-1 1, JX-1          Sets the type of effect.
                               2

NOISE                          0–100                                         Adjusts the volume of noise generated by the effect.

BALANCE                        100-0–0-100 (%)                               Adjusts the volume balance between the dry (original) sound
                                                                             and effect sound.


Flanger
This effect creates modulation like a jet airplane taking off and landing.

Parameter                    Value                                                     Explanation

DEPTH                        0–100                                                     Sets the depth of the effect sound.

RATE                         0–100 (when the SYNC parameter is OFF)                    Sets the cycle (period) of the effect sound.
                             4.000–0.016 (bar; when the SYNC parameter is ON)

MANUAL                       0–100                                                     Sets the frequency range in which the effect is
                                                                                       applied.
                                                                                       Smaller values reduce the flanging effect in the low
                                                                                       end.

RESONANCE                    0–100                                                     Adjusts the filter’s resonance level.
                                                                                       Increasing the value further emphasizes the effect,
                                                                                       for a more unusual sound.

BALANCE                      100-0–0-100 (%)                                           Adjusts the volume balance between the dry
                                                                                       (original) sound and effect sound.

SYNC                         OFF, ON                                                   When this is ON, the effect sound synchronizes with
                                                                                       the tempo.


Phaser
This effect creates modulation by adding a phase-shifted sound.

Parameter                    Value                                                     Explanation

DEPTH                        0–100                                                     Sets the depth of the effect sound.

RATE                         0–100 (when the SYNC parameter is OFF)                    Sets the cycle (period) of the effect sound.
                             4.000–0.016 (bar; when the SYNC parameter is ON)


150
```

<!-- [Page 151] -->
## Page 151

```text
Appendix


Parameter                    Value                                                   Explanation

MANUAL                       0–100                                                   Sets the frequency range in which the effect is
                                                                                     applied.
                                                                                     Larger values reduce the phasing effect in the low
                                                                                     end.

RESONANCE                    0–100                                                   Adjusts the filter’s resonance level.
                                                                                     Increasing the value further emphasizes the effect,
                                                                                     for a more unusual sound.

BALANCE                      100-0–0-100 (%)                                         Adjusts the volume balance between the dry
                                                                                     (original) sound and effect sound.

SYNC                         OFF, ON                                                 When this is ON, the effect sound synchronizes with
                                                                                     the tempo.


Wah
This effect gives a wah-wah sound, by cyclically changing the tone.

Parameter                    Value                                                   Explanation

PEAK                         0–100                                                   Larger values narrow the frequency range at which
                                                                                     the effect is applied.

RATE                         0–100 (when the SYNC parameter is OFF)                  Sets the cycle (period) of the effect.
                             1.000–0.010 (bar; when the SYNC parameter is ON)

MANUAL                       0–100                                                   Sets the frequency range in which the effect is
                                                                                     applied.

DEPTH                        0–100                                                   Sets the depth of the effect.

FLT TYPE                     Sets the filter type.

                             LPF                                                     Applies the effect over a wide frequency range.

                             BPF                                                     Applies the effect over a narrow frequency range.

SYNC                         OFF, ON                                                 When this is ON, the effect sound synchronizes with
                                                                                     the tempo.


Slicer
This slices the sound up into small pieces, creating the impression that a backing phrase is being played.
This slices up the sound at certain intervals into 16 parts (16 steps), breaking the sound into a rhythm that follows the sequence pattern (a
pattern used for slicing up the sound). This is effective when used with sustaining sounds.

Parameter                    Value                                                   Explanation

PATTERN                      1–32                                                    Sets the sequence pattern.

SPEED                        0–100 (when the SYNC parameter is OFF)                  Sets the period over which the sequence pattern
                                                                                     repeats.
                             2/1–1/64T (when the SYNC parameter is ON)

DEPTH                        0–100                                                   Sets the slicing depth. Larger settings make the
                                                                                     slicing effect more prominent.

SHUFFLE                      0–100                                                   Larger settings delay the timing of even-numbered
                                                                                     steps (2, 4...).

MODE                         Sets how the volume changes when the next step sounds.

                             LEGATO                                                  The volume is not changed between steps.

                             SLASH                                                   The volume is reset to zero before the next step
                                                                                     sounds (at the boundary between steps).

SYNC                         OFF, ON                                                 When this is ON, the effect sound synchronizes with
                                                                                     the tempo.


                                                                                                                                        151
```

<!-- [Page 152] -->
## Page 152

```text
Appendix


Tremolo/Pan
Cyclically varies the volume or panning.

Parameter                    Value                                                      Explanation

DEPTH                        0–100                                                      Sets the depth of the effect.

RATE                         0–100 (when the SYNC parameter is OFF)                     Sets the cycle (period) of the effect.
                             1.000–0.010 (when the SYNC parameter is ON)

TYPE                         Sets the type of effect.

                             TRE                                                        Cyclically changes the volume (tremolo).

                             PAN                                                        Cyclically changes the panning.

WAVE                         Sets how the effect modulates the sound.

                             TRI                                                        Triangle wave

                             SQR                                                        Square wave

                             SIN                                                        Sine wave

                             SAW1, SAW2                                                 Sawtooth wave

                             TRP                                                        Trapezoidal wave

SYNC                         OFF, ON                                                    When this is ON, the effect sound synchronizes with
                                                                                        the tempo.


Chromatic PS
A two-voice pitch shifter that changes the pitch in semitone steps.

Parameter                            Value                                Explanation

PITCH1, PITCH2                       -24–12 (semi)                        Adjusts the amount that PITCH1 or PITCH2 is pitch-shifted.

BALANCE                              100-0–0-100 (%)                      Adjusts the volume balance between the dry (original) sound and
                                                                          effect sound.

PAN1, PAN2                           L50–R50                              Sets the panning of PITCH1 or PITCH2.


Hyper-Reso
This is a resonator effect that is adjusted to make creating melodies and bass lines easier.

Parameter                    Value                                                      Explanation

NOTE                         -17– -1, 1–18                                              Sets which note in the chromatic scale should
                                                                                        resonate, counting from the root of the SCALE value.

SPREAD                       UNISON, TINY, SMALL, MEDIUM, HUGE                          Sets the octave of the resonator.

CHARACTER                    0–100                                                      Adjusts the brightness and detuning of the sound.

SCALE                        C Maj–B Maj, C min–B min                                   Sets the composite notes (chord) to resonate.

FEEDBACK                     0–99 (%)                                                   Adjusts the amount of feedback for the effect.

ENV MOD                      0–100                                                      Larger values increase the amount of feedback
                                                                                        according to the input level.


Ring Mod
This effect alters the tonal character to make the sound more metallic.

Parameter                      Value                          Explanation

FREQUENCY                      0–100                          Sets the frequency range to which the effect is applied.

SENS                           0–100                          Adjusts the volume of the effect sound.


152
```

<!-- [Page 153] -->
## Page 153

```text
Appendix


Parameter                         Value                  Explanation

BALANCE                           100-0–0-100 (%)        Adjusts the volume balance between the dry (original) sound and effect
                                                         sound.

POLARITY                          OFF, ON                Sets the direction in which the frequency modulation moves.

EQ LOW                            -15–15 (dB)            Adjusts the amount of boost/cut of the low-frequency range.

EQ HIGH                           -15–15 (dB)            Adjusts the amount of boost/cut of the high-frequency range.


Crusher
Produces a lo-fi effect.

Parameter                       Value               Explanation

FILTER                          331–15392 (Hz)      Sets the frequency range in which the pre-filter (the filter that the sound passes
                                                    through before effects are applied) works.

RATE                            0–100               Sets the sample rate of the effect. Larger values make the sample rate lower, for
                                                    a more lo-fi sound.

BALANCE                         100-0–0-100 (%)     Adjusts the volume balance between the dry (original) sound and effect sound.


Overdrive
Mildly distorts the sound.

Parameter                       Value               Explanation

DRIVE                           0–100               Adjusts the amount of distortion.

TONE                            -100–100            Sets the tone. Larger settings emphasize the high-frequency range. Smaller
                                                    settings emphasize the low-frequency range.

BALANCE                         100-0–0-100 (%)     Adjusts the volume balance between the dry (original) sound and effect sound.

LEVEL                           0–100               Adjusts the volume of the effect sound.


Distortion
Intensely distorts the sound.

Parameter                       Value               Explanation

DRIVE                           0–100               Adjusts the amount of distortion.

TONE                            -100–100            Sets the tone. Larger settings emphasize the high-frequency range. Smaller
                                                    settings emphasize the low-frequency range.

BALANCE                         100-0–0-100 (%)     Adjusts the volume balance between the dry (original) sound and effect sound.

LEVEL                           0–100               Adjusts the volume of the effect sound.


Equalizer
This is a three-band equalizer.

Parameter                       Value                                                                        Explanation

LOW GAIN                        -15–15 (dB)                                                                  Adjusts the amount of
                                                                                                             boost/cut of the low-
                                                                                                             frequency range.

MID GAIN                        -15–15 (dB)                                                                  Adjusts the amount of
                                                                                                             boost/cut of the mid-
                                                                                                             frequency range.

HIGH GAIN                       -15–15 (dB)                                                                  Adjusts the amount of
                                                                                                             boost/cut of the high-
                                                                                                             frequency range.


                                                                                                                                   153
```

<!-- [Page 154] -->
## Page 154

```text
Appendix


Parameter                    Value                                                                                   Explanation

LOW FREQ                     20, 25, 31, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400 (Hz)                      Sets the low-frequency
                                                                                                                     range.

Mid Freq                     200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3150, 4000,            Sets the mid-frequency
                             5000, 6300, 8000 (Hz)                                                                   range.

HIGH FREQ                    2000, 2500, 3150, 4000, 5000, 6300, 8000, 10000, 12500, 16000 (Hz)                      Sets the high-frequency
                                                                                                                     range.


Compressor
This effect reduces high volume levels while bringing up the level of quieter sounds, smoothing out any variations in overall volume.

Parameter                  Value            Explanation

SUSTAIN                    0–100            Sets how long the effect is applied to the decaying sound.

ATTACK                     0–100            Sets how long it takes to reduce the volume when a high input level is detected.

RATIO                      0–100            Sets the compression ratio.

LEVEL                      0–100            Adjusts the volume of the effect sound.


 NOTE
This effect may output a very loud sound, depending on how the parameters are set. Use caution not to raise the values too much.


SX Reverb
This adds reverberation to the sound.
As with the SP-404SX, you can adjust the volume balance between the dry (original) sound and the effect sound with this effect.

Parameter                   Value                         Explanation

TIME                        0–100                         Sets the reverb time.

TONE                        -100–100                      Adjusts the tonal character of the reverb.

BALANCE                     100-0–0-100 (%)               Adjusts the volume balance between the dry (original) sound and effect sound.


SX Delay
Gives an echo effect in sync with the tempo.
As with the SP-404SX, you can adjust the volume balance between the dry (original) sound and the effect sound with this effect.

Parameter                    Value                                                                     Explanation

TIME                         1/32, 1/16T, 1/32D, 1/16, 1/8T, 1/16D, 1/8, 1/4T, 1/8D, 1/4, 1/2T,        Sets the sound delay time.
                             1/4D, 1/2, 1/1T, 1/2D, 1/1

FEEDBACK                     0–99 (%)                                                                  Adjusts the amount of feedback for the
                                                                                                       effect.

BALANCE                      100-0–0-100 (%)                                                           Adjusts the volume balance between
                                                                                                       the dry (original) sound and effect
                                                                                                       sound.


Cloud Delay
Adds multiple delays to the dry sound, as well as reverberations for a thick “cloudy” effect.

Parameter                           Value                          Explanation

WINDOW                              0–100                          Adjusts the interval for the delayed sound.
                                                                   Larger settings produce a deeper reverberation.

PITCH                               -12.0–+12.0                    Adjusts the volume of the pitch shifter for the effect sound.


154
```

<!-- [Page 155] -->
## Page 155

```text
Appendix


Parameter                          Value                        Explanation

BALANCE                            100-0–0-100 (%)              Adjusts the volume balance between the dry (original) sound and effect
                                                                sound.

FEEDBACK                           -100–100                     Adjusts the amount of feedback for the effect.

CLOUDY                             0–100                        Adjusts the thickness of the effect sound.

LOFI                               OFF, ON                      When this is ON, the tonal character of the effect sound is degraded.


Back Spin
This gives the effect of spinning a record backwards.

Parameter                   Value                       Explanation

LENGTH                      1/1, 1/2, 1/4, 1/8, 1/16    Sets the length of the back spin.

SPEED                       0–100                       Sets the speed of the back spin.

BACK SW                     OFF, ON                     If you turn this ON while a sound is playing, the back spin plays for a length of
                                                        time specified by the LENGTH parameter.
                                                        Turn this OFF to disable the back spin.
                                                         MEMO
                                                        After switching to this effect, the sample must be played back (charged) for up to
                                                        approximately three seconds.
                                                        The BACK SW parameter blinks during charging.


DJFX Delay
This is a combination effect that uses both DJFX Looper (p. 144) and TimeCtrlDly (p. 147).

Parameter                   Value                                     Explanation

LENGTH                      0.230–0.012 (sec)                         Sets the length of the loop.

TIME                        0–100 (msec) (when the SYNC               Sets the sound delay time.
                            parameter is OFF)
                            1/32, 1/16T, 1/32D, 1/16, 1/8T, 1/16D,
                            1/8, 1/4T, 1/8D, 1/4, 1/2T, 1/4D, 1/2,
                            1/1T, 1/2D, 1/1 (when the SYNC
                            parameter is ON)

LOOP SW                     OFF, ON                                   Turn this ON while a sound is playing to make the sound play back
                                                                      in a loop, at a length specified by the LENGTH parameter.
                                                                       * Delay is applied only when LOOP SW is ON. Turn this OFF to
                                                                         disable the loop.

FEEDBACK                    0–99                                      Adjusts the amount of feedback for the delay.

LEVEL                       0–100                                     Sets the volume of the delay.

SYNC                        OFF, ON                                   When this is ON, the effect sound synchronizes with the tempo.


Auto Pitch
Processes the human voice to create a variety of characters.
 * This is enabled with INPUT FX.

Parameter                   Value                                     Explanation

PITCH                       -100–100                                  Sets the pitch of the voice. You can change the pitch up and down
                                                                      one octave.

                                                                                                                                        155
```

<!-- [Page 156] -->
## Page 156

```text
Appendix


Parameter                   Value                                   Explanation

FORMANT                     -100–100                                Sets the formant of the voice. Lower settings give a more
                                                                    masculine vocal character, and higher settings give a more
                                                                    feminine vocal character.

BALANCE                     100-0–0-100 (%)                         Adjusts the volume balance between the dry (original) sound and
                                                                    effect sound.

AT PITCH                    0–100                                   Adjusts the strength at which the pitch is corrected.

KEY                         CHROMA, A, B³, B, C, D³, D, E³, E, F,   Adjusts the key to which the pitch is corrected.
                            G³, G, A³

ROBOT                       OFF, ON                                 When this is turned ON, the inputted voice is altered to a voice
                                                                    without inflection, staying at the same pitch.


Vocoder
Changes the voice to a vocoder voice.
 * This is enabled with INPUT FX.

Parameter                   Value                                   Explanation

NOTE                        -17– -1, 1–18                           Sets which note in the chromatic scale should sound, counting
                                                                    from the root of the SCALE value. The scale and chord structure
                                                                    that is used depends on the SCALE and CHORD settings.
                                                                     MEMO
                                                                    The NOTE value can be controlled via note messages from a MIDI
                                                                    keyboard connected to the MIDI IN connector, a computer
                                                                    connected via USB, a DAW app running on an iOS device and so
                                                                    on.
                                                                    At that time, you can send pitch bend messages to continuously
                                                                    change the pitch.
                                                                    For note messages (Note Number = 0–127) and pitch bend
                                                                    messages, set the MIDI channel on your external device to “11”.

FORMANT                     -100–100                                Adjusts the formant of the voice. Lower settings give a more
                                                                    masculine vocal character, and higher settings give a more
                                                                    feminine vocal character.

TONE                        -100–100                                Adjusts the brightness of the effect sound.

SCALE                       C Maj–B Maj, C min–B min                Sets the scale to use and its root.

CHORD                       Root, P5, Oct, UpDn, UpDnP5, 3rd,       Sets the chord structure.
                            5thUp, 5thDn, 7thUp, 7thDn

BALANCE                     100-0–0-100                             Adjusts the volume balance between the dry (original) sound and
                                                                    effect sound.


Harmony
This effect adds a harmony to your voice.

Parameter                   Value                                                 Explanation

PITCH                       -100–100                                              Sets the pitch of the voice. You can change the pitch
                                                                                  up and down one octave.

FORMANT                     -100–100                                              Sets the formant of the voice.
                                                                                  Lower settings give a more masculine vocal
                                                                                  character, and higher settings give a more feminine
                                                                                  vocal character.

BALANCE                     100-0–0-100 (%)                                       Adjusts the volume balance between the dry
                                                                                  (original) sound and effect sound.

AT PITCH                    0–100                                                 Adjusts the strength at which the pitch is corrected.


156
```

<!-- [Page 157] -->
## Page 157

```text
Appendix


Parameter                    Value                                                  Explanation

KEY                          CHROMA, A, B³, B, C, D³, D, E³, E, F, G³, G, A³        Sets the key to which the pitch is adjusted and the
                                                                                    harmonies are added.

HARMONY                      Root, P5, Oct, UpDn, UpDnP5, 3rd, 5thUp, 5thDn,        Sets the harmonization.
                             7thUp, 7thDn


Gt Amp Sim
This effect models a guitar amplifier.
 * This is enabled with INPUT FX.

Parameter                      Value           Explanation

AMP TYPE                       Selects the guitar amp type.

                               JC              Models the sound of a Roland JC-120.

                               TWIN            Models a Fender Twin Reverb.

                               BG              Models a lead guitar sound played using a MESA/Boogie combo amp.

                               MATCH           Models a Matchless D/C-30.

                               MS              Models a Marshall 1959.

                               SLDN            Models a Soldano SLO-100.

DRIVE                          0–100           Adjusts the volume and distortion of the amp.

LEVEL                          0–100           Adjusts the volume of the effect sound.

BASS                           -100–100        Adjusts the low-frequency tonal character.

MIDDLE                         -100–100        Adjusts the midrange tonal character.

TREBLE                         -100–100        Adjusts the high-frequency tonal character.


Control change messages and corresponding effects
You can use a control change message (CC#83) to select the effects.
The effects (selectable effects) corresponding to the respective CC#83 values are shown below.

BUS1 (MIDI ch 1), BUS2 (MIDI ch 2)
Value of CC#83                                                        Effect name

0                                                                     (OFF)

1                                                                     Direct FX1

2                                                                     Direct FX2

3                                                                     Direct FX3

4                                                                     Direct FX4

5                                                                     Direct FX5

6                                                                     Scatter

7                                                                     Downer

8                                                                     Ha-Dou

9                                                                     Ko-Da-Ma

10                                                                    Zan-Zou

11                                                                    To-Gu-Ro

12                                                                    SBF

13                                                                    Stopper

14                                                                    Tape Echo


                                                                                                                                     157
```

<!-- [Page 158] -->
## Page 158

```text
Appendix


Value of CC#83                       Effect name

15                                   TimeCtrlDly

16                                   Super Filter

17                                   WrmSaturator

18                                   303 VinylSim

19                                   404 VinylSim

20                                   Cassette Sim

21                                   Lo-fi

22                                   Reverb

23                                   Chorus

24                                   JUNO Chorus

25                                   Flanger

26                                   Phaser

27                                   Wah

28                                   Slicer

29                                   Tremolo/Pan

30                                   Chromatic PS

31                                   Hyper-Reso

32                                   Ring Mod

33                                   Crusher

34                                   Overdrive

35                                   Distortion

36                                   Equalizer

37                                   Compressor

38                                   SX Reverb

39                                   SX Delay

40                                   Cloud Delay

41                                   Back Spin

42                                   DJFX Delay

43–127                               –


BUS3 (MIDI ch 3), BUS4 (MIDI ch 4)
Value of CC#83                       Effect name

0                                    (OFF)

1                                    303 VinylSim

2                                    404 VinylSim

3                                    Cassette Sim

4                                    Lo-fi

5                                    Downer

6                                    Compressor

7                                    Equalizer

8                                    Isolator


158
```

<!-- [Page 159] -->
## Page 159

```text
Appendix


Value of CC#83         Effect name

9                      Super Filter

10                     Filter+Drive

11                     WrmSaturator

12                     Overdrive

13                     Distortion

14                     Crusher

15                     Ring Mod

16                     SBF

17                     Resonator

18                     Hyper-Reso

19                     Chromatic PS

20                     Reverb

21                     Ha-Dou

22                     Zan-Zou

23                     Sync Delay

24                     TimeCtrlDly

25                     Ko-Da-Ma

26                     Tape Echo

27                     Chorus

28                     JUNO Chorus

29                     Flanger

30                     Phaser

31                     Wah

32                     Slicer

33                     Tremolo/Pan

34                     To-Gu-Ro

35                     DJFX Looper

36                     Scatter

37                     SX Reverb

38                     SX Delay

39                     Cloud Delay

40                     DJFX Delay

41–127                 –


INPUT FX (MIDI ch 5)
Value of CC#83         Effect name

0                      (OFF)

1                      Auto Pitch

2                      Vocoder

3                      Harmony

4                      Gt Amp Sim


                                          159
```

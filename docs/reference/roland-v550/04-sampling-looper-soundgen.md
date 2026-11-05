# Sampling, Skip-Back, Looper & Sound Generator

> **Source**: Roland SP-404MKII Reference Manual v5.50 (Pages 36–47)

<!-- [Page 36] -->
## Page 36

```text
Sampling (SAMPLING)
You can sample (record) the sound that’s inputted into this unit to create your own samples (audio data materials).


 Configuring the sampling settings (RECORD SETTING)
Here you can configure the settings for sampling, such as the recording level, as well as apply input effects to the sound input from an
external source.


1 In sample mode, press the [REC] button.
       The unit enters sampling standby mode.


2 Sets the sample length (number of measures).
 Controller                        Value          Explanation

 [CTRL 2] knob                     1-32, ∞        Sets the sample length (number of measures).

 [SHIFT] button + [CTRL 2]         1/4–7/4        Specifies the time signature.
 knob


3 Press the [RECORD SETTING] button.
       The input setting screen appears.


4 Use the controllers to edit the parameters.
 Controller                   Parameter            Value               Explanation

 [CTRL 1] knob                REC BPM              40.0–200.0          Specifies the tempo.Use the [CTRL 1] knob while holding down the
                                                                       [SHIFT] button to set more precise values.
 [SHIFT] button + [CTRL
 1] knob                                                               You can also set the tempo using the tap tempo function.
                                                                       “Setting the tempo in time with the rhythm (Tap Tempo) (p. 91)”

 [CTRL 2] knob                ROUTING              This selects the source to sample (the input source).

                                                   Mix                 Samples the mixed audio from this unit (the playback audio) and the
                                                                       input from an external source.

                                                   ExtIn               Samples only the audio input from an external device.

 [SHIFT] button + [CTRL       PAN                  L:50–R:50           Adjusts the pan position (the left-right volume balance when
 3] knob                                                               sampling).

 [CTRL 3] knob                LEVEL                0–127               Adjust the recording level.


 Configuring the input effects (INPUT FX)
The INPUT FX (input effects) are effects used only for the input jacks. You can apply effects to the audio that’s inputted to this unit.


36
```

<!-- [Page 37] -->
## Page 37

```text
Sampling (SAMPLING)


1 On the input setting screen, press the [VALUE] knob.


      The INPUT FX Setting screen appears.


2 Use the [VALUE] knob to move the cursor to “EFX Type”, and press the [VALUE] knob.
      The value display is highlighted. You can now change the effects.


 Parameter                    Value

 EFX Type                     Bypass, Auto Pitch (*), Vocoder (*), Harmony (*), Gt Amp Sim (*), Chorus, JUNO Chorus, Reverb,
                              TimeCtrlDly, Chromatic PS, Downer, WrmSaturator, 303 VinylSim, 404 VinylSim, Cassette Sim, Lo-fi,
                              Equalizer, Compressor


 MEMO
Effects marked with an (*) are for INPUT FX only.


3 Use the [VALUE] knob to select the effect, and press the [VALUE] knob.
      This sets the effect.


4 Use the [VALUE] knob to move the cursor to the parameter that you want to edit.
5 Use the [CTRL 1]–[CTRL 3] knobs to edit the parameter.
      For details on the various effect parameters, refer to “MFX List (p. 143)”.

 MEMO
Some effect parameters may be shared in common, depending on the bus to which the effect is assigned. For details, refer to “How the
effect parameters are saved and shared (p. 33)”.


 Sampling
This shows how to sample (record) the audio that’s inputted into this unit to create your own samples.


1 Press the [REC] button.


      Empty pads to which samples haven’t been assigned blink red.


                                                                                                                                   37
```

<!-- [Page 38] -->
## Page 38

```text
Sampling (SAMPLING)


 MEMO
The metronome sounds when the “Metronome:REC” parameter is “ON” (the SYSTEM parameter “CLICK (p. 137)”).
Press pad [9] while holding down the [SHIFT] button to turn the metronome sound on/off.


2 Use the [CTRL 1] knob to adjust the tempo during sampling (the sample tempo), and use the [CTRL 3] knob to adjust
      the volume of audio input from an external device.

 MEMO
You can also set the tempo using the tap tempo function. For details, refer to “Setting the tempo in time with the rhythm (Tap Tempo) (p.
91)”.


3 Press the pads [1]–[16] that are blinking red.
4 Press the [REC] button.
      Sampling begins.
      If you decide to cancel sampling, press the [EXIT] button.

 MEMO
You can control the start/stop of recording from an external MIDI device using the start command (FA)/stop command (FC).


5 To quit sampling, press the pads [1]–[16] used for sampling or the [REC] button once more.
      The sample is saved to the pad.


 Adding a count-in before sampling
This feature adds a count-in before sampling begins. This gives you time to get ready to play before sampling actually begins.


1 Hold down the [SHIFT] button and press the pad [10].
      The value changes in order each time you press pad [10] while holding down the [SHIFT] button.
      Edit the count-in setting.


 Value              Explanation

 COUNT-IN           Adds a one-measure count-in before sampling.
 1MEAS

 COUNT-IN           Adds a two-measure count-in before sampling.
 2MEAS

 COUNT-IN WAIT When the input audio signal exceeds the level set in the Auto Trig Level parameter, sampling begins.

 COUNT-IN OFF       No count-in is used. Sampling starts immediately after you press the pads [1]–[16] to sample and then press the
                    [REC] button.


 Automatically setting the end point of a sample (END SNAP)
By setting the BPM (tempo) and then sampling, you can automatically set the beat that’s just before the sampling end beat as the “end
point” (the timing at which the sample stops).


38
```

<!-- [Page 39] -->
## Page 39

```text
Sampling (SAMPLING)


1 Press the [REC] button.
      Empty pads to which samples haven’t been assigned blink red.


2 Press the [START/END] button.
      END Snap is enabled. “END Snap ON” is displayed, and the [START/END] button lights up.


      To disable END Snap, press the [START/END] button again. “END Snap OFF” is displayed, and the [START/END] button blinks.


3 Sample by following steps 2 and onward in “Sampling (SAMPLING) (p. 36)”.
 MEMO
You can use the END SNAP function when resampling or a rehearsing a pattern.


Sampling result when END SNAP is off
The end point is set at the end of the sample.


                 START                                                                                               END


Sampling result when END SNAP is on
The end point is set at the beat near the end of the sample.


                                                                                                                             39
```

<!-- [Page 40] -->
## Page 40

```text
Sampling (SAMPLING)


                  START                                                                                                    END


              ņ                      ņ                         ņ                          ņ
 Resampling a sample (RESAMPLE)
Resampling means sampling a sample itself while it’s playing back. You can sample the sound of a sample to which effects are applied,
or sample the sound of multiple samples that are playing back at the same time, creating a single sample.

 MEMO
Also, by turning the pattern sequencer on beforehand (the [PATTERN SELECT] button lights up), you can resample a pattern in the same
way as you would resample a sample.


1 Press the [RESAMPLE] button.


 MEMO
 ¹ The metronome sounds when the “Metronome:REC” parameter is “ON” (the SYSTEM parameter “CLICK (p. 137)”).
 ¹ Press pad [9] while holding down the [SHIFT] button to turn the metronome sound on/off.


2 Sets the sample length (number of measures).
 Controller                      Value         Explanation

 [CTRL 2] knob                   1-32, ∞       Sets the sample length (number of measures).


3 Press the [RECORD SETTING] button.
      The input setting screen appears.


40
```

<!-- [Page 41] -->
## Page 41

```text
Sampling (SAMPLING)


4 Use the [CTRL 2] knob to set ROUTING to “Mix”.
 MEMO
When ROUTING is set to “ExtIn,” only the audio input from an external device is sampled (the sample’s audio is not included in the
resample). You can sample your performance while playing back samples as backing sounds.


5 Use the [CTRL 1] knob to adjust the tempo during sampling (the sample tempo), and use the [CTRL 3] knob to adjust
      the volume of audio input from an external device.


6 Press the [EXIT] button or the [RESAMPLE] button.
7 Press the pads [1]–[16] that are blinking red.
      Empty pads to which samples haven’t been assigned blink red.
      When you press an empty pad, the pad lights up orange, and a message “Press Pad to START” is shown.


8 Press pads [1]–[16] to select a sample.
      Sampling begins when the pattern starts playing back.


      If you decide to cancel sampling, press the [EXIT] button.

 MEMO
  ¹ You can also press the [REC] button to begin sampling. You can begin sampling when you want, while playing back samples as
    backing sounds.
  ¹ You can control the start/stop of recording from an external MIDI device using the start command (FA)/stop command (FC).


9 To quit sampling, press the pads [1]–[16] used for sampling or the [REC] button once more.
      The sample is saved to the pad.


 Sampling what you previously played (SKIP-BACK SAMPLING)
You can sample what you played up to 25 seconds ago (default) using the skip-back sampling function, which works even if you hadn’t
started sampling.
This lets you “go back in time” to sample a passage you played well during repeated practice, or to sample a phrase you played well when
you were just improvising.


1 Play back a sample or pattern, or switch the [EXT SOURCE] button on and play the instrument that’s connected to
      this unit.
      When the unit detects an audio level at or above a certain level, the unit begins recording to skip-back memory (which is used only
      for sampling past audio signals). At this time, the [MARK] button blinks.


                                                                                                                                      41
```

<!-- [Page 42] -->
## Page 42

```text
Sampling (SAMPLING)


2 Press the [MARK] button.
       After “SKIP BACK...” appears, the waveform of the audio in skip-back memory is displayed.


3 Press the [REC] button.
       “Select Pad To Save” appears. Empty pads to which samples haven’t been assigned blink red.


4 Press pads [1]–[16] to select the pad to which you want to assign the skip-back memory audio.
       Now the audio from skip-back memory is assigned to the pad.

 NOTE
Once you press the [EXIT] button without assigning the skip-back memory audio or turn off this unit, the skip-back memory is lost.
If you want to keep the skip-back memory audio, make sure to assign it to a pad.


 MEMO
  ¹ When you set the "Mark Function" system parameter to "SBS Long", the maximum time available for recording to skip-back memory
    can be set to a maximum of 40 seconds.
    Refer to the “MARK Function (p. 136)” SYSTEM parameter for details.
  ¹ You can’t use skip-back sampling and the looper function at the same time.


Skip-back sampling: how it works, and what its restrictions are
  ¹ Skip-back memory records up to 25 seconds (default) of audio. Anything recorded more than 25 seconds ago is erased, and can’t be
    previewed or sampled.
  ¹ The skip-back memory audio starts and pauses recording according to the setting of the Auto Trig Level parameter. When the input
    audio signal exceeds the level set in the Auto Trig Level parameter, skip-back memory starts recording. When the input audio signal
    falls below the level set in the Auto Trig Level parameter for at least three seconds, skip-back memory recording is paused.
  ¹ Skip-back memory is not recording if the [MARK] button is not blinking, and thus can’t be previewed or sampled. If you press the
    [MARK] button at this time, the message “No SKIP BACK Trigger Data” is shown.


42
```

<!-- [Page 43] -->
## Page 43

```text
Sampling (SAMPLING)


AUTO TRIG LEVEL


                         3 sec.                                    3 sec.


      Skip-back memory


                            Approx. 25 sec. (default)


                                                                            43
```

<!-- [Page 44] -->
## Page 44

```text
Recording samples by looping (LOOPER)
This unit has a looper, which lets you record the sound that’s currently playing back as a sample.


1 Set the value of MARK Function parameter to “Looper” by following the steps in “Editing the settings related to this
       unit (System) (p. 111)”.

 MEMO
  ¹ Hold down the [SHIFT] button, and press the [VALUE] knob to switch between skip-back sampling and the looper function.
  ¹ You can’t use skip-back sampling and the looper function at the same time.


2 Press the [MARK] button to switch to looper mode.


3 Configure the parameters for the looper using the following controllers.
 Controller                Parameter      Value                Explanation

 [CTRL 1] knob             MEAS           Free, 1, 2, 4        Sets the sample length (number of measures).
                                                                * With the “Free” setting, you must stop the sampling manually.
                                                                * For all of these settings, you can sample up to 16 seconds of audio
                                                                  (depending on the tempo setting).

 [CTRL 2] knob             AUTO TRIG      OFF, ON              When this is “ON” and the input audio signal exceeds the level set in the
                                                               AUTO TRIG parameter, the looper starts recording.

 [CTRL 3] knob             BPM            40.0–200.0           Sets the tempo while sampling.

                           PLAY-RATE      1.0–199.0 (%)        Sets the playback speed while the looper plays back.

 [SHIFT] button +          BUS            DRY, BUS1,           Sets the bus to which input audio signals are sent (meaning which effects
 [CTRL 1] knob                            BUS2, LOOPER         are used).
                                                                * When overdubbing in looper mode, this must be set to “LOOPER”.
                                                                  With this setting, effects are not applied to the looper playback audio.

 [SHIFT] button +          Routing        Mix, ExtIn           This selects the source to sample (the input source).
 [CTRL 2] knob
                                                               When this is set to “Mix”, the unit samples the mixed audio from this unit
                                                               (the playback audio) and the input from an external source.
                                                               When this is set to “ExtIn”, the unit samples only the audio input from an
                                                               external device.

 [VALUE] knob (turn)       Sets the recording level or the amount of feedback.
                            * To switch the parameter to configure between Rec Level and Feedback Rate, press the [VALUE] knob.

                           Rec Level      0–127                Sets the recording level.

                           Feedback       0–100 (%)            Sets the amount of feedback.
                           Rate

 [SHIFT] button +          METRO VOL 0–5                       Sets the volume of the metronome.
 [VALUE] knob (turn)


4 Press the [REC] button.
       Sampling begins.
       When you press the [RESAMPLE] button to make it light up before sampling begins, the unit automatically switches to overdubbing
       mode after recording the first loop pass.


44
```

<!-- [Page 45] -->
## Page 45

```text
Recording samples by looping (LOOPER)


 MEMO
You can control the start/stop of recording from an external MIDI device using the start command (FA)/stop command (FC).

      You can use the following controls when sampling with the looper.


 Controller                       Explanation

 [REC] button                     Starts/stops sampling.

 [RESAMPLE] button                Activates overdubbing mode.

 [DEL] button                     Deletes the content sampled by the looper.
                                  This is enabled only when the sample is stopped.

 [COPY] button                    Assigns the sampled data (result) to the pads.
                                  Press pads [1]–[16] to select the save destination pad, and press the [VALUE] knob.

 [SHIFT] button + [PATTERN        Undoes (UNDO) the data you just input (recorded).
 SELECT] button
                                  Operate this again to cancel the undo action (REDO).
                                  This is enabled when the sampled data is played back in a loop or stopped.

 [SHIFT] button + [EXIT] button Stops the playback of all samples.
 Press the [EXIT] button
 quickly four times.

 [PITCH/SPEED] button + Pads      Sets the looper’s tempo as the tempo that was set for the pad sample.
 [1]–[16]


5 To finish the looper mode, press the [MARK] button.
 MEMO
When the unit is in looper mode, you can operate some of the controls from an external controller by using control change messages.
For details, refer to “*8 Control change message numbers and corresponding controllers in Looper mode (p. 169)”.


                                                                                                                                      45
```

<!-- [Page 46] -->
## Page 46

```text
Creating bass and other sounds (SOUND
     GENERATOR)
You can use the synthesizer built into the SP-404MK2 to generate sounds.
You can also sample these generated sounds and assign them to the pads.


1 Hold down the [SHIFT] button, and press the [RECORD SETTING] button.
      This enters the sound generator mode.


2 Configure the parameters for the sound generator using the following controllers.
 Controller             Parameter                Value                           Explanation

 [CTRL 1] knob          Type                     Sine 1, Sine 2, Cos 1, Cos 2,   Selects the synthesizer waveform (oscillator).
                                                 Saw, Saw+, Saw 2, Tri, Pulse,
                                                 Pulse+, Noise 1, Noise 2

 [CTRL 2] knob          Freq                     -36–+48                         Sets the waveform frequency.

 [CTRL 3] knob          Level                    0–127                           Sets the waveform volume.

 [SHIFT] button +       Pad Length               1–256 (period),                 Sets the length of the waveform that’s exported to a
 [CTRL 1] knob                                                                   pad.
                                                 0.5–10 (seconds)

 [SHIFT] button +       Duty Cycle               0–100 (%)                       Sets the duty cycle of the waveform.
 [CTRL 2] knob

 [SHIFT] button +       Balance                  L50–0–R50                       Sets the panning of the waveform.
 [CTRL 3] knob

 [VALUE] knob           Turn the [VALUE] knob to select the parameter, and then press the [VALUE] knob to make the cursor switch to
                        the value. At this time, you can turn the [VALUE] knob to select the parameter.

                        SCALE                    Chrom–Penta m                   Sets the scale that’s used to play the sounds.

                        NOTE                     C–B                             Sets the base note (root) of the scale.

                        OCT                      -3–+4                           Sets the octave.

                        OFST                     -4–+11                          Sets which pad the base note is to be assigned.

                        ENV                      OFF–C2                          Sets the envelope.

                        TUNE                     416.0–464.0 (Hz)                This can adjust the pitch.


3 Press pads [1]–[16].
      The synthesizer plays.

 MEMO
In sound generator mode, the synthesizer can be played via note messages from a MIDI keyboard connected to the MIDI IN connector, a
computer connected via USB, a DAW app running on an iOS device and so on.

      When doing this, you can use the following controllers.


 Controller                                                                Explanation

 [REMAIN] button                                                           Previews the bus to which the signal is sent.

 [SUB PAD] button                                                          Starts/stops the preview.

 [MARK] button                                                             Turns skip-back sampling on (when MARK Function is set
                                                                           to “SBS **”).


4 Press the [REC] button to export the generated audio to the pad as audio data.
46
```

<!-- [Page 47] -->
## Page 47

```text
Creating bass and other sounds (SOUND GENERATOR)


5 Press pads [1]–[16] to select the save destination pad, and press the [REC] knob.
      The sample is saved to the pad you selected.


                                                                                                  47
```

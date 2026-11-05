# Appendix: Error Messages, Diagram, Specs & MIDI

> **Source**: Roland SP-404MKII Reference Manual v5.50 (Pages 165–175)

<!-- [Page 165] -->
## Page 165

```text
Appendix


Operation                                                             Explanation

[ROLL] button + [CTRL 3] knob                                         You can record the motion of [CTRL 3] knob in the steps.
                                                                       * This is enabled when MODE is “TRIG”.

[VALUE] knob (press) + [SUB PAD] button + pads [1]–[16]               You can select samples without playing them back.


Error messages
Error messages           Explanation                         Action

Battery Low!             The batteries are nearly            Replace the batteries, or switch to an AC adaptor.
                         depleted.
                                                             Ó “About the power supply (p. 15)”

Unsupported FILE         The file type is not supported on   Check the file extension, format and folder directory.
                         this unit.
                                                             Ó “Importing/exporting (using the SD card) (p. 123)”

No SD CARD!              No SD card is inserted. Also, the Turn off the power, and make sure that the SD card is fully inserted before
                         SD card might not be fully        you turn the power back on.
                         inserted.

Unsupported SD Card!     An unsupported type of SD card      Please format the SD card.
                         has been inserted.
                                                             Ó “Formatting an SD card (p. 133)”

SD CARD Protected!       The write-protect feature has       Unlock the lock switch on the left side of the SD card.
                         been enabled on the SD card.

SD CARD Full!            The SD card has run out of free     Delete any unneeded data on the unit.
                         space.

Internal Storage Full!   There is not enough storage         Delete any unneeded data on the unit.
                         capacity left on this unit.

Storage Error!           A problem has occurred with the Try performing a factory reset.
                         internal storage.
                                                         Ó “Restoring the factory settings (FACTORY RESET) (p. 133)”

Protected!               The function can’t be executed      Use a bank for which bank protect is disabled, or disable bank protect on
                         because bank protect is             the currently selected bank.
                         enabled.
                                                             Ó “Selecting a sample bank (p. 19)” “Selecting a pattern bank (p. 74)”
                                                             “Protecting a sample (PROTECT) (p. 61)” “Protecting a pattern
                                                             (PROTECT) (p. 87)”

Max Length Pattern       The maximum number of notes         Reduce the number of notes in the pattern, or shorten and split the
                         that can be recorded to the         pattern to record.
                         pattern sequencer has been
                                                             Ó “Creating a new pattern (real-time recording) (p. 64)”
                         exceeded.


Audio diagram


                                                                                                                                      165
```

<!-- [Page 166] -->
## Page 166

```text
Appendix


Main specifications
Maximum polyphony               32 voices

Recordable Data                 Samples: 2,560 (16 samples x 10 banks x 16 projects: stored in internal storage)
                                Patterns: 2,560 (16 patterns x 10 banks x 16 projects: stored in internal storage)

Internal storage                Size: 16 GB
                                 * *Include preload data

Maximum sampling time           16 minutes (approximately 185 MB per sample)

Skip back sampling time         Maximum 40 seconds (Always records LINE OUT signal independently of sampling/resample)

Data format                     16-bit linear

Import format                   WAV, AIFF, MP3 import supported.
                                 * SP-404MK2 App supports WAV, AIFF, MP3, FLAC, M4A.

Sample rate                     48 kHz

Pattern sequencer               Resolution: 480 ticks per quarter note
                                Pattern length: 1 to 64 bars
                                Recording method: Realtime Loop Recording (with shuffle quantize function), TR-REC
                                (Automation supported)

Effects                         Multi-effects: 42 types
                                Input effects: 17 types

Pads                            16 pads + 1 sub pad (Velocity-sensitive pad)

Controllers                     Control knob x 3

Display                         Graphic OLED display

External storage                SD card (SDHC/SDXC compatible, commercially available)
                                 * For backup, restore, import, and export functions

Connection jacks                PHONES jacks: Stereo 1/4-inch phone type, Stereo miniature phone type
                                LINE OUT (L/MONO, R) jacks: 1/4-inch TRS phone type (impedance balanced)
                                LINE IN (L/MONO, R) jacks: 1/4-inch phone type
                                MIC/GUITAR IN jacks: 1/4-inch TRS phone type (for MIC), 1/4-inch phone type (for GUITAR)
                                MIDI (IN, OUT) jack: Stereo miniature phone type
                                USB port: USB Type-C® (Audio, MIDI)
                                DC IN jack

Power supply                    AC adaptor
                                USB bus power supply (USB Type-C® port, 1.5 A or more)
                                Ni-MH batteries (AA, HR6) (commercially available) x 6 or Alkaline battery (AA, LR6)
                                (commercially available) x 6

Current draw                    1,100 mA (AC adaptor)
                                1,500 mA (USB bus power)

Expected battery life under     Alkaline battery: Approx. 2.5 hours
continuous use
                                Ni-MH battery: Approx. 3.5 hours
                                 * This can vary depending on the specifications of the batteries, capacity of the batteries, and
                                   the conditions of use.

External dimensions             178 (W) x 276 (D) x 71 (H) mm

Weight (excluding AC adaptor)   1.1 kg


166
```

<!-- [Page 167] -->
## Page 167

```text
Appendix


Accessories                               Quick Start
                                          “Read Me First” leaflet
                                          AC adaptor
                                          Warranty card

Options (sold separately)                 TRS/MIDI connecting cable: BOSS BMIDI series, BOSS BCC series
                                          Wireless MIDI Expression Pedal: BOSS EV-1-WL
                                          Wireless Footswitch: BOSS FS-1-WL

 * This document explains the specifications of the product at the time that the document was issued. For the latest information, refer to
   the Roland website.


MIDI implementation chart
Model: SP-404MK2
Date: Jul. 01, 2025
Version: 5

Function                                  Transmitted                  Recognized                    Notes

Basic            Default                  x (MIDI mode A)              x (MIDI mode A)               *1
Channel
                                          1–10 (MIDI mode B)           1–10 (MIDI mode B)

                 Changed                  x (MIDI mode A)              x (MIDI mode A)               *1
                                          1–10 (MIDI mode B)           1–10 (MIDI mode B)

Mode             Default                  x                            Mode 3

                 Messages                 x                            x

                 Altered                  –                            x

Note Number                               35–51 (B1–E³3, MIDI          35–51 (B1–E³3, MIDI
                                          mode A) *1                   mode A) *1
                                          0, 12–91 (C-1, C0–G6,        0, 12–91 (C-1, C0–G6,
                                          MIDI mode B) *1              MIDI mode B) *1
                                          36–60 (C2–C4, CH 16) *7      0–127 (CH 11) *2
                                                                       36–60 (C2–C4, CH 16) *6

                 True Voice               –                            36–51 (C2–E³3, MIDI
                                                                       mode A) *1
                                                                       12–91 (C0–G6, MIDI mode
                                                                       B) *1

Velocity         Note On                  o                            o

                 Note Off                 x                            x

Aftertouch       Key’s                    x                            x

                 Channel’s                x                            x

Pitch Bend                                x                            o *2


                                                                                                                                       167
```

<!-- [Page 168] -->
## Page 168

```text
Appendix


Function                                  Transmitted          Recognized               Notes

Control          CC#16–19                 O                    o *7                     Example:
Change
                                                                                        0xB0 10 00 Ó BUS 1 Ctrl 1=0
                                                                                        0xB1 13 7F Ó BUS 2 EFX switch =
                                                                                        ON

                 CC#80–83                 o                    o *7                     Example:
                                                                                        0xB2 50 7F Ó BUS 3 Ctrl 4=127
                                                                                        0xB3 53 01 Ó BUS 4 EFX number =
                                                                                        01 (303 VinylSim)

                 CC#07                    o *8                 o *8                     Example:
                                                                                        0xB1 07 7F Ó CH2 volume slider =
                                                                                        127

                 CC#08                    o *8                 o *8                     Example:
                                                                                        0xB0 08 7F Ó X-FADE = 0:127 (CH1
                                                                                        = 0, CH2 = 127)

                 CC#20–27                 o *8                 x                        Example:
                                                                                        0xB0 14 01 Ó CH1 play
                                                                                        0xB2 1A 7F Ó press the pattern
                                                                                        sequencer [BPM+] button

Program Change                            x                    o *1 *9                  Example:
                                                                                        0xC3 0F Ó Bank D Pattern 16

System Exclusive                          x                    x

System           Song Position            x                    x
Common
                 Song Select              x                    x

                 Tune Request             x                    x

System           Clock                    o *3                 o *4
Realtime
                 Commands                 o *3                 o *4

Aux              All Sound Off            x                    o *5
Messages
                 Reset All Controllers    x                    x

                 Local On/Off             x                    x

                 All Notes Off            x                    x

                 Active Sensing           o                    o

                 System Reset             x                    x

Notes
*1   Refer to “MIDI note map (p. 170)”.

 1      Enabled when INPUT FX is “Vocoder” (MIDI CH 11).


 2      Output when MIDI Sync Out is “ON” and when there is no tempo input from an external device.


 3      Enabled when this unit is in remote mode (when a tempo signal is received from an external device).


 4      All samples stop playing back when the MIDI cable is unplugged.


 5      Enabled when playing samples in chromatic mode (MIDI CH 16).


168
```

<!-- [Page 169] -->
## Page 169

```text
Appendix


*7 MIDI channels

CH 1: BUS 1

CH 2: BUS 2

CH 3: BUS 3

CH 4: BUS 4

CH 5: INPUT


*7 Control change message numbers and corresponding EFX controls

CC#19                     EFX switch (0–63: OFF, 64–127: ON)

CC#83                     EFX number (0–127)
                          “Control change messages and corresponding effects (p. 157)”

CC#16                     Ctrl 1 (0–127)

CC#17                     Ctrl 2 (0–127)

CC#18                     Ctrl 3 (0–127)

CC#80                     Ctrl 4 (0–127)

CC#81                     Ctrl 5 (0–127)

CC#82                     Ctrl 6 (0–127)


*8 Control change message numbers and corresponding controllers in DJ mode

        MIDI channel 1 (CH1 sample)                  MIDI channel 2 (CH2 sample)             MIDI channels 3 (pattern sequencer)

CC#7    [Ctrl 1] knob: CH1 volume slider (0–127)     [Ctrl 2] knob: CH2 volume slider (0–    [Ctrl 1] knob: pattern sequencer volume
                                                     127)                                    slider (0–127)

CC#8    [Ctrl 3] knob: X-FADE (CH1: CH2 = 127:0– –                                           –
        0:127)

CC#20   [ñ] button (0: pause, 127: play)             [ñ] button (0: pause, 127: play)        [ñ] button (0: pause, 127: play)

CC#21   [õ] button (0: release the button, 127:      [õ] button (0: release the button,      [õ] button (0: release the button, 127:
        press the button)                            127: press the button)                  press the button)

CC#22   [SYNC] button (0: Off, 127: On)              [SYNC] button (0: Off, 127: On)         [SYNC] button (0: Off, 127: On)

CC#23   [CUE] button (0: Off, 127: On)               [CUE] button (0: Off, 127: On)          [CUE] button (0: Off, 127: On)

CC#24   [BEND+] button (0: release the button,       [BEND+] button (0: release the          [BEND+] button (0: release the button,
        127: press the button)                       button, 127: press the button)          127: press the button)

CC#25   [BEND-] button (0: release the button, 127: [BEND-] button (0: release the           [BEND-] button (0: release the button,
        press the button)                           button, 127: press the button)           127: press the button)

CC#26   [BPM+] button (0: release the button, 127:   [BPM+] button (0: release the button, [BPM+] button (0: release the button, 127:
        press the button)                            127: press the button)                press the button)

CC#27   [BPM-] button (0: release the button, 127:   [BPM-] button (0: release the button,   [BPM-] button (0: release the button, 127:
        press the button)                            127: press the button)                  press the button)


*8 Control change message numbers and corresponding controllers in Looper mode

               MIDI channel: 1

CC#87          [DEL] button                0                                   –

                                           127                                 Deletes the sampled content.

CC#88          [REC] button                0                                   Stops sampling.

                                           127                                 Starts sampling.


                                                                                                                                      169
```

<!-- [Page 170] -->
## Page 170

```text
Appendix


*8 Control change message numbers and corresponding controllers in Looper mode

CC#89          [RESAMPLE] button       0                                –

                                       127                              Activates overdubbing mode.

CC#90          [CTRL 3] knob           0–127                            Adjusts the value of BPM/PLAY-RATE parameters.

CC#85          [EXIT] button           0                                –

                                       127                              Stops the playback of all samples by quickly pressing
                                                                        the button four times.

CC#86          [PITCH/SPEED] button    0                                –

                                       127                              Resets the tempo setting.

CC#91          [SHIFT] button +        0                                Cancels the undo action (REDO).
               [PATTERN SELECT]
                                       127                              Undoes (UNDO) the data you just input (recorded).
               button

Program change numbers and corresponding patterns

PC#0                                                       Pattern 1

PC#1                                                       Pattern 2

:                                                          :

PC#15                                                      Pattern 16


Mode 1: OMNI ON, POLY
Mode 2: OMNI ON, MONO
Mode 3: OMNI OFF, POLY
Mode 4: OMNI OFF, MONO
o: Yes
x: No


MIDI note map
MIDI Mode                      A                                            B

MIDI Channel                   CH 1            ...     CH 10                CH 1–9                    CH 2–10

Note Number                    BANK    PAD     ...     BANK    PAD          BANK       PAD            BANK         PAD

127              G9            Blank           ...     Blank                Blank (for Note Offset)   Blank (for Note Offset)

:                :             Blank           ...     Blank                Blank (for Note Offset)   Blank (for Note Offset)

92               A³6           Blank           ...     Blank                Blank (for Note Offset)   Blank (for Note Offset)

91               G6            Blank           ...     Blank                E          4              J            4

90               F´6           Blank           ...     Blank                E          3              J            3

89               F6            Blank           ...     Blank                E          2              J            2

88               E6            Blank           ...     Blank                E          1              J            1

87               E³6           Blank           ...     Blank                E          8              J            8

86               D6            Blank           ...     Blank                E          7              J            7

85               C´6           Blank           ...     Blank                E          6              J            6

84               C6            Blank           ...     Blank                E          5              J            5

83               B5            Blank           ...     Blank                E          12             J            12

82               B³5           Blank           ...     Blank                E          11             J            11

81               A5            Blank           ...     Blank                E          10             J            10


170
```

<!-- [Page 171] -->
## Page 171

```text
Appendix


MIDI Mode         A                               B

80          A³5   Blank        ...   Blank        E   9    J   9

79          G5    Blank        ...   Blank        E   16   J   16

78          F´5   Blank        ...   Blank        E   15   J   15

77          F5    Blank        ...   Blank        E   14   J   14

76          E5    Blank        ...   Blank        E   13   J   13

75          E³5   Blank        ...   Blank        D   4    I   4

74          D5    Blank        ...   Blank        D   3    I   3

73          C´5   Blank        ...   Blank        D   2    I   2

72          C5    Blank        ...   Blank        D   1    I   1

71          B4    Blank        ...   Blank        D   8    I   8

70          B³4   Blank        ...   Blank        D   7    I   7

69          A4    Blank        ...   Blank        D   6    I   6

68          A³4   Blank        ...   Blank        D   5    I   5

67          G4    Blank        ...   Blank        D   12   I   12

66          F´4   Blank        ...   Blank        D   11   I   11

65          F4    Blank        ...   Blank        D   10   I   10

64          E4    Blank        ...   Blank        D   9    I   9

63          E³4   Blank        ...   Blank        D   16   I   16

62          D4    Blank        ...   Blank        D   15   I   15

61          C´4   Blank        ...   Blank        D   14   I   14

60          C4    Blank        ...   Blank        D   13   I   13

59          B3    Blank        ...   Blank        C   4    I   4

58          B³3   Blank        ...   Blank        C   3    I   3

57          A3    Blank        ...   Blank        C   2    I   2

56          A³3   Blank        ...   Blank        C   1    I   1

55          G3    Blank        ...   Blank        C   8    I   8

54          F´3   Blank        ...   Blank        C   7    I   7

53          F3    Blank        ...   Blank        C   6    I   6

52          E3    Blank        ...   Blank        C   5    I   5

51          E³3   A       4    ...   J       4    C   12   I   12

50          D3    A       3    ...   J       3    C   11   I   11

49          C´3   A       2    ...   J       2    C   10   I   10

48          C3    A       1    ...   J       1    C   9    I   9

47          B2    A       8    ...   J       8    C   16   I   16

46          B³2   A       7    ...   J       7    C   15   I   15

45          A2    A       6    ...   J       6    C   14   I   14

44          A³2   A       5    ...   J       5    C   13   I   13

43          G2    A       12   ...   J       12   B   4    G   4

42          F´2   A       11   ...   J       11   B   3    G   3

41          F2    A       10   ...   J       10   B   2    G   2


                                                                    171
```

<!-- [Page 172] -->
## Page 172

```text
Appendix


MIDI Mode          A                               B

40          E2     A       9    ...   J       9    B          1              G            1

39          E³2    A       16   ...   J       16   B          8              G            8

38          D2     A       15   ...   J       15   B          7              G            7

37          C´2    A       14   ...   J       14   B          6              G            6

36          C2     A       13   ...   J       13   B          5              G            5

35          B1     EXT SOURCE                      B          12             G            12

34          B³1    Blank        ...   Blank        B          11             G            11

33          A1     Blank        ...   Blank        B          10             G            10

32          A³1    Blank        ...   Blank        B          9              G            9

31          G1     Blank        ...   Blank        B          16             G            16

30          F´1    Blank        ...   Blank        B          15             G            15

29          F1     Blank        ...   Blank        B          14             G            14

28          E1     Blank        ...   Blank        B          13             G            13

27          E³1    Blank        ...   Blank        A          4              F            4

26          D1     Blank        ...   Blank        A          3              F            3

25          C´1    Blank        ...   Blank        A          2              F            2

24          C1     Blank        ...   Blank        A          1              F            1

23          B0     Blank        ...   Blank        A          8              F            8

22          B³0    Blank        ...   Blank        A          7              F            7

21          A0     Blank        ...   Blank        A          6              F            6

20          A³0    Blank        ...   Blank        A          5              F            5

19          G0     Blank        ...   Blank        A          12             F            12

18          F´0    Blank        ...   Blank        A          11             F            11

17          F0     Blank        ...   Blank        A          10             F            10

16          E0     Blank        ...   Blank        A          9              F            9

15          E³0    Blank        ...   Blank        A          16             F            16

14          D0     Blank        ...   Blank        A          15             F            15

13          C´0    Blank        ...   Blank        A          14             F            14

12          C0     Blank        ...   Blank        A          13             F            13

11          B-1    Blank        ...   Blank        Blank (for Note Offset)   Blank (for Note Offset)

:           :      Blank        ...   Blank        Blank (for Note Offset)   Blank (for Note Offset)

1           C´-1   Blank        ...   Blank        Blank (for Note Offset)   Blank (for Note Offset)

0           C-1    Blank        ...   Blank        EXT SOURCE


172
```

<!-- [Page 173] -->
## Page 173

```text
Intellectual Property Right
¹ Roland is an either registered trademark or trademark of Roland Corporation in the United States and/or other countries.
¹ Company names and product names appearing in this document are registered trademarks or trademarks of their respective owners.
¹ It is forbidden by law to make an audio recording, video recording, copy or revision of a third party's copyrighted work (musical work,
  video work, broadcast, live performance, or other work), whether in whole or in part, and distribute, sell, lease, perform or broadcast it
  without the permission of the copyright owner.
¹ Do not use this product for purposes that could infringe on a copyright held by a third party. We assume no responsibility whatsoever
  with regard to any infringements of third-party copyrights arising through your use of this product.
¹ The copyright of content in this product (the sound waveform data, style data, accompaniment patterns, phrase data, audio loops and
  image data) is reserved by Roland Corporation.
¹ Purchasers of this product are permitted to utilize said content (except song data such as Demo Songs) for the creating, performing,
  recording and distributing original musical works.
¹ Purchasers of this product are NOT permitted to extract said content in original or modified form, for the purpose of distributing
  recorded medium of said content or making them available on a computer network.

¹ The SD logo         and SDHC logo          are trademarks of SD-3C, LLC.
¹ This product contains eParts integrated software platform of eSOL Co.,Ltd. eParts is a trademark of eSOL Co., Ltd. in Japan.
¹ This Product uses the Source Code of μT-Kernel under T-License 2.0 granted by the T-Engine Forum (www.tron.org).
¹ This product includes third party open source software.
   ¹ Copyright © 2009-2018 ARM Limited. All rights reserved.
   ¹ Copyright © 2006-2026, United States Government as represented by the Administrator of the National Aeronautics and Space
     Administration. All rights reserved.
   ¹ Licensed under the Apache License, Version 2.0 (the "License");
     You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
   ¹ Copyright © 2016 Freescale Semiconductor, Inc.
   ¹ Copyright © 2016-2017 NXP. All rights reserved.
   ¹ Copyright © 2004 Bertrand Petit
   ¹ Copyright © 2002-2002 Frank Vanden Berghen
   ¹ Licensed under the BSD-3-Clause;
     You may obtain a copy of the License at https://opensource.org/licenses/BSD-3-Clause


                                                                                                                                       173
```

<!-- [Page 174] -->
## Page 174

```text
SP-404MK2
    Version 5.50
  Reference Manual
           04
   Roland Corporation

© 2024 Roland Corporation
```

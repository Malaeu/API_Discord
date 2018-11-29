# Voice

> danger
> The Discord Store is still in a beta period. All documentation and functionality can and will change.

Discord's pride and joy is its voice chat. Well, ok, also its memes, but mostly the voice chat. Text and video chat are pretty great, too. And have you seen that store? Anyway.

If you want people playing your game to be able to talk with each other, this Voice manager can help you out! Note that the main functionality for voice in this SDK is not _only_ in this manager. Connecting players to a voice chat happens with [ConnectVoice](#DOCS_GAME_SDK_LOBBIES/connectvoice) in the Lobby manager, and robust voice settings work through [OpenVoiceSettings](#DOCS_GAME_SDK_OVERLAY/openvoicesettings) in the Overlay manager. The Voice manager handles a few fine-grain details like self muting/deafening, swapping between VAD/PTT voice modes, and setting a PTT key. It's a subset of the robust settings from the overlay call for those of you that prefer to build UI and control things from your own game.

## Data Models

###### InputModeType Enum

| name          | value |
| ------------- | ----- |
| VoiceActivity | 0     |
| PushToTalk    | 1     |

###### InputMode Struct

| name     | type          | description                                   |
| -------- | ------------- | --------------------------------------------- |
| Type     | InputModeType | set either VAD or PTT as the voice input mode |
| Shortcut | string        | the PTT hotkey for the user                   |

## GetInputMode

Get the current voice input mode for the user.

Returns an `InputMode`.

###### Parameters

None

###### Example

```cs
var voiceManager = discord.GetVoiceManager();
var inputMode = voiceManager.GetInputMode();
Console.WriteLine("The current input mode is {0}. The current PTT hotkey is set to {1}", inputMode.Type, inputMode.Shortcut);
```

## SetInputMode

Sets a new voice input mode for the user. The shortcut can be retrieved dynamically in your code, or a mapping can be kept. For examples, see [this table](https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes) or play with [this tool](https://keycode.info/)!

Returns a `Discord.Result` via callback.

###### Parameters

| name      | type      | description                     |
| --------- | --------- | ------------------------------- |
| inputMode | InputMode | the new input mode for the user |

###### Example

```cs
var voiceManager = discord.GetVoiceManager();
var newMode = new Discord.InputMode()
{
  Type = Discord.InputModeType.PushToTalk,
  Shortcut = "17"
};
voiceManager.SetInputMode(newMode, (res) =>
{
  if (res == Discord.Result.Ok)
  {
    Console.WriteLine("New input mode set");
  }
});
```

## IsSelfMute

Whether the connected user is currently muted.

Returns `bool`.

###### Parameters

None

###### Example

```cs
var voiceManager = discord.GetVoiceManager();
if (voiceManager.IsSelfMute())
{
  Console.WriteLine("You are muted");
}
```

## SetSelfMute

Mutes or unmutes the currently connected user.

Returns `void`.

###### Parameters

| name | type | description                     |
| ---- | ---- | ------------------------------- |
| mute | bool | true for mute, false for unmute |

###### Example

```cs
var voiceManager = discord.GetVoiceManager();
if (voiceManager.IsSelfMute())
{
  voiceManager.SetSelfMute(false);
  Console.WriteLine("We automatically unmuted you");
}
```

## IsSelfDeaf

Whether the connected user is currently deafened.

Returns `bool`.

###### Parameters

None

###### Example

```cs
var voiceManager = discord.GetVoiceManager();
if (voiceManager.IsSelfDeaf())
{
  Console.WriteLine("You are deafened. You can't hear anyone!");
}
```

## SetSelfDeaf

Deafens or undefeans the currently connected user.

Returns `void`.

###### Parameters

| name | type | description                     |
| ---- | ---- | ------------------------------- |
| deaf | bool | true for mute, false for unmute |

###### Example

```cs
var voiceManager = discord.GetVoiceManager();
if (voiceManager.IsSelfDeaf())
{
  voiceManager.SetSelfDeaf(false);
  Console.WriteLine("We automatically undeafened you. You can hear now!");
}
```

## IsLocalMute

Whether the given user is currently muted by the connected user.

Returns `bool`.

###### Parameters

| name   | type  | description                 |
| ------ | ----- | --------------------------- |
| userId | Int64 | the id of the user to check |

###### Example

```cs
var voiceManager = discord.GetVoiceManager();
if (voiceManager.IsLocalMute(53908232506183680))
{
  Console.WriteLine("User is locally muted");
}
```

## SetLocalMute

Mutes or unmutes the given user for the currently connected user.

Returns `void`.

###### Parameters

| name   | type  | description                     |
| ------ | ----- | ------------------------------- |
| userId | Int64 | the id of the user to mute      |
| deaf   | bool  | true for mute, false for unmute |

###### Example

```cs
var voiceManager = discord.GetVoiceManager();
if (!voiceManager.IsLocalMute(53908232506183680))
{
  voiceManager.SetLocalMute(53908232506183680, true);
  Console.WriteLine("Muted that user for you");
}
```

## GetLocalVolume

Gets the local volume for a given user. This is the volume level at which the currently connected users hears the given user speak.

Returns `byte`.

###### Parameters

| name   | type  | description                 |
| ------ | ----- | --------------------------- |
| userId | Int64 | the id of the user to check |

###### Example

```cs
var voiceManager = discord.GetVoiceManager();
var volume = voiceManager.GetLocalVolume(53908232506183680);
Console.WriteLine("User is at volume level {0}", volume);
```

## SetLocalVolume

Sets the local volume for a given user. This is the volume level at which the currently connected users hears the given user speak.

Returns `void`.

###### Parameters

| name   | type   | description                                       |
| ------ | ------ | ------------------------------------------------- |
| userId | Int64  | the id of the user to change                      |
| byte   | volume | the volume at which to set the user, `0` to `100` |

###### Example

```cs
var voiceManager = discord.GetVoiceManager();
voiceManager.SetLocalVolume(53908232506183680, 70);
```

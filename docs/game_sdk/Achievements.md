# Achievements

> info
> Need help with the SDK? Talk to us in the [Discord Developers Server](https://discord.gg/discord-developers)!

> warn
> Game approval submissions are currently paused due to unforeseen circumstances. We apologize for the inconvenience. Click [here]((https://support-dev.discord.com/hc/en-us/articles/360041437171)) for more info.

There's no feeling quite like accomplishing a goal that you've set out to achieve. Is killing 1000 zombies in a game as great an achievement as climbing Mt. Everest? Of course it is, and I didn't even have to leave my house. So get off my back, society.

Anyway—Discord has achievements! Show your players just how successful they are.

Achievements are managed in the [Developer Portal](https://discord.com/developers/applications). Head over to your application --> `Achievements` to create and manage achievements for your game. You'll give them an icon, a name, and a description; then they'll be assigned an id.

You can also mark achievements as `secret` and `secure`. "Secret" achievements will _not_ be shown to the user until they've unlocked them. "Secure" achievements can only be set via HTTP calls from your server, _not_ by a game client using the SDK. No cheaters here!

## Data Models

###### Achievement Struct

| Name           | Type    | Description                                                                                                                      |
| -------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| application_id | Int64   | the unique id of the application                                                                                                 |
| name           | object  | the name of the achievement as an [achievement locale object](#DOCS_GAME_SDK_ACHIEVEMENTS/achievement-locale-object)             |
| description    | object  | the user-facing achievement description as an [achievement locale object](#DOCS_GAME_SDK_ACHIEVEMENTS/achievement-locale-object) |
| secret         | boolean | if the achievement is secret                                                                                                     |
| secure         | boolean | if the achievement is secure                                                                                                     |
| id             | Int64   | the unique id of the achievement                                                                                                 |
| icon_hash      | string  | [the hash of the icon](#DOCS_REFERENCE/image-formatting)                                                                         |

###### Achievement Locale Object

| Name           | Description                                                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default        | the default locale for the achievement                                                                                                                  |
| localizations? | object of [accepted locales](#DOCS_DISPATCH_FIELD_VALUES/predefined-field-values-accepted-locales) as the key and achievement translations as the value |

###### User Achievement Struct

| name            | type   | description                                                                                |
| --------------- | ------ | ------------------------------------------------------------------------------------------ |
| UserId          | Int64  | the unique id of the user working on the achievement                                       |
| AchievementId   | Int64  | the unique id of the achievement                                                           |
| PercentComplete | UInt8  | how far along the user is to completing the achievement (0-100)                            |
| UnlockedAt      | string | the timestamp at which the user completed the achievement (PercentComplete was set to 100) |

## SetUserAchievement

Updates the current user's status for a given achievement. If `percentComplete` is set to `100`, the `UnlockedAt` field will be automatically updated with the current timestamp.

Returns `Discord.Result` via callback.

###### Parameters

| name            | type  | description                            |
| --------------- | ----- | -------------------------------------- |
| achievementId   | Int64 | the id of the achievement to update    |
| percentComplete | UInt8 | the user's updated percentage progress |

###### Example

```cs
achievementManager.SetUserAchievement(580159119969878046, 25, (res) =>
{
  if (res == Discord.Result.Ok)
  {
    Console.WriteLine("Achievement updated for user");
  }
});
```

## FetchUserAchievements

Loads a stable list of the current user's achievements to iterate over. If the user has any achievements, do your iteration within the callback of this function.

Returns `Discord.Result` via callback.

> info
> Remember to only iterate when there are results!

###### Parameters

None.

###### Example

```cs
achievementManager.FetchUserAchievements((res) =>
{
  if (res == Discord.Result.Ok)
  {
    // Count()
    // for() loop
  }
});
```

## CountUserAchievements

Counts the list of a user's achievements for iteration.

Returns `Int32`.

###### Parameters

None

###### Example

```cs
achievementManager.FetchUserAchievements((res) =>
{
  if (res == Discord.Result.Ok)
  {
    Console.WriteLine("User has {0} achievements for this game", achievementManager.CountUserAchievements());
  }
});
```

## GetUserAchievementAt

Gets the user's achievement at a given index of their list of achievements.

Returns `Discord.UserAchievement`

###### Parameters

| name  | type  | description                               |
| ----- | ----- | ----------------------------------------- |
| index | Int32 | the index at which to get the achievement |

###### Example

```cs
achievementManager.FetchUserAchievements((res) =>
{
  if (res == Discord.Result.Ok)
  {
    for (int i = 0; i < achievementManager.CountUserAchievements(); i++)
    {
      var achievement = achievementManager.GetUserAchievementAt(i);
      Console.WriteLine("Achievement progress for {0} for user {1}: {2}",
                        achievement.AchievementId,
                        achievement.UserId,
                        achievement.PercentComplete);
    }
  }
});
```

## GetUserAchievement

Gets the user achievement for the given achievement id. If you keep a hardcoded mapping of achievement <--> id in your codebase, this will be better than iterating over each achievement. Make sure to call `FetchUserAchievements()` first still!

###### Parameters

| name          | type  | description                      |
| ------------- | ----- | -------------------------------- |
| achievementId | Int64 | the id of the achievement to get |

###### Example

```cs
achievementManager.FetchUserAchievements((res) =>
{
  if (res == Discord.Result.Ok)
  {
    var achievement = achievementManager.GetUserAchievement(580159119969878046);
    Console.WriteLine("Achievement progress for {0} for user {1}: {2}",
                      achievement.AchievementId,
                      achievement.UserId,
                      achievement.PercentComplete);
  }
});
```

## OnUserAchievementUpdate

Fires when an achievement is updated for the currently connected user

###### Parameters

| name        | type                | description                      |
| ----------- | ------------------- | -------------------------------- |
| achievement | ref UserAchievement | the achievement that was updated |

## The API Way

Below are the API endpoints and the parameters they accept. If you choose to interface directly with the Discord API, you will need a "Bot token". This is a special authorization token with which your application can access Discord's HTTP API. Head on over to [your application's dashboard](https://discord.com/developers/), and hit the big "Add a Bot User" button. From there, mutter _abra kadabra_ and reveal the token. Click [here](#DOCS_REFERENCE/authentication) to see how you can authorize your requests.

## Get Achievements % GET /applications/{application.id#DOCS_RESOURCES_APPLICATION/application-object}/achievements

Returns a list of [achievements](#DOCS_GAME_SDK_ACHIEVEMENTS/data-models-achievement-struct) for the given application.

###### Example Response

```json
[
  {
    "application_id": "461618159171141643",
    "name": {
      "default": "Win the Game"
    },
    "description": {
      "default": "You won!"
    },
    "secret": false,
    "icon_hash": "52c1636444f64ad7cb5368b158847def",
    "id": "580159119969878046",
    "secure": false
  }
]
```

## Get Achievement % GET /applications/{application.id#DOCS_RESOURCES_APPLICATION/application-object}/achievements/{achievement.id#DOCS_GAME_SDK_ACHIEVEMENTS/data-models-achievement-struct}

Returns the given [achievement](#DOCS_GAME_SDK_ACHIEVEMENTS/data-models-achievement-struct) for the given application.

###### Example Response

```json
{
  "application_id": "461618159171141643",
  "name": {
    "default": "Win the Game"
  },
  "description": {
    "default": "You won!"
  },
  "secret": false,
  "icon_hash": "52c1636444f64ad7cb5368b158847def",
  "id": "580159119969878046",
  "secure": false
}
```

## Create Achievement % POST /applications/{application.id#DOCS_RESOURCES_APPLICATION/application-object}/achievements

Creates a new [achievement](#DOCS_GAME_SDK_ACHIEVEMENTS/data-models-achievement-struct) for your application.

> info
> Applications can have a maximum of 1000 achievements.

###### JSON Params

| name        | type      | description                             |
| ----------- | --------- | --------------------------------------- |
| name        | string    | the name of the achievement             |
| description | string    | the user-facing achievement description |
| secret      | boolean   | if the achievement is secret            |
| secure      | boolean   | if the achievement is secure            |
| icon        | ImageType | the icon for the achievement            |

###### Example Body

```json
{
  "name": {
    "default": "Find the Secret"
  },
  "description": {
    "default": "You found it!"
  },
  "secret": true,
  "secure": false,
  "icon": "data:image/png;base64,base64_data_here"
}
```

###### Example Response

```json
{
  "application_id": "461618159171141643",
  "name": {
    "default": "Find the Secret"
  },
  "description": {
    "default": "You found it!"
  },
  "secret": true,
  "icon_hash": "52c1636444f64ad7cb5368b158847def",
  "id": "597763781871861018",
  "secure": false
}
```

## Modify Achievement % PATCH /applications/{application.id#DOCS_RESOURCES_APPLICATION/application-object}/achievements/{achievement.id#DOCS_GAME_SDK_ACHIEVEMENTS/data-models-achievement-struct}

Updates the [achievement](#DOCS_GAME_SDK_ACHIEVEMENTS/data-models-achievement-struct) for all users. This is **NOT** to update a single user's achievement progress; this is to edit the `UserAchievement` itself.

###### JSON Params

| name        | type      | description                             |
| ----------- | --------- | --------------------------------------- |
| name        | string    | the name of the achievement             |
| description | string    | the user-facing achievement description |
| secret      | boolean   | if the achievement is secret            |
| secure      | boolean   | if the achievement is secure            |
| icon        | ImageType | the icon for the achievement            |

###### Example Body

```json
{
  "name": {
    "default": "How do methods break up?"
  },
  "description": {
    "default": "They stop calling each other!"
  },
  "secret": false,
  "secure": false,
  "icon": "data:image/png;base64,base64_data_here"
}
```

###### Example Response

```json
{
  "application_id": "461618159171141643",
  "name": {
    "default": "How do methods break up?"
  },
  "description": {
    "default": "They stop calling each other!"
  },
  "secret": false,
  "icon_hash": "7d698b594c691e3d28c92e226b28293c",
  "id": "597638720379682816",
  "secure": false
}
```

## Delete Achievement % DELETE /applications/{application.id#DOCS_RESOURCES_APPLICATION/application-object}/achievements/{achievement.id#DOCS_GAME_SDK_ACHIEVEMENTS/data-models-achievement-struct}

Deletes the given [achievement](#DOCS_GAME_SDK_ACHIEVEMENTS/data-models-achievement-struct) from your application. Returns a `204` on success.

## Modify User Achievement % PUT /users/{user.id}/applications/{application.id}/achievements/{achievement.id}

Updates the `UserAchievement` record for a given user. Use this endpoint to update `secure` achievement progress for users.

###### JSON Params

| Name             | Type     | Description                                            |
| ---------------- | -------- | ------------------------------------------------------ |
| percent_complete | integer  | the user's progress towards completing the achievement |

###### Example Response

```json
{}
```

## Get User Achievements % GET /users/{user.id#DOCS_RESOURCES_USER/user-object}/applications/{application.id#DOCS_RESOURCES_APPLICATION/application-object}//achievements/{achievement.id#DOCS_GAME_SDK_ACHIEVEMENTS/data-models-achievement-struct}

Returns a list of achievements for the user whose token you're making the request with. This endpoint will **NOT** accept the Bearer token for your application generated via the [Client Crendentials Grant](#DOCS_TOPICS_OAUTH2/client-credentials-grant). You will need the _user's_ bearer token, gotten via either the [Authorization Code OAuth2 Grant](#DOCS_TOPICS_OAUTH2/authorization-code-grant) or via the SDK with [GetOAuth2Token](#DOCS_GAME_SDK_APPLICATIONS/get-oauth2-token). This endpoint has a rate limit of 2 requests per 5 seconds per application per user.

> info
> This endpoint will _not_ return any achievements marked as `secret` that the user has not yet completed.

###### Example Response

```json
[
  {
    "application_id": "461618159171141643",
    "name": {
      "default": "Win the Game"
    },
    "description": {
      "default": "You won!"
    },
    "secret": false,
    "icon_hash": "52c1636444f64ad7cb5368b158847def",
    "id": "580159119969878046",
    "secure": false
  }
]
```

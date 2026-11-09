# Original commits

This repository starts with a fresh history (see the [README](README.md) for why). This page maps my main contributions to the commits in the team's original repository, which is private, and links to where that code lives now.

Commit IDs and messages are copied as-is from the original repository.

## 1. Conversation memory

This was a key part of my contribution to the project. I enjoyed the challenge of slowly working through the code and weaving the thread ID in, which allowed us to get as close to completion as we did. 

| Date (2024) | Original commit | Message | What it did |
|---|---|---|---|
| Sep 2 | `480f1e5` | "first virsion of code with thread_id recall enabled, which serves as memory" | Made the service return the thread ID along with the reply, so the rest of the app could reuse it. Moved unused code out of the service. |
| Sep 2 | `9ebea55` | "commiting current work be merging with other branches" | Built out the game endpoints around the thread and added the shared logging configuration. |
| Sep 7 | `52c1c5a` | "chat is working but you have to copy paste thread id" | First working chat in the browser, with the thread ID still entered by hand. |
| Sep 8 | `e54dab0` | "jsut pushing the latest" | `ChatBox` stores the thread ID from each reply and sends it back with the next message. |
| Sep 8 | `798b603` | "chat is working again currently have to delete and create new character if you change screen." | Saved the thread ID on the `Game` record. |

**Where it lives now:**

- **Service returns the thread ID:** [`openai_service.py` L102](backend/chatbot_proj/openai_app/openai_service.py#L102) and [L176–L180](backend/chatbot_proj/openai_app/openai_service.py#L176-L180)
- **Game-turn endpoint reads, saves and returns it:** [`views.py` L88](backend/chatbot_proj/game_app/views.py#L88), [L140–L142](backend/chatbot_proj/game_app/views.py#L140-L142) and [L150](backend/chatbot_proj/game_app/views.py#L150)
- **Stored on the game:** [`models.py` L10](backend/chatbot_proj/game_app/models.py#L10)
- **Frontend keeps it and sends it back:** [`ChatBox.jsx` L16–L18](frontend/chatbot/src/components/ChatBox.jsx#L16-L18), [L58–L74](frontend/chatbot/src/components/ChatBox.jsx#L58-L74) and [`chatbotService.jsx` L17–L21](frontend/chatbot/src/utilities/chatbotService.jsx#L17-L21)

## 2. Merging branches and resolving conflicts

The entire team was relatively new to using Git, and this was the first shared repo for all of us. This, of course, meant learning about merge conflicts. Whenever they occurred, I resolved many of them, specifically where the backend and chat branches met, and got everything running again. I enjoy puzzles, and that is what this felt like. Not that I want to do it all the time. I helped Brandon with merging branches into main after he had a few hairy experiences.

| Date (2024) | Original commit | Message | What it did |
|---|---|---|---|
| Aug 29 | `de2f9b3` | "removeing confilcts" | Removed conflict markers from game views and switched them to the team's shared token-auth class. |
| Aug 29 | `d82dd5b` | "managed all conflicts between character and game app. Mostly urls and secretkey changes" | Cleared committed conflict markers from the project's settings and URL files, and reconnected the game routes. |
| Aug 30 | `a9f52ad` (merge) | "merge with openai_chatbot" | Brought the OpenAI chat branch into the game app and connected its routes. |
| Sep 2 | `6431205` (merge) | "merging with chatbot updates" | Reconciled the game endpoints with the character-creation updates. |
| Sep 4 | `2b81cf5` | "resolved all merge conflicts" | Removed committed conflict markers from the frontend router. |
| Sep 6 | `53bacfb` (PR #19) | "Merge pull request #19 from byeoh100/merge_all_maybe" | Merged the combined branch into `main`. |
| Sep 8 | `50372ee` (merge) | "gtMerge remote-tracking branch 'origin/buttons' into merge_all_maybe" | Kept the new `ChatBox` turn handling over an older version of it. |
| Sep 9 | `0cb0604` (merge), then `2783c27` (PR #28) | "Merge branch 'testing' into changing-how-data-is-passed" | Reconciled the chat and game pages, then merged the turn-data fix into `main`. |

## 3. Building the game backend

I created game_app, which holds the data for the different generas you could play. I designed the game's DB schema and connected the LLM to the live game data. The original version just stored the dragon. After finishing the initial build I restructure the DB into Theme, Monster and Location models so the game could be expanded for different genres. Coding the game app gave me the opportunity to learn about using signals in Python for preseeding DBs. 

| Date (2024) | Original commit | Message | What it did |
|---|---|---|---|
| Aug 28 | `f01ec5a` | "pushing game_app branch with modles and serializers built." | Created `game_app` with its first models and serializers. |
| Aug 28 | `363c45a` | "adding urls.py" | Added the game routes and first view. |
| Aug 29 | `ca71991` | "monster and enviroment are now list and dics" | Added the custom user manager behind email-based login. |
| Aug 30 | `c4939a0` | "post delet model to dict tested and working" | Endpoints for creating, fetching and deleting a game. |
| Aug 31 | `9412b03` | "wired up openai promt with current gamedata" | Sent live game data to the AI in place of placeholder text. |
| Sep 3 | `891cc1e` | "modified all game_app endpoints to use game id for look up. All made game-turn view with erikas code" | Built the game-turn endpoint and switched lookups to game IDs. |
| Sep 5 | `25caac6` | "built different modles for Theme, Monster, and Locatoin but not linked" | Split game data into `Theme`, `Monster` and `Location`, and seeded the starting content after migrations. |
| Sep 6 | `b1246f4` | "models are seperated and working witht the front end game creation and character creation" | Connected the new models to game and character creation. |
| Sep 9 | `80a746b` | "seperated turn data from game data turn order start =0" | Fixed turn handling and made turns start at zero. |
| Sep 10 | `d7ab09e` | "reset not goes to zero" | Made restarting a game reset its turn count. |

**Where it lives now:**

- **Models:** [`game_app/models.py`](backend/chatbot_proj/game_app/models.py) and [`game_app/serializers.py`](backend/chatbot_proj/game_app/serializers.py)
- **Routes:** [`game_app/urls.py` L7–L9](backend/chatbot_proj/game_app/urls.py#L7-L9)
- **Start, fetch and delete a game:** [`views.py` L21–L63](backend/chatbot_proj/game_app/views.py#L21-L63)
- **Game-turn endpoint:** [`views.py` L66–L150](backend/chatbot_proj/game_app/views.py#L66-L150). The win/loss check at L115–L135 was written by Erika.
- **Game lookup helpers:** [`game_helper_functions.py`](backend/chatbot_proj/game_app/game_helper_functions.py)
- **Starting content after migrations:** [`signals.py`](backend/chatbot_proj/game_app/signals.py)
- **Email-login user manager:** [`user_app/models.py` L4–L29](backend/chatbot_proj/user_app/models.py#L4-L29)
- **Shared logging:** [`logging_config.py`](backend/chatbot_proj/openai_app/logging_config.py)
- **Monster prompt rules (later refined by Erika):** [`openai_service.py` L123–L133](backend/chatbot_proj/openai_app/openai_service.py#L123-L133)

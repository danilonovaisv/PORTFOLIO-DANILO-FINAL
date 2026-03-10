2026-03-10T06:04:27.4800132Z Current runner version: '2.332.0'
2026-03-10T06:04:27.4824613Z ##[group]Runner Image Provisioner
2026-03-10T06:04:27.4825963Z Hosted Compute Agent
2026-03-10T06:04:27.4827238Z Version: 20260213.493
2026-03-10T06:04:27.4828323Z Commit: 5c115507f6dd24b8de37d8bbe0bb4509d0cc0fa3
2026-03-10T06:04:27.4829465Z Build Date: 2026-02-13T00:28:41Z
2026-03-10T06:04:27.4830541Z Worker ID: ***33c79521-4f96-494d-b0fd-9d0af43594c9***
2026-03-10T06:04:27.4831641Z Azure Region: westus
2026-03-10T06:04:27.4832535Z ##[endgroup]
2026-03-10T06:04:27.4834374Z ##[group]Operating System
2026-03-10T06:04:27.4835361Z Ubuntu
2026-03-10T06:04:27.4836148Z 24.04.3
2026-03-10T06:04:27.4837410Z LTS
2026-03-10T06:04:27.4838175Z ##[endgroup]
2026-03-10T06:04:27.4839109Z ##[group]Runner Image
2026-03-10T06:04:27.4840036Z Image: ubuntu-24.04
2026-03-10T06:04:27.4840844Z Version: 20260302.42.1
2026-03-10T06:04:27.4842518Z Included Software: https://github.com/actions/runner-images/blob/ubuntu24/20260302.42/images/ubuntu/Ubuntu2404-Readme.md
2026-03-10T06:04:27.4844459Z Image Release: https://github.com/actions/runner-images/releases/tag/ubuntu24%2F20260302.42
2026-03-10T06:04:27.4845640Z ##[endgroup]
2026-03-10T06:04:27.4847532Z ##[group]GITHUB_TOKEN Permissions
2026-03-10T06:04:27.4849736Z Contents: read
2026-03-10T06:04:27.4850699Z Metadata: read
2026-03-10T06:04:27.4851526Z ##[endgroup]
2026-03-10T06:04:27.4853923Z Secret source: Actions
2026-03-10T06:04:27.4855108Z Prepare workflow directory
2026-03-10T06:04:27.5396214Z Prepare all required actions
2026-03-10T06:04:27.5433713Z Getting action download info
2026-03-10T06:04:28.0185238Z Download action repository 'actions/checkout@v4' (SHA:34e114876b0b11c390a56381ad16ebd13914f8d5)
2026-03-10T06:04:28.2051208Z Download action repository 'pnpm/action-setup@v4' (SHA:41ff72655975bd51cab0327fa583b6e92b6d3061)
2026-03-10T06:04:28.8003645Z Download action repository 'actions/setup-node@v4' (SHA:49933ea5288caeca8642d1e84afbd3f7d6820020)
2026-03-10T06:04:28.9719688Z Download action repository 'google-github-actions/auth@v2' (SHA:c200f3691d83b41bf9bbd8638997a462592937ed)
2026-03-10T06:04:29.6142651Z Complete job name: test-and-deploy
2026-03-10T06:04:29.7226152Z ##[group]Run actions/checkout@v4
2026-03-10T06:04:29.7228144Z with:
2026-03-10T06:04:29.7229514Z   repository: danilonovaisv/PORTFOLIO-DANILO-FINAL
2026-03-10T06:04:29.7231426Z   token: ***
2026-03-10T06:04:29.7232619Z   ssh-strict: true
2026-03-10T06:04:29.7233835Z   ssh-user: git
2026-03-10T06:04:29.7235083Z   persist-credentials: true
2026-03-10T06:04:29.7236542Z   clean: true
2026-03-10T06:04:29.7237807Z   sparse-checkout-cone-mode: true
2026-03-10T06:04:29.7239222Z   fetch-depth: 1
2026-03-10T06:04:29.7240427Z   fetch-tags: false
2026-03-10T06:04:29.7241664Z   show-progress: true
2026-03-10T06:04:29.7242921Z   lfs: false
2026-03-10T06:04:29.7244106Z   submodules: false
2026-03-10T06:04:29.7245369Z   set-safe-directory: true
2026-03-10T06:04:29.7247323Z env:
2026-03-10T06:04:29.7248498Z   NODE_VERSION: 20
2026-03-10T06:04:29.7249750Z   PNPM_VERSION: 10.32.0
2026-03-10T06:04:29.7251545Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-10T06:04:29.7257080Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-10T06:04:29.7259159Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-10T06:04:29.7261369Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-10T06:04:29.7267288Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-10T06:04:29.7303006Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-10T06:04:29.7304643Z   FIREBASE_PROJECT_ID: ***
2026-03-10T06:04:29.7305979Z ##[endgroup]
2026-03-10T06:04:29.8421382Z Syncing repository: danilonovaisv/PORTFOLIO-DANILO-FINAL
2026-03-10T06:04:29.8425632Z ##[group]Getting Git version info
2026-03-10T06:04:29.8428064Z Working directory is '/home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL'
2026-03-10T06:04:29.8431508Z [command]/usr/bin/git version
2026-03-10T06:04:29.8489638Z git version 2.53.0
2026-03-10T06:04:29.8517653Z ##[endgroup]
2026-03-10T06:04:29.8530998Z Temporarily overriding HOME='/home/runner/work/_temp/71d30467-755e-48a2-978b-72b67d7281fc' before making global git config changes
2026-03-10T06:04:29.8534986Z Adding repository directory to the temporary git global config as a safe directory
2026-03-10T06:04:29.8544990Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL
2026-03-10T06:04:29.8587161Z Deleting the contents of '/home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL'
2026-03-10T06:04:29.8591458Z ##[group]Initializing the repository
2026-03-10T06:04:29.8594089Z [command]/usr/bin/git init /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL
2026-03-10T06:04:29.8709089Z hint: Using 'master' as the name for the initial branch. This default branch name
2026-03-10T06:04:29.8713254Z hint: will change to "main" in Git 3.0. To configure the initial branch name
2026-03-10T06:04:29.8716683Z hint: to use in all of your new repositories, which will suppress this warning,
2026-03-10T06:04:29.8718609Z hint: call:
2026-03-10T06:04:29.8720406Z hint:
2026-03-10T06:04:29.8721848Z hint: 	git config --global init.defaultBranch <name>
2026-03-10T06:04:29.8723668Z hint:
2026-03-10T06:04:29.8725815Z hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
2026-03-10T06:04:29.8728395Z hint: 'development'. The just-created branch can be renamed via this command:
2026-03-10T06:04:29.8730420Z hint:
2026-03-10T06:04:29.8731604Z hint: 	git branch -m <name>
2026-03-10T06:04:29.8732900Z hint:
2026-03-10T06:04:29.8734523Z hint: Disable this message with "git config set advice.defaultBranchName false"
2026-03-10T06:04:29.8737551Z Initialized empty Git repository in /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/.git/
2026-03-10T06:04:29.8742110Z [command]/usr/bin/git remote add origin https://github.com/danilonovaisv/PORTFOLIO-DANILO-FINAL
2026-03-10T06:04:29.8781891Z ##[endgroup]
2026-03-10T06:04:29.8784686Z ##[group]Disabling automatic garbage collection
2026-03-10T06:04:29.8786921Z [command]/usr/bin/git config --local gc.auto 0
2026-03-10T06:04:29.8818173Z ##[endgroup]
2026-03-10T06:04:29.8820099Z ##[group]Setting up auth
2026-03-10T06:04:29.8824037Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2026-03-10T06:04:29.8856973Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2026-03-10T06:04:29.9218357Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2026-03-10T06:04:29.9250230Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2026-03-10T06:04:29.9481833Z [command]/usr/bin/git config --local --name-only --get-regexp ^includeIf\.gitdir:
2026-03-10T06:04:29.9526757Z [command]/usr/bin/git submodule foreach --recursive git config --local --show-origin --name-only --get-regexp remote.origin.url
2026-03-10T06:04:29.9763236Z [command]/usr/bin/git config --local http.https://github.com/.extraheader AUTHORIZATION: basic ***
2026-03-10T06:04:29.9799125Z ##[endgroup]
2026-03-10T06:04:29.9802800Z ##[group]Fetching the repository
2026-03-10T06:04:29.9811505Z [command]/usr/bin/git -c protocol.version=2 fetch --no-tags --prune --no-recurse-submodules --depth=1 origin +c3018b0b972490252fffb0b54860d40c42b47058:refs/remotes/origin/main
2026-03-10T06:04:55.9321522Z From https://github.com/danilonovaisv/PORTFOLIO-DANILO-FINAL
2026-03-10T06:04:55.9322998Z  * [new ref]           c3018b0b972490252fffb0b54860d40c42b47058 -> origin/main
2026-03-10T06:04:55.9359660Z ##[endgroup]
2026-03-10T06:04:55.9360787Z ##[group]Determining the checkout info
2026-03-10T06:04:55.9361914Z ##[endgroup]
2026-03-10T06:04:55.9367326Z [command]/usr/bin/git sparse-checkout disable
2026-03-10T06:04:55.9419225Z [command]/usr/bin/git config --local --unset-all extensions.worktreeConfig
2026-03-10T06:04:55.9447280Z ##[group]Checking out the ref
2026-03-10T06:04:55.9452152Z [command]/usr/bin/git checkout --progress --force -B main refs/remotes/origin/main
2026-03-10T06:04:57.0963776Z Updating files:  30% (6151/20099)
2026-03-10T06:04:57.2450787Z Updating files:  31% (6231/20099)
2026-03-10T06:04:57.3932025Z Updating files:  32% (6432/20099)
2026-03-10T06:04:57.5191979Z Updating files:  33% (6633/20099)
2026-03-10T06:04:57.6983432Z Updating files:  34% (6834/20099)
2026-03-10T06:04:57.9803932Z Updating files:  35% (7035/20099)
2026-03-10T06:04:57.9975296Z Updating files:  36% (7236/20099)
2026-03-10T06:04:58.1271163Z Updating files:  36% (7258/20099)
2026-03-10T06:04:58.3837745Z Updating files:  37% (7437/20099)
2026-03-10T06:04:58.4821338Z Updating files:  38% (7638/20099)
2026-03-10T06:04:58.7038929Z Updating files:  39% (7839/20099)
2026-03-10T06:04:58.7788602Z Updating files:  40% (8040/20099)
2026-03-10T06:04:59.0084259Z Updating files:  41% (8241/20099)
2026-03-10T06:04:59.0086275Z Updating files:  41% (8441/20099)
2026-03-10T06:04:59.2083234Z Updating files:  42% (8442/20099)
2026-03-10T06:04:59.3727607Z Updating files:  43% (8643/20099)
2026-03-10T06:04:59.5484687Z Updating files:  44% (8844/20099)
2026-03-10T06:04:59.6945982Z Updating files:  45% (9045/20099)
2026-03-10T06:04:59.7320528Z Updating files:  46% (9246/20099)
2026-03-10T06:04:59.7455676Z Updating files:  47% (9447/20099)
2026-03-10T06:04:59.7591942Z Updating files:  48% (9648/20099)
2026-03-10T06:04:59.7724625Z Updating files:  49% (9849/20099)
2026-03-10T06:04:59.7859429Z Updating files:  50% (10050/20099)
2026-03-10T06:04:59.8007070Z Updating files:  51% (10251/20099)
2026-03-10T06:04:59.8147732Z Updating files:  52% (10452/20099)
2026-03-10T06:04:59.8289524Z Updating files:  53% (10653/20099)
2026-03-10T06:04:59.8423513Z Updating files:  54% (10854/20099)
2026-03-10T06:04:59.8557526Z Updating files:  55% (11055/20099)
2026-03-10T06:04:59.8689597Z Updating files:  56% (11256/20099)
2026-03-10T06:04:59.8822198Z Updating files:  57% (11457/20099)
2026-03-10T06:04:59.8955063Z Updating files:  58% (11658/20099)
2026-03-10T06:04:59.9107119Z Updating files:  59% (11859/20099)
2026-03-10T06:04:59.9241425Z Updating files:  60% (12060/20099)
2026-03-10T06:04:59.9374581Z Updating files:  61% (12261/20099)
2026-03-10T06:04:59.9509691Z Updating files:  62% (12462/20099)
2026-03-10T06:04:59.9642948Z Updating files:  63% (12663/20099)
2026-03-10T06:04:59.9957966Z Updating files:  64% (12864/20099)
2026-03-10T06:05:00.1454980Z Updating files:  64% (12998/20099)
2026-03-10T06:05:00.7543345Z Updating files:  65% (13065/20099)
2026-03-10T06:05:00.9128531Z Updating files:  66% (13266/20099)
2026-03-10T06:05:01.0082093Z Updating files:  67% (13467/20099)
2026-03-10T06:05:01.1545748Z Updating files:  67% (13591/20099)
2026-03-10T06:05:01.2266198Z Updating files:  68% (13668/20099)
2026-03-10T06:05:01.3243441Z Updating files:  69% (13869/20099)
2026-03-10T06:05:01.3871795Z Updating files:  70% (14070/20099)
2026-03-10T06:05:01.5366165Z Updating files:  71% (14271/20099)
2026-03-10T06:05:01.6266692Z Updating files:  72% (14472/20099)
2026-03-10T06:05:01.6669167Z Updating files:  73% (14673/20099)
2026-03-10T06:05:01.6842261Z Updating files:  74% (14874/20099)
2026-03-10T06:05:01.6977639Z Updating files:  75% (15075/20099)
2026-03-10T06:05:01.7107580Z Updating files:  76% (15276/20099)
2026-03-10T06:05:01.7229591Z Updating files:  77% (15477/20099)
2026-03-10T06:05:01.7956107Z Updating files:  78% (15678/20099)
2026-03-10T06:05:02.0018496Z Updating files:  79% (15879/20099)
2026-03-10T06:05:02.1447634Z Updating files:  80% (16080/20099)
2026-03-10T06:05:02.4665484Z Updating files:  81% (16281/20099)
2026-03-10T06:05:02.6654890Z Updating files:  82% (16482/20099)
2026-03-10T06:05:02.8769898Z Updating files:  83% (16683/20099)
2026-03-10T06:05:02.9696770Z Updating files:  84% (16884/20099)
2026-03-10T06:05:03.0063304Z Updating files:  85% (17085/20099)
2026-03-10T06:05:03.0634154Z Updating files:  85% (17092/20099)
2026-03-10T06:05:03.2276078Z Updating files:  86% (17286/20099)
2026-03-10T06:05:03.2416994Z Updating files:  87% (17487/20099)
2026-03-10T06:05:03.2557635Z Updating files:  88% (17688/20099)
2026-03-10T06:05:03.2701291Z Updating files:  89% (17889/20099)
2026-03-10T06:05:03.2848359Z Updating files:  90% (18090/20099)
2026-03-10T06:05:03.2999439Z Updating files:  91% (18291/20099)
2026-03-10T06:05:03.3145234Z Updating files:  92% (18492/20099)
2026-03-10T06:05:03.4985685Z Updating files:  93% (18693/20099)
2026-03-10T06:05:03.6087556Z Updating files:  94% (18894/20099)
2026-03-10T06:05:03.6163127Z Updating files:  95% (19095/20099)
2026-03-10T06:05:03.6505131Z Updating files:  96% (19296/20099)
2026-03-10T06:05:03.6677552Z Updating files:  97% (19497/20099)
2026-03-10T06:05:03.6784910Z Updating files:  98% (19698/20099)
2026-03-10T06:05:03.6898491Z Updating files:  99% (19899/20099)
2026-03-10T06:05:03.6898905Z Updating files: 100% (20099/20099)
2026-03-10T06:05:03.6899256Z Updating files: 100% (20099/20099), done.
2026-03-10T06:05:03.8340534Z Switched to a new branch 'main'
2026-03-10T06:05:03.8343737Z branch 'main' set up to track 'origin/main'.
2026-03-10T06:05:03.8669249Z ##[endgroup]
2026-03-10T06:05:03.8728241Z [command]/usr/bin/git log -1 --format=%H
2026-03-10T06:05:03.8742918Z c3018b0b972490252fffb0b54860d40c42b47058
2026-03-10T06:05:03.8938240Z ##[group]Run pnpm/action-setup@v4
2026-03-10T06:05:03.8938602Z with:
2026-03-10T06:05:03.8938862Z   version: 10.32.0
2026-03-10T06:05:03.8939142Z   dest: ~/setup-pnpm
2026-03-10T06:05:03.8939424Z   run_install: null
2026-03-10T06:05:03.8939708Z   package_json_file: package.json
2026-03-10T06:05:03.8940028Z   standalone: false
2026-03-10T06:05:03.8940294Z env:
2026-03-10T06:05:03.8940538Z   NODE_VERSION: 20
2026-03-10T06:05:03.8940803Z   PNPM_VERSION: 10.32.0
2026-03-10T06:05:03.8941270Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-10T06:05:03.8942719Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-10T06:05:03.8943228Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-10T06:05:03.8943768Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-10T06:05:03.8945320Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-10T06:05:03.8955122Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-10T06:05:03.8955525Z   FIREBASE_PROJECT_ID: ***
2026-03-10T06:05:03.8955821Z ##[endgroup]
2026-03-10T06:05:03.9510546Z ##[group]Running self-installer...
2026-03-10T06:05:04.4764189Z Progress: resolved 1, reused 0, downloaded 0, added 0
2026-03-10T06:05:04.4885388Z Packages: +1
2026-03-10T06:05:04.4886946Z +
2026-03-10T06:05:04.9242956Z Progress: resolved 1, reused 0, downloaded 1, added 1, done
2026-03-10T06:05:04.9612751Z 
2026-03-10T06:05:04.9613558Z dependencies:
2026-03-10T06:05:04.9614101Z + pnpm 10.32.0
2026-03-10T06:05:04.9614467Z 
2026-03-10T06:05:04.9643826Z Done in 848ms
2026-03-10T06:05:04.9811654Z ##[endgroup]
2026-03-10T06:05:04.9816681Z Installation Completed!
2026-03-10T06:05:04.9951370Z ##[group]Run actions/setup-node@v4
2026-03-10T06:05:04.9951734Z with:
2026-03-10T06:05:04.9951993Z   node-version: 20
2026-03-10T06:05:04.9952272Z   cache: pnpm
2026-03-10T06:05:04.9952583Z   cache-dependency-path: pnpm-lock.yaml
2026-03-10T06:05:04.9952933Z   always-auth: false
2026-03-10T06:05:04.9953213Z   check-latest: false
2026-03-10T06:05:04.9953583Z   token: ***
2026-03-10T06:05:04.9953848Z env:
2026-03-10T06:05:04.9954109Z   NODE_VERSION: 20
2026-03-10T06:05:04.9954397Z   PNPM_VERSION: 10.32.0
2026-03-10T06:05:04.9954816Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-10T06:05:04.9956218Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-10T06:05:04.9956948Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-10T06:05:04.9957488Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-10T06:05:04.9959011Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-10T06:05:04.9968849Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-10T06:05:04.9969249Z   FIREBASE_PROJECT_ID: ***
2026-03-10T06:05:04.9969647Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2026-03-10T06:05:04.9970023Z ##[endgroup]
2026-03-10T06:05:05.1741669Z Found in cache @ /opt/hostedtoolcache/node/20.20.0/x64
2026-03-10T06:05:05.1748863Z ##[group]Environment details
2026-03-10T06:05:08.8002671Z node: v20.20.0
2026-03-10T06:05:08.8003224Z npm: 10.8.2
2026-03-10T06:05:08.8003676Z yarn: 1.22.22
2026-03-10T06:05:08.8005422Z ##[endgroup]
2026-03-10T06:05:08.8032482Z [command]/home/runner/setup-pnpm/node_modules/.bin/pnpm store path --silent
2026-03-10T06:05:09.3434423Z /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/.pnpm-store/v10
2026-03-10T06:05:09.6770510Z pnpm cache is not found
2026-03-10T06:05:09.6895119Z ##[group]Run pnpm install --frozen-lockfile --ignore-scripts
2026-03-10T06:05:09.6895722Z [36;1mpnpm install --frozen-lockfile --ignore-scripts[0m
2026-03-10T06:05:09.8910832Z shell: /usr/bin/bash -e ***0***
2026-03-10T06:05:09.8911201Z env:
2026-03-10T06:05:09.8911449Z   NODE_VERSION: 20
2026-03-10T06:05:09.8911732Z   PNPM_VERSION: 10.32.0
2026-03-10T06:05:09.8912167Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-10T06:05:09.8913768Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-10T06:05:09.8914296Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-10T06:05:09.8914829Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-10T06:05:09.8917480Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-10T06:05:09.8929941Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-10T06:05:09.8930340Z   FIREBASE_PROJECT_ID: ***
2026-03-10T06:05:09.8930702Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2026-03-10T06:05:09.8931079Z ##[endgroup]
2026-03-10T06:05:10.3235548Z Scope: all 2 workspace projects
2026-03-10T06:05:10.4361318Z Lockfile is up to date, resolution step is skipped
2026-03-10T06:05:10.5891081Z Progress: resolved 1, reused 0, downloaded 0, added 0
2026-03-10T06:05:10.8392769Z Packages: +2045
2026-03-10T06:05:10.8393642Z ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
2026-03-10T06:05:11.5906944Z Progress: resolved 2045, reused 0, downloaded 0, added 0
2026-03-10T06:05:12.5908536Z Progress: resolved 2045, reused 3, downloaded 85, added 29
2026-03-10T06:05:13.5899990Z Progress: resolved 2045, reused 3, downloaded 321, added 247
2026-03-10T06:05:14.5920496Z Progress: resolved 2045, reused 3, downloaded 577, added 566
2026-03-10T06:05:15.5909850Z Progress: resolved 2045, reused 3, downloaded 735, added 647
2026-03-10T06:05:16.5923342Z Progress: resolved 2045, reused 3, downloaded 868, added 750
2026-03-10T06:05:17.5921291Z Progress: resolved 2045, reused 3, downloaded 1024, added 894
2026-03-10T06:05:18.5948360Z Progress: resolved 2045, reused 3, downloaded 1172, added 1023
2026-03-10T06:05:19.5980362Z Progress: resolved 2045, reused 3, downloaded 1190, added 1030
2026-03-10T06:05:20.5989622Z Progress: resolved 2045, reused 3, downloaded 1328, added 1109
2026-03-10T06:05:21.6050958Z Progress: resolved 2045, reused 3, downloaded 1518, added 1207
2026-03-10T06:05:22.6174777Z Progress: resolved 2045, reused 3, downloaded 1797, added 1434
2026-03-10T06:05:23.6177537Z Progress: resolved 2045, reused 3, downloaded 1973, added 1598
2026-03-10T06:05:24.6182565Z Progress: resolved 2045, reused 3, downloaded 2028, added 2037
2026-03-10T06:05:24.9352237Z Progress: resolved 2045, reused 3, downloaded 2028, added 2045, done
2026-03-10T06:05:26.1791475Z 
2026-03-10T06:05:26.1793247Z dependencies:
2026-03-10T06:05:26.1795041Z + @dataconnect/admin-generated @dataconnect/admin-generated@file:src/dataconnect-admin-generated(firebase-admin@13.7.0(encoding@0.1.13))
2026-03-10T06:05:26.1799369Z + @dataconnect/generated @dataconnect/generated@file:src/dataconnect-generated(@tanstack-query-firebase/react@2.1.1(@tanstack/react-query@5.90.21(react@19.2.4))(firebase@12.10.0))(firebase@12.10.0)
2026-03-10T06:05:26.1801081Z + @genkit-ai/google-genai 1.29.0
2026-03-10T06:05:26.1801679Z + @google/adk 0.5.0
2026-03-10T06:05:26.1802147Z + @gsap/react 2.1.2
2026-03-10T06:05:26.1802692Z + @hookform/resolvers 5.2.2
2026-03-10T06:05:26.1803307Z + @modelcontextprotocol/sdk 1.27.1
2026-03-10T06:05:26.1803951Z + @radix-ui/react-alert-dialog 1.1.15
2026-03-10T06:05:26.1804567Z + @radix-ui/react-avatar 1.1.11
2026-03-10T06:05:26.1805588Z + @radix-ui/react-checkbox 1.3.3
2026-03-10T06:05:26.1806587Z + @radix-ui/react-collapsible 1.1.12
2026-03-10T06:05:26.1829584Z + @radix-ui/react-dialog 1.1.15
2026-03-10T06:05:26.1830379Z + @radix-ui/react-dropdown-menu 2.1.16
2026-03-10T06:05:26.1831019Z + @radix-ui/react-label 2.1.8
2026-03-10T06:05:26.1831658Z + @radix-ui/react-menubar 1.1.16
2026-03-10T06:05:26.1832307Z + @radix-ui/react-popover 1.1.15
2026-03-10T06:05:26.1832959Z + @radix-ui/react-radio-group 1.3.8
2026-03-10T06:05:26.1833937Z + @radix-ui/react-separator 1.1.8
2026-03-10T06:05:26.1834621Z + @radix-ui/react-slider 1.3.6
2026-03-10T06:05:26.1835199Z + @radix-ui/react-slot 1.2.4
2026-03-10T06:05:26.1835781Z + @radix-ui/react-switch 1.2.6
2026-03-10T06:05:26.1836519Z + @radix-ui/react-tabs 1.1.13
2026-03-10T06:05:26.1837128Z + @radix-ui/react-toast 1.2.15
2026-03-10T06:05:26.1837779Z + @radix-ui/react-tooltip 1.2.8
2026-03-10T06:05:26.1838380Z + @react-three/drei 10.7.7
2026-03-10T06:05:26.1838952Z + @react-three/fiber 9.5.0
2026-03-10T06:05:26.1839558Z + @react-three/postprocessing 3.0.4
2026-03-10T06:05:26.1839926Z + @supabase/ssr 0.9.0
2026-03-10T06:05:26.1840271Z + @supabase/supabase-js 2.99.0
2026-03-10T06:05:26.1840653Z + class-variance-authority 0.7.1
2026-03-10T06:05:26.1841273Z + clsx 2.1.1
2026-03-10T06:05:26.1841862Z + embla-carousel-react 8.6.0
2026-03-10T06:05:26.1842461Z + firebase 12.10.0
2026-03-10T06:05:26.1842985Z + firebase-admin 13.7.0
2026-03-10T06:05:26.1843335Z + firebase-functions 7.1.1
2026-03-10T06:05:26.1843676Z + framer-motion 12.35.2
2026-03-10T06:05:26.1844031Z + gsap 3.14.2
2026-03-10T06:05:26.1844509Z + husky 9.1.7
2026-03-10T06:05:26.1844896Z + lenis 1.3.18
2026-03-10T06:05:26.1845415Z + lightningcss 1.32.0
2026-03-10T06:05:26.1845940Z + lint-staged 16.3.3
2026-03-10T06:05:26.1846598Z + lucide-react 0.577.0
2026-03-10T06:05:26.1847103Z + maath 0.10.8
2026-03-10T06:05:26.1847573Z + motion 12.35.2
2026-03-10T06:05:26.1848019Z + next 16.1.6
2026-03-10T06:05:26.1848454Z + ogl 1.0.11
2026-03-10T06:05:26.1848889Z + openai 6.27.0
2026-03-10T06:05:26.1849388Z + postprocessing 6.38.3
2026-03-10T06:05:26.1849883Z + react 19.2.4
2026-03-10T06:05:26.1850386Z + react-day-picker 9.14.0
2026-03-10T06:05:26.1850918Z + react-dom 19.2.4
2026-03-10T06:05:26.1851412Z + react-hook-form 7.71.2
2026-03-10T06:05:26.1851958Z + react-markdown 10.1.0
2026-03-10T06:05:26.1852495Z + server-only 0.0.1
2026-03-10T06:05:26.1852976Z + sharp 0.34.5
2026-03-10T06:05:26.1853469Z + tailwind-merge 3.5.0
2026-03-10T06:05:26.1854041Z + tailwindcss-animate 1.0.7
2026-03-10T06:05:26.1854573Z + three 0.183.2
2026-03-10T06:05:26.1855066Z + three-stdlib 2.36.1
2026-03-10T06:05:26.1855556Z + uuid 13.0.0
2026-03-10T06:05:26.1856059Z + zod 4.3.6
2026-03-10T06:05:26.1856707Z + zustand 5.0.11
2026-03-10T06:05:26.1856982Z 
2026-03-10T06:05:26.1857181Z devDependencies:
2026-03-10T06:05:26.1857666Z + @jest/globals 30.3.0
2026-03-10T06:05:26.1858311Z + @next/bundle-analyzer 16.1.6
2026-03-10T06:05:26.1858971Z + @next/eslint-plugin-next 16.1.6
2026-03-10T06:05:26.1859571Z + @playwright/test 1.58.2
2026-03-10T06:05:26.1860119Z + @tailwindcss/postcss 4.2.1
2026-03-10T06:05:26.1860733Z + @tailwindcss/typography 0.5.19
2026-03-10T06:05:26.1861336Z + @testing-library/dom 10.4.1
2026-03-10T06:05:26.1861957Z + @testing-library/jest-dom 6.9.1
2026-03-10T06:05:26.1862580Z + @testing-library/react 16.3.2
2026-03-10T06:05:26.1863222Z + @testing-library/user-event 14.6.1
2026-03-10T06:05:26.1863828Z + @types/jest 30.0.0
2026-03-10T06:05:26.1864343Z + @types/node 25.4.0
2026-03-10T06:05:26.1864862Z + @types/pg 8.18.0
2026-03-10T06:05:26.1865373Z + @types/react 19.2.14
2026-03-10T06:05:26.1865908Z + @types/react-dom 19.2.3
2026-03-10T06:05:26.1866601Z + @types/three 0.183.1
2026-03-10T06:05:26.1867240Z + @typescript-eslint/eslint-plugin 8.57.0
2026-03-10T06:05:26.1867940Z + @typescript-eslint/parser 8.57.0
2026-03-10T06:05:26.1868529Z + autoprefixer 10.4.27
2026-03-10T06:05:26.1869049Z + commander 14.0.3
2026-03-10T06:05:26.1869534Z + depcheck 1.4.7
2026-03-10T06:05:26.1870232Z + dotenv 17.3.1
2026-03-10T06:05:26.1870693Z + esbuild 0.27.3
2026-03-10T06:05:26.1871220Z + eslint 10.0.3
2026-03-10T06:05:26.1871748Z + eslint-config-next 16.1.6
2026-03-10T06:05:26.1872378Z + eslint-config-prettier 10.1.8
2026-03-10T06:05:26.1872990Z + eslint-plugin-import 2.32.0
2026-03-10T06:05:26.1873597Z + eslint-plugin-prettier 5.5.5
2026-03-10T06:05:26.1874251Z + eslint-plugin-react 7.37.5
2026-03-10T06:05:26.1874815Z + firebase-tools 15.9.1
2026-03-10T06:05:26.1875499Z + jest 30.3.0
2026-03-10T06:05:26.1876057Z + jest-environment-jsdom 30.3.0
2026-03-10T06:05:26.1876797Z + knip 5.86.0
2026-03-10T06:05:26.1877252Z + pg 8.20.0
2026-03-10T06:05:26.1877689Z + postcss 8.5.8
2026-03-10T06:05:26.1877982Z + prettier 3.8.1
2026-03-10T06:05:26.1878265Z + rimraf 6.1.3
2026-03-10T06:05:26.1878536Z + serve 14.2.6
2026-03-10T06:05:26.1878800Z + shadcn 4.0.2
2026-03-10T06:05:26.1879073Z + tailwindcss 4.2.1
2026-03-10T06:05:26.1879352Z + ts-jest 29.4.6
2026-03-10T06:05:26.1879835Z + ts-node 10.9.2
2026-03-10T06:05:26.1880310Z + tsx 4.21.0
2026-03-10T06:05:26.1880794Z + typescript 5.9.3
2026-03-10T06:05:26.1881264Z + which 6.0.1
2026-03-10T06:05:26.1881714Z + yaml 2.8.2
2026-03-10T06:05:26.1881983Z 
2026-03-10T06:05:26.2272482Z Done in 16.2s using pnpm v10.32.0
2026-03-10T06:05:26.2861391Z ##[group]Run echo "🔍 Verificando variáveis de ambiente do Supabase..."
2026-03-10T06:05:26.2862311Z [36;1mecho "🔍 Verificando variáveis de ambiente do Supabase..."[0m
2026-03-10T06:05:26.2863135Z [36;1mif [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then[0m
2026-03-10T06:05:26.2864002Z [36;1m  echo "❌ ERRO: NEXT_PUBLIC_SUPABASE_URL não configurada em GitHub Secrets."[0m
2026-03-10T06:05:26.2864819Z [36;1m  exit 1[0m
2026-03-10T06:05:26.2865262Z [36;1mfi[0m
2026-03-10T06:05:26.2865767Z [36;1mif [ -z "$NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY" ]; then[0m
2026-03-10T06:05:26.2866810Z [36;1m  echo "❌ ERRO: nenhuma chave pública do Supabase foi resolvida (NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ou NEXT_PUBLIC_SUPABASE_ANON_KEY)."[0m
2026-03-10T06:05:26.2867530Z [36;1m  exit 1[0m
2026-03-10T06:05:26.2867793Z [36;1mfi[0m
2026-03-10T06:05:26.2868099Z [36;1mif [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then[0m
2026-03-10T06:05:26.2868673Z [36;1m  echo "❌ ERRO: SUPABASE_SERVICE_ROLE_KEY não configurada em GitHub Secrets."[0m
2026-03-10T06:05:26.2869144Z [36;1m  exit 1[0m
2026-03-10T06:05:26.2869397Z [36;1mfi[0m
2026-03-10T06:05:26.2869732Z [36;1mecho "✅ Variáveis do Supabase validadas com sucesso."[0m
2026-03-10T06:05:26.2925549Z shell: /usr/bin/bash -e ***0***
2026-03-10T06:05:26.2926091Z env:
2026-03-10T06:05:26.2926675Z   NODE_VERSION: 20
2026-03-10T06:05:26.2927158Z   PNPM_VERSION: 10.32.0
2026-03-10T06:05:26.2927885Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-10T06:05:26.2930285Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-10T06:05:26.2930808Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-10T06:05:26.2931366Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-10T06:05:26.2932908Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-10T06:05:26.2945199Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-10T06:05:26.2945876Z   FIREBASE_PROJECT_ID: ***
2026-03-10T06:05:26.2946594Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2026-03-10T06:05:26.2947001Z ##[endgroup]
2026-03-10T06:05:26.3347520Z 🔍 Verificando variáveis de ambiente do Supabase...
2026-03-10T06:05:26.3348558Z ✅ Variáveis do Supabase validadas com sucesso.
2026-03-10T06:05:26.3377085Z ##[group]Run pnpm run lint
2026-03-10T06:05:26.3377668Z [36;1mpnpm run lint[0m
2026-03-10T06:05:26.3431386Z shell: /usr/bin/bash -e ***0***
2026-03-10T06:05:26.3431729Z env:
2026-03-10T06:05:26.3431978Z   NODE_VERSION: 20
2026-03-10T06:05:26.3432338Z   PNPM_VERSION: 10.32.0
2026-03-10T06:05:26.3433074Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-10T06:05:26.3435718Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-10T06:05:26.3436593Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-10T06:05:26.3437166Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-10T06:05:26.3439125Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-10T06:05:26.3451547Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-10T06:05:26.3451958Z   FIREBASE_PROJECT_ID: ***
2026-03-10T06:05:26.3452325Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2026-03-10T06:05:26.3452699Z ##[endgroup]
2026-03-10T06:05:26.7336482Z 
2026-03-10T06:05:26.7337481Z > danilo-novais-portfolio@1.0.1 lint /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL
2026-03-10T06:05:26.7338558Z > eslint src test tailwind.config.ts
2026-03-10T06:05:26.7338930Z 
2026-03-10T06:05:30.3140091Z 
2026-03-10T06:05:30.3141568Z /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/src/components/layout/header/DesktopFluidHeader.tsx
2026-03-10T06:05:30.3180499Z ##[warning]  113:17  warning  Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element
2026-03-10T06:05:30.3193261Z 
2026-03-10T06:05:30.3194378Z /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/src/components/layout/header/mobile/MobileHeaderBar.tsx
2026-03-10T06:05:30.3199920Z ##[warning]  67:15  warning  Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element
2026-03-10T06:05:30.3203011Z 
2026-03-10T06:05:30.3203634Z ✖ 2 problems (0 errors, 2 warnings)
2026-03-10T06:05:30.3204047Z 
2026-03-10T06:05:30.3591178Z ##[group]Run pnpm run typecheck
2026-03-10T06:05:30.3591554Z [36;1mpnpm run typecheck[0m
2026-03-10T06:05:30.3640534Z shell: /usr/bin/bash -e ***0***
2026-03-10T06:05:30.3640880Z env:
2026-03-10T06:05:30.3641135Z   NODE_VERSION: 20
2026-03-10T06:05:30.3641413Z   PNPM_VERSION: 10.32.0
2026-03-10T06:05:30.3641867Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-10T06:05:30.3643302Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-10T06:05:30.3643817Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-10T06:05:30.3644370Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-10T06:05:30.3645907Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-10T06:05:30.3655699Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-10T06:05:30.3656090Z   FIREBASE_PROJECT_ID: ***
2026-03-10T06:05:30.3656560Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2026-03-10T06:05:30.3656937Z ##[endgroup]
2026-03-10T06:05:30.7309272Z 
2026-03-10T06:05:30.7310185Z > danilo-novais-portfolio@1.0.1 typecheck /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL
2026-03-10T06:05:30.7311108Z > NODE_OPTIONS='--max-old-space-size=8192' tsc --noEmit --strict --jsx react-jsx
2026-03-10T06:05:30.7311481Z 
2026-03-10T06:05:44.3154069Z ##[group]Run if grep -q '"link:' functions/package.json; then
2026-03-10T06:05:44.3154625Z [36;1mif grep -q '"link:' functions/package.json; then[0m
2026-03-10T06:05:44.3155138Z [36;1m  echo "⚠️  Detectado protocolo 'link:' em functions/package.json"[0m
2026-03-10T06:05:44.3155718Z [36;1m  sed -i 's/"link:src\//"file:..\/src\//g' functions/package.json[0m
2026-03-10T06:05:44.3156192Z [36;1m  echo "✅ Corrigido para 'file:../src/'"[0m
2026-03-10T06:05:44.3156788Z [36;1mfi[0m
2026-03-10T06:05:44.3207101Z shell: /usr/bin/bash -e ***0***
2026-03-10T06:05:44.3207441Z env:
2026-03-10T06:05:44.3207689Z   NODE_VERSION: 20
2026-03-10T06:05:44.3207971Z   PNPM_VERSION: 10.32.0
2026-03-10T06:05:44.3208405Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-10T06:05:44.3209826Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-10T06:05:44.3210339Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-10T06:05:44.3210871Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-10T06:05:44.3212428Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-10T06:05:44.3222233Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-10T06:05:44.3232546Z   FIREBASE_PROJECT_ID: ***
2026-03-10T06:05:44.3232950Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2026-03-10T06:05:44.3233342Z ##[endgroup]
2026-03-10T06:05:44.3342882Z ##[group]Run cd functions && pnpm run build
2026-03-10T06:05:44.3343293Z [36;1mcd functions && pnpm run build[0m
2026-03-10T06:05:44.3387516Z shell: /usr/bin/bash -e ***0***
2026-03-10T06:05:44.3387845Z env:
2026-03-10T06:05:44.3388096Z   NODE_VERSION: 20
2026-03-10T06:05:44.3388376Z   PNPM_VERSION: 10.32.0
2026-03-10T06:05:44.3388804Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-10T06:05:44.3390221Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-10T06:05:44.3390725Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-10T06:05:44.3391256Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-10T06:05:44.3392778Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-10T06:05:44.3402431Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-10T06:05:44.3402821Z   FIREBASE_PROJECT_ID: ***
2026-03-10T06:05:44.3403180Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2026-03-10T06:05:44.3403563Z ##[endgroup]
2026-03-10T06:05:44.7026872Z 
2026-03-10T06:05:44.7028062Z > functions@ build /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/functions
2026-03-10T06:05:44.7028727Z > tsc
2026-03-10T06:05:44.7028883Z 
2026-03-10T06:05:46.6804282Z ##[group]Run echo "NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL" > .env.production
2026-03-10T06:05:46.6805009Z [36;1mecho "NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL" > .env.production[0m
2026-03-10T06:05:46.6805671Z [36;1mecho "NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY" >> .env.production[0m
2026-03-10T06:05:46.6806933Z [36;1mecho "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=$NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY" >> .env.production[0m
2026-03-10T06:05:46.6807853Z [36;1mecho "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=$NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY" >> .env.production[0m
2026-03-10T06:05:46.6808641Z [36;1mecho "SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY" >> .env.production[0m
2026-03-10T06:05:46.6857933Z shell: /usr/bin/bash -e ***0***
2026-03-10T06:05:46.6858269Z env:
2026-03-10T06:05:46.6858524Z   NODE_VERSION: 20
2026-03-10T06:05:46.6858809Z   PNPM_VERSION: 10.32.0
2026-03-10T06:05:46.6859276Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-10T06:05:46.6860699Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-10T06:05:46.6861212Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-10T06:05:46.6861764Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-10T06:05:46.6863285Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-10T06:05:46.6872965Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-10T06:05:46.6873357Z   FIREBASE_PROJECT_ID: ***
2026-03-10T06:05:46.6873724Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2026-03-10T06:05:46.6874105Z ##[endgroup]
2026-03-10T06:05:46.6972342Z ##[group]Run pnpm run build
2026-03-10T06:05:46.6972694Z [36;1mpnpm run build[0m
2026-03-10T06:05:46.7016762Z shell: /usr/bin/bash -e ***0***
2026-03-10T06:05:46.7017118Z env:
2026-03-10T06:05:46.7017373Z   NODE_VERSION: 20
2026-03-10T06:05:46.7017657Z   PNPM_VERSION: 10.32.0
2026-03-10T06:05:46.7018090Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-10T06:05:46.7019533Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-10T06:05:46.7020043Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-10T06:05:46.7020576Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-10T06:05:46.7022094Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-10T06:05:46.7031792Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-10T06:05:46.7032187Z   FIREBASE_PROJECT_ID: ***
2026-03-10T06:05:46.7032551Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2026-03-10T06:05:46.7032932Z   NEXTJS_IGNORE_ESLINT: 1
2026-03-10T06:05:46.7033223Z ##[endgroup]
2026-03-10T06:05:47.0732162Z 
2026-03-10T06:05:47.0733419Z > danilo-novais-portfolio@1.0.1 prebuild /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL
2026-03-10T06:05:47.0734811Z > pnpm run validate-env && node scripts/generate-build-info.cjs
2026-03-10T06:05:47.0735743Z 
2026-03-10T06:05:47.4466185Z 
2026-03-10T06:05:47.4467345Z > danilo-novais-portfolio@1.0.1 validate-env /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL
2026-03-10T06:05:47.4468091Z > node scripts/validate-env.cjs
2026-03-10T06:05:47.4468313Z 
2026-03-10T06:05:47.4721808Z Aviso: Não foi possível ler .env.local. Verificando process.env... ENOENT: no such file or directory, open '/home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/.env.local'
2026-03-10T06:05:47.4727170Z CI/.env.local validado com sucesso (3 chaves).
2026-03-10T06:05:47.5051712Z 
2026-03-10T06:05:47.5052685Z > danilo-novais-portfolio@1.0.1 build /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL
2026-03-10T06:05:47.5053731Z > next build
2026-03-10T06:05:47.5054006Z 
2026-03-10T06:05:48.1287550Z ⚠ No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/docs/messages/no-cache
2026-03-10T06:05:48.1466793Z Attention: Next.js now collects completely anonymous telemetry regarding usage.
2026-03-10T06:05:48.1468153Z This information is used to shape Next.js' roadmap and prioritize features.
2026-03-10T06:05:48.1469854Z You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
2026-03-10T06:05:48.1471117Z https://nextjs.org/telemetry
2026-03-10T06:05:48.1471505Z 
2026-03-10T06:05:48.1653521Z ▲ Next.js 16.1.6 (Turbopack)
2026-03-10T06:05:48.1654499Z - Environments: .env.production
2026-03-10T06:05:48.1655250Z - Experiments (use with caution):
2026-03-10T06:05:48.1657200Z   · adapterPath: "/home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/scripts/firebase-next-adapter.cjs"
2026-03-10T06:05:48.1658550Z   · optimizePackageImports
2026-03-10T06:05:48.1659271Z   · serverActions
2026-03-10T06:05:48.1659600Z 
2026-03-10T06:05:48.2354815Z   Creating an optimized production build ...
2026-03-10T06:06:02.5947388Z ✓ Compiled successfully in 14.0s
2026-03-10T06:06:02.6007997Z   Skipping validation of types
2026-03-10T06:06:02.8103716Z   Collecting page data using 3 workers ...
2026-03-10T06:06:05.0152521Z   Generating static pages using 3 workers (0/35) ...
2026-03-10T06:06:05.0563391Z   Generating static pages using 3 workers (8/35) 
2026-03-10T06:06:05.2983664Z   Generating static pages using 3 workers (17/35) 
2026-03-10T06:06:06.2297407Z   Generating static pages using 3 workers (26/35) 
2026-03-10T06:06:06.4989316Z ✓ Generating static pages using 3 workers (35/35) in 1483.6ms
2026-03-10T06:06:06.5048298Z   Finalizing page optimization ...
2026-03-10T06:06:06.8354057Z 
2026-03-10T06:06:06.8377050Z Route (app)
2026-03-10T06:06:06.8377888Z ┌ ○ /
2026-03-10T06:06:06.8378466Z ├ ○ /_not-found
2026-03-10T06:06:06.8379044Z ├ ƒ /admin
2026-03-10T06:06:06.8379648Z ├ ƒ /admin/config
2026-03-10T06:06:06.8380628Z ├ ƒ /admin/copy-agent
2026-03-10T06:06:06.8381374Z ├ ƒ /admin/landing-pages
2026-03-10T06:06:06.8382101Z ├ ƒ /admin/landing-pages/[id]
2026-03-10T06:06:06.8382873Z ├ ƒ /admin/landing-pages/new
2026-03-10T06:06:06.8383547Z ├ ○ /admin/login
2026-03-10T06:06:06.8384131Z ├ ƒ /admin/midia
2026-03-10T06:06:06.8384743Z ├ ○ /admin/reset-password
2026-03-10T06:06:06.8385379Z ├ ƒ /admin/scene-generator
2026-03-10T06:06:06.8386001Z ├ ƒ /admin/settings
2026-03-10T06:06:06.8386800Z ├ ƒ /admin/tags
2026-03-10T06:06:06.8387385Z ├ ƒ /admin/trabalhos
2026-03-10T06:06:06.8388009Z ├ ƒ /admin/trabalhos/[id]
2026-03-10T06:06:06.8388667Z ├ ƒ /admin/trabalhos/new
2026-03-10T06:06:06.8389362Z ├ ƒ /api/admin/storage/upload
2026-03-10T06:06:06.8389954Z ├ ƒ /api/contact
2026-03-10T06:06:06.8390479Z ├ ƒ /api/report-error
2026-03-10T06:06:06.8391051Z ├ ƒ /api/site-assets
2026-03-10T06:06:06.8391624Z ├ ƒ /api/view-cv
2026-03-10T06:06:06.8392224Z ├ ƒ /auth/callback
2026-03-10T06:06:06.8392805Z ├ ○ /contato
2026-03-10T06:06:06.8393460Z ├ ○ /contato/opengraph-image
2026-03-10T06:06:06.8394141Z ├ ○ /opengraph-image
2026-03-10T06:06:06.8394746Z ├ ƒ /portfolio
2026-03-10T06:06:06.8395349Z ├ ƒ /portfolio/[slug]
2026-03-10T06:06:06.8396689Z ├ ○ /portfolio/opengraph-image
2026-03-10T06:06:06.8397504Z ├ ○ /privacidade
2026-03-10T06:06:06.8398133Z ├ ƒ /projects/[slug]
2026-03-10T06:06:06.8398731Z ├ ○ /robots.txt
2026-03-10T06:06:06.8399287Z ├ ○ /sitemap.xml
2026-03-10T06:06:06.8399817Z ├ ○ /sobre
2026-03-10T06:06:06.8400415Z └ ○ /sobre/opengraph-image
2026-03-10T06:06:06.8400773Z 
2026-03-10T06:06:06.8400783Z 
2026-03-10T06:06:06.8401106Z ƒ Proxy (Middleware)
2026-03-10T06:06:06.8401434Z 
2026-03-10T06:06:06.8401927Z ○  (Static)   prerendered as static content
2026-03-10T06:06:06.8402834Z ƒ  (Dynamic)  server-rendered on demand
2026-03-10T06:06:06.8403257Z 
2026-03-10T06:06:06.9363652Z ##[group]Run bash scripts/prepare-hosting.sh
2026-03-10T06:06:06.9364108Z [36;1mbash scripts/prepare-hosting.sh[0m
2026-03-10T06:06:06.9415220Z shell: /usr/bin/bash -e ***0***
2026-03-10T06:06:06.9415560Z env:
2026-03-10T06:06:06.9415815Z   NODE_VERSION: 20
2026-03-10T06:06:06.9416097Z   PNPM_VERSION: 10.32.0
2026-03-10T06:06:06.9416817Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-10T06:06:06.9418260Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-10T06:06:06.9418761Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-10T06:06:06.9419307Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-10T06:06:06.9420933Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-10T06:06:06.9430566Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-10T06:06:06.9430947Z   FIREBASE_PROJECT_ID: ***
2026-03-10T06:06:06.9431298Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2026-03-10T06:06:06.9431658Z ##[endgroup]
2026-03-10T06:06:06.9516204Z Consolidating static files into deploy-public...
2026-03-10T06:06:07.0011541Z deploy-public prepared.
2026-03-10T06:06:07.0061586Z ##[group]Run if [ -z "$FIREBASE_SERVICE_ACCOUNT_JSON" ]; then
2026-03-10T06:06:07.0062121Z [36;1mif [ -z "$FIREBASE_SERVICE_ACCOUNT_JSON" ]; then[0m
2026-03-10T06:06:07.0062603Z [36;1m  echo "❌ ERRO: nenhuma credencial Firebase foi resolvida."[0m
2026-03-10T06:06:07.0063417Z [36;1m  echo "Defina um destes secrets: FIREBASE_SERVICE_ACCOUNT_PORTFOLIO_DANILO_NOVAIS, FIREBASE_SERVICE_ACCOUNT_JSON ou FIREBASE_SERVICE_ACCOUNT."[0m
2026-03-10T06:06:07.0064127Z [36;1m  exit 1[0m
2026-03-10T06:06:07.0064381Z [36;1mfi[0m
2026-03-10T06:06:07.0113099Z shell: /usr/bin/bash -e ***0***
2026-03-10T06:06:07.0113432Z env:
2026-03-10T06:06:07.0113678Z   NODE_VERSION: 20
2026-03-10T06:06:07.0113971Z   PNPM_VERSION: 10.32.0
2026-03-10T06:06:07.0114409Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-10T06:06:07.0115819Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-10T06:06:07.0116314Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-10T06:06:07.0117009Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-10T06:06:07.0118534Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-10T06:06:07.0128066Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-10T06:06:07.0128452Z   FIREBASE_PROJECT_ID: ***
2026-03-10T06:06:07.0128809Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2026-03-10T06:06:07.0129178Z ##[endgroup]
2026-03-10T06:06:07.0278376Z ##[group]Run google-github-actions/auth@v2
2026-03-10T06:06:07.0278751Z with:
2026-03-10T06:06:07.0288464Z   credentials_json: ***
2026-03-10T06:06:07.0288780Z   create_credentials_file: true
2026-03-10T06:06:07.0289110Z   export_environment_variables: true
2026-03-10T06:06:07.0289444Z   universe: googleapis.com
2026-03-10T06:06:07.0289746Z   cleanup_credentials: true
2026-03-10T06:06:07.0290046Z   access_token_lifetime: 3600s
2026-03-10T06:06:07.0290472Z   access_token_scopes: https://www.googleapis.com/auth/cloud-platform
2026-03-10T06:06:07.0290920Z   id_token_include_email: false
2026-03-10T06:06:07.0291222Z env:
2026-03-10T06:06:07.0291466Z   NODE_VERSION: 20
2026-03-10T06:06:07.0291734Z   PNPM_VERSION: 10.32.0
2026-03-10T06:06:07.0292142Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-10T06:06:07.0293539Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-10T06:06:07.0294034Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-10T06:06:07.0294597Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-10T06:06:07.0296293Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-10T06:06:07.0305987Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-10T06:06:07.0306551Z   FIREBASE_PROJECT_ID: ***
2026-03-10T06:06:07.0306919Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2026-03-10T06:06:07.0307292Z ##[endgroup]
2026-03-10T06:06:07.1243640Z Created credentials file at "/home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/gha-creds-958d71467c1b9417.json"
2026-03-10T06:06:07.1394144Z ##[group]Run if [ -n "$SECRET_FB_PROJECT" ]; then
2026-03-10T06:06:07.1394617Z [36;1mif [ -n "$SECRET_FB_PROJECT" ]; then[0m
2026-03-10T06:06:07.1395004Z [36;1m  PROJECT_ID="$SECRET_FB_PROJECT"[0m
2026-03-10T06:06:07.1395449Z [36;1m  SOURCE="GitHub Secret FIREBASE_PROJECT/GOOGLE_CLOUD_PROJECT"[0m
2026-03-10T06:06:07.1395961Z [36;1melif [ -n "***" ]; then[0m
2026-03-10T06:06:07.1396615Z [36;1m  PROJECT_ID="***"[0m
2026-03-10T06:06:07.1396975Z [36;1m  SOURCE="Service Account project_id"[0m
2026-03-10T06:06:07.1397367Z [36;1melif [ -f .firebaserc ]; then[0m
2026-03-10T06:06:07.1398108Z [36;1m  PROJECT_ID=$(node -e "const fs=require('fs');const rc=JSON.parse(fs.readFileSync('.firebaserc','utf8'));process.stdout.write(rc?.projects?.default||'')")[0m
2026-03-10T06:06:07.1398859Z [36;1m  SOURCE=".firebaserc (projects.default)"[0m
2026-03-10T06:06:07.1399217Z [36;1mfi[0m
2026-03-10T06:06:07.1399477Z [36;1m[0m
2026-03-10T06:06:07.1399777Z [36;1mif [ -z "$PROJECT_ID" ]; then[0m
2026-03-10T06:06:07.1400252Z [36;1m  echo "❌ ERRO: Não foi possível resolver o Firebase Project ID."[0m
2026-03-10T06:06:07.1400915Z [36;1m  echo "Defina FIREBASE_PROJECT no GitHub Secrets ou configure .firebaserc/projects.default"[0m
2026-03-10T06:06:07.1401445Z [36;1m  exit 1[0m
2026-03-10T06:06:07.1401709Z [36;1mfi[0m
2026-03-10T06:06:07.1401956Z [36;1m[0m
2026-03-10T06:06:07.1402275Z [36;1mecho "project_id=$PROJECT_ID" >> "$GITHUB_OUTPUT"[0m
2026-03-10T06:06:07.1402753Z [36;1mecho "✅ Projeto Firebase resolvido: $PROJECT_ID ($SOURCE)"[0m
2026-03-10T06:06:07.1451751Z shell: /usr/bin/bash -e ***0***
2026-03-10T06:06:07.1452082Z env:
2026-03-10T06:06:07.1452332Z   NODE_VERSION: 20
2026-03-10T06:06:07.1452609Z   PNPM_VERSION: 10.32.0
2026-03-10T06:06:07.1453042Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-10T06:06:07.1454461Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-10T06:06:07.1454962Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-10T06:06:07.1455503Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-10T06:06:07.1457293Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-10T06:06:07.1466959Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-10T06:06:07.1467359Z   FIREBASE_PROJECT_ID: ***
2026-03-10T06:06:07.1467745Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2026-03-10T06:06:07.1468483Z   CLOUDSDK_AUTH_CREDENTIAL_FILE_OVERRIDE: /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/gha-creds-958d71467c1b9417.json
2026-03-10T06:06:07.1469473Z   GOOGLE_APPLICATION_CREDENTIALS: /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/gha-creds-958d71467c1b9417.json
2026-03-10T06:06:07.1470403Z   GOOGLE_GHA_CREDS_PATH: /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/gha-creds-958d71467c1b9417.json
2026-03-10T06:06:07.1471068Z   CLOUDSDK_CORE_PROJECT: ***
2026-03-10T06:06:07.1471401Z   CLOUDSDK_PROJECT: ***
2026-03-10T06:06:07.1471716Z   GCLOUD_PROJECT: ***
2026-03-10T06:06:07.1472022Z   GCP_PROJECT: ***
2026-03-10T06:06:07.1472336Z   GOOGLE_CLOUD_PROJECT: ***
2026-03-10T06:06:07.1472664Z   SECRET_FB_PROJECT: ***
2026-03-10T06:06:07.1472952Z ##[endgroup]
2026-03-10T06:06:07.1546984Z ✅ Projeto Firebase resolvido: *** (GitHub Secret FIREBASE_PROJECT/GOOGLE_CLOUD_PROJECT)
2026-03-10T06:06:07.1571497Z ##[group]Run npm install -g firebase-tools@latest
2026-03-10T06:06:07.1571967Z [36;1mnpm install -g firebase-tools@latest[0m
2026-03-10T06:06:07.1615478Z shell: /usr/bin/bash -e ***0***
2026-03-10T06:06:07.1615808Z env:
2026-03-10T06:06:07.1616092Z   NODE_VERSION: 20
2026-03-10T06:06:07.1616697Z   PNPM_VERSION: 10.32.0
2026-03-10T06:06:07.1617125Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-10T06:06:07.1618537Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-10T06:06:07.1619034Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-10T06:06:07.1619573Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-10T06:06:07.1621114Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-10T06:06:07.1630964Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-10T06:06:07.1631363Z   FIREBASE_PROJECT_ID: ***
2026-03-10T06:06:07.1631725Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2026-03-10T06:06:07.1632496Z   CLOUDSDK_AUTH_CREDENTIAL_FILE_OVERRIDE: /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/gha-creds-958d71467c1b9417.json
2026-03-10T06:06:07.1633493Z   GOOGLE_APPLICATION_CREDENTIALS: /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/gha-creds-958d71467c1b9417.json
2026-03-10T06:06:07.1634411Z   GOOGLE_GHA_CREDS_PATH: /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/gha-creds-958d71467c1b9417.json
2026-03-10T06:06:07.1635073Z   CLOUDSDK_CORE_PROJECT: ***
2026-03-10T06:06:07.1635415Z   CLOUDSDK_PROJECT: ***
2026-03-10T06:06:07.1635723Z   GCLOUD_PROJECT: ***
2026-03-10T06:06:07.1636028Z   GCP_PROJECT: ***
2026-03-10T06:06:07.1636562Z   GOOGLE_CLOUD_PROJECT: ***
2026-03-10T06:06:07.1636869Z ##[endgroup]
2026-03-10T06:06:20.8955306Z npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
2026-03-10T06:06:23.2190385Z npm warn deprecated json-ptr@3.1.1: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.
2026-03-10T06:06:23.2919973Z npm warn deprecated glob@10.5.0: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
2026-03-10T06:06:26.3065781Z 
2026-03-10T06:06:26.3066696Z added 746 packages in 19s
2026-03-10T06:06:26.3067249Z 
2026-03-10T06:06:26.3067613Z 93 packages are looking for funding
2026-03-10T06:06:26.3068373Z   run `npm fund` for details
2026-03-10T06:06:26.3462851Z ##[group]Run TARGET_PROJECT="***"
2026-03-10T06:06:26.3463332Z [36;1mTARGET_PROJECT="***"[0m
2026-03-10T06:06:26.3463815Z [36;1mfirebase projects:list --json 2>/dev/null > firebase-projects.json || true[0m
2026-03-10T06:06:26.3464311Z [36;1m[0m
2026-03-10T06:06:26.3464568Z [36;1mnode -e "[0m
2026-03-10T06:06:26.3464870Z [36;1m  const fs = require('fs');[0m
2026-03-10T06:06:26.3465305Z [36;1m  const raw = fs.readFileSync('firebase-projects.json', 'utf8');[0m
2026-03-10T06:06:26.3465741Z [36;1m  let data;[0m
2026-03-10T06:06:26.3466107Z [36;1m  try *** data = JSON.parse(raw); *** catch ***[0m
2026-03-10T06:06:26.3473318Z [36;1m    console.log('⚠️ Could not parse firebase projects JSON — skipping validation.');[0m
2026-03-10T06:06:26.3473847Z [36;1m    process.exit(0);[0m
2026-03-10T06:06:26.3474161Z [36;1m  ***[0m
2026-03-10T06:06:26.3474443Z [36;1m[0m
2026-03-10T06:06:26.3474885Z [36;1m  const projects = Array.isArray(data) ? data : (data.results || data.result || []);[0m
2026-03-10T06:06:26.3475530Z [36;1m  const ids = projects.map(p => p.projectId || p.projectid || p.id).filter(Boolean);[0m
2026-03-10T06:06:26.3476124Z [36;1m  console.log('📋 Projects accessible:', ids.join(', ') || '(none)');[0m
2026-03-10T06:06:26.3476694Z [36;1m[0m
2026-03-10T06:06:26.3477010Z [36;1m  if (ids.includes('$***TARGET_PROJECT***')) ***[0m
2026-03-10T06:06:26.3477519Z [36;1m    console.log('✅ Acesso ao projeto validado para $***TARGET_PROJECT***');[0m
2026-03-10T06:06:26.3477975Z [36;1m  *** else ***[0m
2026-03-10T06:06:26.3478510Z [36;1m    console.log('⚠️ Projeto $***TARGET_PROJECT*** não aparece na lista — tentando de qualquer forma.');[0m
2026-03-10T06:06:26.3479071Z [36;1m  ***[0m
2026-03-10T06:06:26.3479327Z [36;1m"[0m
2026-03-10T06:06:26.3529196Z shell: /usr/bin/bash -e ***0***
2026-03-10T06:06:26.3529534Z env:
2026-03-10T06:06:26.3530202Z   NODE_VERSION: 20
2026-03-10T06:06:26.3530483Z   PNPM_VERSION: 10.32.0
2026-03-10T06:06:26.3530931Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-10T06:06:26.3532362Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-10T06:06:26.3532874Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-10T06:06:26.3533402Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-10T06:06:26.3534933Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-10T06:06:26.3544576Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-10T06:06:26.3544958Z   FIREBASE_PROJECT_ID: ***
2026-03-10T06:06:26.3545318Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2026-03-10T06:06:26.3546039Z   CLOUDSDK_AUTH_CREDENTIAL_FILE_OVERRIDE: /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/gha-creds-958d71467c1b9417.json
2026-03-10T06:06:26.3547269Z   GOOGLE_APPLICATION_CREDENTIALS: /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/gha-creds-958d71467c1b9417.json
2026-03-10T06:06:26.3548190Z   GOOGLE_GHA_CREDS_PATH: /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/gha-creds-958d71467c1b9417.json
2026-03-10T06:06:26.3548858Z   CLOUDSDK_CORE_PROJECT: ***
2026-03-10T06:06:26.3549200Z   CLOUDSDK_PROJECT: ***
2026-03-10T06:06:26.3549513Z   GCLOUD_PROJECT: ***
2026-03-10T06:06:26.3549811Z   GCP_PROJECT: ***
2026-03-10T06:06:26.3550123Z   GOOGLE_CLOUD_PROJECT: ***
2026-03-10T06:06:26.3550414Z ##[endgroup]
2026-03-10T06:06:27.5002623Z 📋 Projects accessible: ***
2026-03-10T06:06:27.5007255Z ✅ Acesso ao projeto validado para ***
2026-03-10T06:06:27.5068444Z ##[group]Run TMP_PKG_JSON=$(mktemp)
2026-03-10T06:06:27.5068880Z [36;1mTMP_PKG_JSON=$(mktemp)[0m
2026-03-10T06:06:27.5069224Z [36;1mcp package.json "$TMP_PKG_JSON"[0m
2026-03-10T06:06:27.5069573Z [36;1mTMP_FUNC_PKG_JSON=$(mktemp)[0m
2026-03-10T06:06:27.5069961Z [36;1mcp functions/package.json "$TMP_FUNC_PKG_JSON"[0m
2026-03-10T06:06:27.5070333Z [36;1m[0m
2026-03-10T06:06:27.5070615Z [36;1mrestore_on_exit() ***[0m
2026-03-10T06:06:27.5070956Z [36;1m  mv "$TMP_PKG_JSON" package.json[0m
2026-03-10T06:06:27.5071371Z [36;1m  mv "$TMP_FUNC_PKG_JSON" functions/package.json[0m
2026-03-10T06:06:27.5071829Z [36;1m  rm -f package-lock.json functions/package-lock.json[0m
2026-03-10T06:06:27.5072226Z [36;1m***[0m
2026-03-10T06:06:27.5072474Z [36;1m[0m
2026-03-10T06:06:27.5072736Z [36;1mtrap restore_on_exit EXIT[0m
2026-03-10T06:06:27.5073046Z [36;1m[0m
2026-03-10T06:06:27.5073519Z [36;1mecho "📦 Gerando package-lock.json (root) para satisfazer builder do Firebase (npm ci)."[0m
2026-03-10T06:06:27.5074284Z [36;1mecho "   Forçando inclusão de dev/optional/peer para evitar lock incompleto em CI."[0m
2026-03-10T06:06:27.5074824Z [36;1mmv node_modules node_modules_bak || true[0m
2026-03-10T06:06:27.5075506Z [36;1mnpm install --package-lock-only --ignore-scripts --legacy-peer-deps --include=dev --include=optional --include=peer[0m
2026-03-10T06:06:27.5076160Z [36;1mmv node_modules_bak node_modules || true[0m
2026-03-10T06:06:27.5076762Z [36;1m[0m
2026-03-10T06:06:27.5077104Z [36;1mecho "📦 Gerando package-lock.json (functions)."[0m
2026-03-10T06:06:27.5077492Z [36;1mcd functions[0m
2026-03-10T06:06:27.5077807Z [36;1mmv node_modules node_modules_bak || true[0m
2026-03-10T06:06:27.5078442Z [36;1mnpm install --package-lock-only --ignore-scripts --legacy-peer-deps --include=dev --include=optional --include=peer[0m
2026-03-10T06:06:27.5079090Z [36;1mmv node_modules_bak node_modules || true[0m
2026-03-10T06:06:27.5079430Z [36;1mcd ..[0m
2026-03-10T06:06:27.5079694Z [36;1m[0m
2026-03-10T06:06:27.5080022Z [36;1mecho "🧹 Limpando cache do frameworks backend..."[0m
2026-03-10T06:06:27.5080499Z [36;1mrm -rf ".firebase/***/functions"[0m
2026-03-10T06:06:27.5080829Z [36;1m[0m
2026-03-10T06:06:27.5081119Z [36;1mfirebase experiments:enable webframeworks[0m
2026-03-10T06:06:27.5081542Z [36;1mfirebase deploy --only hosting,functions \[0m
2026-03-10T06:06:27.5082179Z [36;1m  --project "***" \[0m
2026-03-10T06:06:27.5082775Z [36;1m  --debug --non-interactive[0m
2026-03-10T06:06:27.5133267Z shell: /usr/bin/bash -e ***0***
2026-03-10T06:06:27.5133764Z env:
2026-03-10T06:06:27.5134321Z   NODE_VERSION: 20
2026-03-10T06:06:27.5134840Z   PNPM_VERSION: 10.32.0
2026-03-10T06:06:27.5135458Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-10T06:06:27.5137390Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-10T06:06:27.5138131Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-10T06:06:27.5138876Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-10T06:06:27.5140671Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-10T06:06:27.5151185Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-10T06:06:27.5151783Z   FIREBASE_PROJECT_ID: ***
2026-03-10T06:06:27.5152413Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2026-03-10T06:06:27.5153312Z   CLOUDSDK_AUTH_CREDENTIAL_FILE_OVERRIDE: /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/gha-creds-958d71467c1b9417.json
2026-03-10T06:06:27.5154560Z   GOOGLE_APPLICATION_CREDENTIALS: /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/gha-creds-958d71467c1b9417.json
2026-03-10T06:06:27.5155667Z   GOOGLE_GHA_CREDS_PATH: /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/gha-creds-958d71467c1b9417.json
2026-03-10T06:06:27.5156771Z   CLOUDSDK_CORE_PROJECT: ***
2026-03-10T06:06:27.5157354Z   CLOUDSDK_PROJECT: ***
2026-03-10T06:06:27.5157827Z   GCLOUD_PROJECT: ***
2026-03-10T06:06:27.5158408Z   GCP_PROJECT: ***
2026-03-10T06:06:27.5158940Z   GOOGLE_CLOUD_PROJECT: ***
2026-03-10T06:06:27.5159614Z   NO_UPDATE_NOTIFIER: 1
2026-03-10T06:06:27.5160203Z   NPM_CONFIG_LEGACY_PEER_DEPS: true
2026-03-10T06:06:27.5160737Z ##[endgroup]
2026-03-10T06:06:27.5290215Z 📦 Gerando package-lock.json (root) para satisfazer builder do Firebase (npm ci).
2026-03-10T06:06:27.5291863Z    Forçando inclusão de dev/optional/peer para evitar lock incompleto em CI.
2026-03-10T06:07:00.5068724Z 
2026-03-10T06:07:00.5070015Z up to date, audited 2124 packages in 33s
2026-03-10T06:07:00.5070918Z 
2026-03-10T06:07:00.5071833Z 446 packages are looking for funding
2026-03-10T06:07:00.5072964Z   run `npm fund` for details
2026-03-10T06:07:00.5251544Z 
2026-03-10T06:07:00.5252570Z 13 vulnerabilities (10 low, 2 high, 1 critical)
2026-03-10T06:07:00.5253184Z 
2026-03-10T06:07:00.5253940Z To address issues that do not require attention, run:
2026-03-10T06:07:00.5255020Z   npm audit fix
2026-03-10T06:07:00.5255414Z 
2026-03-10T06:07:00.5256262Z To address all issues (including breaking changes), run:
2026-03-10T06:07:00.5257612Z   npm audit fix --force
2026-03-10T06:07:00.5258267Z 
2026-03-10T06:07:00.5258726Z Run `npm audit` for details.
2026-03-10T06:07:00.5693122Z 📦 Gerando package-lock.json (functions).
2026-03-10T06:07:04.3954104Z 
2026-03-10T06:07:04.3955159Z up to date, audited 387 packages in 4s
2026-03-10T06:07:04.3955611Z 
2026-03-10T06:07:04.3956003Z 79 packages are looking for funding
2026-03-10T06:07:04.3957166Z   run `npm fund` for details
2026-03-10T06:07:04.4032619Z 
2026-03-10T06:07:04.4033290Z 8 low severity vulnerabilities
2026-03-10T06:07:04.4033692Z 
2026-03-10T06:07:04.4034033Z To address all issues (including breaking changes), run:
2026-03-10T06:07:04.4034719Z   npm audit fix --force
2026-03-10T06:07:04.4035058Z 
2026-03-10T06:07:04.4035331Z Run `npm audit` for details.
2026-03-10T06:07:04.4273420Z 🧹 Limpando cache do frameworks backend...
2026-03-10T06:07:05.0382421Z Enabled experiment [1mwebframeworks[22m
2026-03-10T06:07:06.3673417Z [2026-03-10T06:07:06.366Z] > command requires scopes: ["email","openid","https://www.googleapis.com/auth/cloudplatformprojects.readonly","https://www.googleapis.com/auth/firebase","https://www.googleapis.com/auth/cloud-platform"]
2026-03-10T06:07:06.4568965Z [2026-03-10T06:07:06.456Z] Running auto auth
2026-03-10T06:07:06.4576210Z [2026-03-10T06:07:06.457Z] [iam] checking project *** for permissions ["cloudfunctions.functions.create","cloudfunctions.functions.delete","cloudfunctions.functions.get","cloudfunctions.functions.list","cloudfunctions.functions.update","cloudfunctions.operations.get","firebase.projects.get","firebasehosting.sites.update"]
2026-03-10T06:07:06.4582752Z [2026-03-10T06:07:06.458Z] No OAuth tokens found
2026-03-10T06:07:06.4594807Z [2026-03-10T06:07:06.459Z] >>> [apiv2][query] POST https://cloudresourcemanager.googleapis.com/v1/projects/***:testIamPermissions [none]
2026-03-10T06:07:06.4598311Z [2026-03-10T06:07:06.459Z] >>> [apiv2][(partial)header] POST https://cloudresourcemanager.googleapis.com/v1/projects/***:testIamPermissions  x-goog-user-project=***
2026-03-10T06:07:06.4603563Z [2026-03-10T06:07:06.459Z] >>> [apiv2][body] POST https://cloudresourcemanager.googleapis.com/v1/projects/***:testIamPermissions ***"permissions":["cloudfunctions.functions.create","cloudfunctions.functions.delete","cloudfunctions.functions.get","cloudfunctions.functions.list","cloudfunctions.functions.update","cloudfunctions.operations.get","firebase.projects.get","firebasehosting.sites.update"]***
2026-03-10T06:07:06.5739689Z [2026-03-10T06:07:06.573Z] <<< [apiv2][status] POST https://cloudresourcemanager.googleapis.com/v1/projects/***:testIamPermissions 200
2026-03-10T06:07:06.5744434Z [2026-03-10T06:07:06.573Z] <<< [apiv2][body] POST https://cloudresourcemanager.googleapis.com/v1/projects/***:testIamPermissions ***"permissions":["cloudfunctions.functions.create","cloudfunctions.functions.delete","cloudfunctions.functions.get","cloudfunctions.functions.list","cloudfunctions.functions.update","cloudfunctions.operations.get","firebase.projects.get","firebasehosting.sites.update"]***
2026-03-10T06:07:06.5747969Z [2026-03-10T06:07:06.574Z] No OAuth tokens found
2026-03-10T06:07:06.5750136Z [2026-03-10T06:07:06.574Z] >>> [apiv2][query] POST https://iam.googleapis.com/v1/projects/***/serviceAccounts/***@appspot.gserviceaccount.com:testIamPermissions [none]
2026-03-10T06:07:06.5752792Z [2026-03-10T06:07:06.574Z] >>> [apiv2][body] POST https://iam.googleapis.com/v1/projects/***/serviceAccounts/***@appspot.gserviceaccount.com:testIamPermissions ***"permissions":["iam.serviceAccounts.actAs"]***
2026-03-10T06:07:06.7115297Z [2026-03-10T06:07:06.711Z] <<< [apiv2][status] POST https://iam.googleapis.com/v1/projects/***/serviceAccounts/***@appspot.gserviceaccount.com:testIamPermissions 200
2026-03-10T06:07:06.7117570Z [2026-03-10T06:07:06.711Z] <<< [apiv2][body] POST https://iam.googleapis.com/v1/projects/***/serviceAccounts/***@appspot.gserviceaccount.com:testIamPermissions ***"permissions":["iam.serviceAccounts.actAs"]***
2026-03-10T06:07:06.7120815Z [2026-03-10T06:07:06.711Z] No OAuth tokens found
2026-03-10T06:07:06.7124536Z [2026-03-10T06:07:06.712Z] >>> [apiv2][query] GET https://firebase.googleapis.com/v1beta1/projects/*** [none]
2026-03-10T06:07:06.9005623Z [2026-03-10T06:07:06.900Z] <<< [apiv2][status] GET https://firebase.googleapis.com/v1beta1/projects/*** 200
2026-03-10T06:07:06.9009946Z [2026-03-10T06:07:06.900Z] <<< [apiv2][body] GET https://firebase.googleapis.com/v1beta1/projects/*** ***"projectId":"***","projectNumber":"350817205989","displayName":"Portfolio Danilo Novais","name":"projects/***","resources":***"hostingSite":"***","realtimeDatabaseInstance":"***-default-rtdb"***,"state":"ACTIVE","etag":"1_bf95d783-2600-4e83-8996-b07fd41db756"***
2026-03-10T06:07:24.6760244Z [2026-03-10T06:07:24.675Z] No OAuth tokens found
2026-03-10T06:07:24.6764985Z [2026-03-10T06:07:24.676Z] >>> [apiv2][query] GET https://firebasehosting.googleapis.com/v1beta1/projects/***/sites pageToken=&pageSize=10
2026-03-10T06:07:25.4587668Z [2026-03-10T06:07:25.458Z] <<< [apiv2][status] GET https://firebasehosting.googleapis.com/v1beta1/projects/***/sites 200
2026-03-10T06:07:25.4589886Z [2026-03-10T06:07:25.458Z] <<< [apiv2][body] GET https://firebasehosting.googleapis.com/v1beta1/projects/***/sites ***"sites":[***"name":"projects/***/sites/***","defaultUrl":"https://***.web.app","appId":"1:350817205989:web:f7ae32f12d353ef081de0c","type":"DEFAULT_SITE"***]***
2026-03-10T06:07:25.4593794Z [2026-03-10T06:07:25.459Z] No OAuth tokens found
2026-03-10T06:07:25.4597413Z [2026-03-10T06:07:25.459Z] >>> [apiv2][query] GET https://firebase.googleapis.com/v1beta1/projects/-/webApps/1:350817205989:web:f7ae32f12d353ef081de0c/config [none]
2026-03-10T06:07:26.5933883Z [2026-03-10T06:07:26.592Z] <<< [apiv2][status] GET https://firebase.googleapis.com/v1beta1/projects/-/webApps/1:350817205989:web:f7ae32f12d353ef081de0c/config 200
2026-03-10T06:07:26.5940503Z [2026-03-10T06:07:26.593Z] <<< [apiv2][body] GET https://firebase.googleapis.com/v1beta1/projects/-/webApps/1:350817205989:web:f7ae32f12d353ef081de0c/config ***"projectId":"***","appId":"1:350817205989:web:f7ae32f12d353ef081de0c","databaseURL":"https://***-default-rtdb.firebaseio.com","storageBucket":"***.firebasestorage.app","apiKey":"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4","authDomain":"***.firebaseapp.com","messagingSenderId":"350817205989","measurementId":"G-PM34VYPZZW","projectNumber":"350817205989","version":"2"***
2026-03-10T06:08:00.0629388Z 
2026-03-10T06:08:00.0630200Z    Thank you for trying our early preview of Next.js support on Firebase Hosting.
2026-03-10T06:08:00.0631108Z    During the preview, support is best-effort and breaking changes can be expected. Proceed with caution.
2026-03-10T06:08:00.0631915Z    The integration is known to work with Next.js version 12 - 15.0. You may encounter errors.
2026-03-10T06:08:00.0632301Z 
2026-03-10T06:08:00.0632619Z    Documentation: https://firebase.google.com/docs/hosting/frameworks/nextjs
2026-03-10T06:08:00.0633309Z    File a bug: https://github.com/firebase/firebase-tools/issues/new?template=bug_report.md
2026-03-10T06:08:00.0634426Z    Submit a feature request: https://github.com/firebase/firebase-tools/issues/new?template=feature_request.md
2026-03-10T06:08:00.0634936Z 
2026-03-10T06:08:00.0635425Z    We'd love to learn from you. Express your interest in helping us shape the future of Firebase Hosting: https://goo.gle/41enW5X
2026-03-10T06:08:00.0635935Z 
2026-03-10T06:08:09.2132117Z [2026-03-10T06:08:09.212Z] No OAuth tokens found
2026-03-10T06:08:09.2134091Z [2026-03-10T06:08:09.212Z] >>> [apiv2][query] GET https://firebasehosting.googleapis.com/v1beta1/projects/***/sites/*** [none]
2026-03-10T06:08:09.6256962Z [2026-03-10T06:08:09.625Z] <<< [apiv2][status] GET https://firebasehosting.googleapis.com/v1beta1/projects/***/sites/*** 200
2026-03-10T06:08:09.6260882Z [2026-03-10T06:08:09.625Z] <<< [apiv2][body] GET https://firebasehosting.googleapis.com/v1beta1/projects/***/sites/*** ***"name":"projects/***/sites/***","defaultUrl":"https://***.web.app","appId":"1:350817205989:web:f7ae32f12d353ef081de0c","type":"DEFAULT_SITE"***
2026-03-10T06:08:10.3636074Z ▲ Next.js 16.1.6 (Turbopack)
2026-03-10T06:08:10.3636786Z 
2026-03-10T06:08:10.3637138Z - Environments: .env.production
2026-03-10T06:08:10.3637863Z - Experiments (use with caution):
2026-03-10T06:08:10.3639089Z   · adapterPath: "/home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/scripts/firebase-next-adapter.cjs"
2026-03-10T06:08:10.3640207Z   · optimizePackageImports
2026-03-10T06:08:10.3640797Z   · serverActions
2026-03-10T06:08:10.3641085Z 
2026-03-10T06:08:10.3641121Z 
2026-03-10T06:08:10.4449765Z   Creating an optimized production build ...
2026-03-10T06:08:10.4450335Z 
2026-03-10T06:08:15.4663587Z 
2026-03-10T06:08:15.4664434Z 
2026-03-10T06:08:15.4687020Z [503.56ms] [@tailwindcss/postcss] src/app/globals.css
2026-03-10T06:08:15.4688234Z [  0.10ms]   ↳ Quick bail check
2026-03-10T06:08:15.4688600Z 
2026-03-10T06:08:15.4730034Z [215.94ms]   ↳ Setup compiler
2026-03-10T06:08:15.4787471Z [  1.11ms]     ↳ PostCSS AST -> Tailwind CSS AST
2026-03-10T06:08:15.4788244Z [214.79ms]     ↳ Create compiler
2026-03-10T06:08:15.4788946Z [  0.19ms]   ↳ Register full rebuild paths
2026-03-10T06:08:15.4789572Z [  2.92ms]   ↳ Setup scanner
2026-03-10T06:08:15.4790173Z [ 34.14ms]   ↳ Scan for candidates
2026-03-10T06:08:15.4790866Z [  3.13ms]   ↳ Register dependency messages
2026-03-10T06:08:15.4791523Z [135.75ms]   ↳ Build utilities
2026-03-10T06:08:15.4795007Z [ 97.79ms]   ↳ Optimization
2026-03-10T06:08:15.4795318Z 
2026-03-10T06:08:15.4861395Z [  3.31ms]     ↳ AST -> CSS
2026-03-10T06:08:15.4863243Z 
2026-03-10T06:08:15.4863799Z [ 52.11ms]     ↳ Lightning CSS
2026-03-10T06:08:15.4864291Z 
2026-03-10T06:08:15.4877307Z [ 42.34ms]     ↳ CSS -> PostCSS AST
2026-03-10T06:08:15.4877783Z 
2026-03-10T06:08:15.4878289Z [ 13.02ms]   ↳ Update PostCSS AST
2026-03-10T06:08:15.4878792Z 
2026-03-10T06:08:15.4878802Z 
2026-03-10T06:08:15.4878817Z 
2026-03-10T06:08:15.4960882Z 
2026-03-10T06:08:15.4961265Z 
2026-03-10T06:08:15.4965020Z [0.11ms] [@tailwindcss/postcss] src/components/home/hero/HeroCopy.module.css
2026-03-10T06:08:15.4968116Z [0.10ms]   ↳ Quick bail check
2026-03-10T06:08:15.4968498Z 
2026-03-10T06:08:15.4968508Z 
2026-03-10T06:08:15.6482525Z 
2026-03-10T06:08:15.6482891Z 
2026-03-10T06:08:15.6484794Z [0.30ms] [@tailwindcss/postcss] src/components/layout/header/DesktopFluidHeader.module.css
2026-03-10T06:08:15.6486153Z [0.28ms]   ↳ Quick bail check
2026-03-10T06:08:15.6486824Z 
2026-03-10T06:08:15.6486834Z 
2026-03-10T06:08:24.4072418Z ✓ Compiled successfully in 13.6s
2026-03-10T06:08:24.4072991Z 
2026-03-10T06:08:24.4201962Z   Skipping validation of types
2026-03-10T06:08:24.4202373Z 
2026-03-10T06:08:24.7366131Z   Collecting page data using 3 workers ...
2026-03-10T06:08:24.7367042Z 
2026-03-10T06:08:26.0963790Z   Generating static pages using 3 workers (0/35) ...
2026-03-10T06:08:26.0964346Z 
2026-03-10T06:08:26.1609435Z   Generating static pages using 3 workers (8/35) 
2026-03-10T06:08:26.1610427Z 
2026-03-10T06:08:26.3310413Z   Generating static pages using 3 workers (17/35) 
2026-03-10T06:08:26.3311325Z 
2026-03-10T06:08:27.3658160Z   Generating static pages using 3 workers (26/35) 
2026-03-10T06:08:27.3658743Z 
2026-03-10T06:08:27.6002581Z ✓ Generating static pages using 3 workers (35/35) in 1503.9ms
2026-03-10T06:08:27.6003212Z 
2026-03-10T06:08:27.6060433Z   Finalizing page optimization ...
2026-03-10T06:08:27.6060886Z 
2026-03-10T06:08:27.9301279Z 
2026-03-10T06:08:27.9301343Z 
2026-03-10T06:08:27.9323809Z Route (app)
2026-03-10T06:08:27.9324748Z ┌ ○ /
2026-03-10T06:08:27.9325575Z ├ ○ /_not-found
2026-03-10T06:08:27.9326831Z ├ ƒ /admin
2026-03-10T06:08:27.9327434Z ├ ƒ /admin/config
2026-03-10T06:08:27.9327922Z ├ ƒ /admin/copy-agent
2026-03-10T06:08:27.9328429Z ├ ƒ /admin/landing-pages
2026-03-10T06:08:27.9337762Z ├ ƒ /admin/landing-pages/[id]
2026-03-10T06:08:27.9338588Z ├ ƒ /admin/landing-pages/new
2026-03-10T06:08:27.9340750Z ├ ○ /admin/login
2026-03-10T06:08:27.9341426Z ├ ƒ /admin/midia
2026-03-10T06:08:27.9342091Z ├ ○ /admin/reset-password
2026-03-10T06:08:27.9342786Z ├ ƒ /admin/scene-generator
2026-03-10T06:08:27.9343487Z ├ ƒ /admin/settings
2026-03-10T06:08:27.9344066Z ├ ƒ /admin/tags
2026-03-10T06:08:27.9344696Z ├ ƒ /admin/trabalhos
2026-03-10T06:08:27.9345380Z ├ ƒ /admin/trabalhos/[id]
2026-03-10T06:08:27.9346071Z ├ ƒ /admin/trabalhos/new
2026-03-10T06:08:27.9346982Z ├ ƒ /api/admin/storage/upload
2026-03-10T06:08:27.9347662Z ├ ƒ /api/contact
2026-03-10T06:08:27.9348287Z ├ ƒ /api/report-error
2026-03-10T06:08:27.9348930Z ├ ƒ /api/site-assets
2026-03-10T06:08:27.9349546Z ├ ƒ /api/view-cv
2026-03-10T06:08:27.9350198Z ├ ƒ /auth/callback
2026-03-10T06:08:27.9350757Z ├ ○ /contato
2026-03-10T06:08:27.9351376Z ├ ○ /contato/opengraph-image
2026-03-10T06:08:27.9352063Z ├ ○ /opengraph-image
2026-03-10T06:08:27.9352687Z ├ ƒ /portfolio
2026-03-10T06:08:27.9353288Z ├ ƒ /portfolio/[slug]
2026-03-10T06:08:27.9354006Z ├ ○ /portfolio/opengraph-image
2026-03-10T06:08:27.9354694Z ├ ○ /privacidade
2026-03-10T06:08:27.9355310Z ├ ƒ /projects/[slug]
2026-03-10T06:08:27.9355863Z ├ ○ /robots.txt
2026-03-10T06:08:27.9356714Z ├ ○ /sitemap.xml
2026-03-10T06:08:27.9357302Z ├ ○ /sobre
2026-03-10T06:08:27.9357924Z └ ○ /sobre/opengraph-image
2026-03-10T06:08:27.9358293Z 
2026-03-10T06:08:27.9358304Z 
2026-03-10T06:08:27.9358627Z ƒ Proxy (Middleware)
2026-03-10T06:08:27.9358948Z 
2026-03-10T06:08:27.9358955Z 
2026-03-10T06:08:27.9359488Z ○  (Static)   prerendered as static content
2026-03-10T06:08:27.9360669Z ƒ  (Dynamic)  server-rendered on demand
2026-03-10T06:08:27.9361064Z 
2026-03-10T06:08:27.9361070Z 
2026-03-10T06:08:27.9361343Z 
2026-03-10T06:08:41.4723521Z Building a Cloud Function to run this application. This is needed due to:
2026-03-10T06:08:41.4724849Z  • Image Optimization
2026-03-10T06:08:41.4725787Z  • non-static component /admin/(protected)/config/page
2026-03-10T06:08:41.4727168Z  • non-static component /admin/(protected)/copy-agent/page
2026-03-10T06:08:41.4728363Z  • non-static component /admin/(protected)/landing-pages/[id]/page
2026-03-10T06:08:41.4729446Z  • non-static component /admin/(protected)/landing-pages/new/page
2026-03-10T06:08:41.4730742Z [2026-03-10T06:08:41.472Z]  • non-static component /admin/(protected)/landing-pages/page
2026-03-10T06:08:41.4732086Z [2026-03-10T06:08:41.472Z]  • non-static component /admin/(protected)/midia/page
2026-03-10T06:08:41.4733291Z [2026-03-10T06:08:41.472Z]  • non-static component /admin/(protected)/page
2026-03-10T06:08:41.4734594Z [2026-03-10T06:08:41.472Z]  • non-static component /admin/(protected)/scene-generator/page
2026-03-10T06:08:41.4735927Z [2026-03-10T06:08:41.472Z]  • non-static component /admin/(protected)/settings/page
2026-03-10T06:08:41.4737371Z [2026-03-10T06:08:41.472Z]  • non-static component /admin/(protected)/tags/page
2026-03-10T06:08:41.4738695Z [2026-03-10T06:08:41.472Z]  • non-static component /admin/(protected)/trabalhos/[id]/page
2026-03-10T06:08:41.4740064Z [2026-03-10T06:08:41.473Z]  • non-static component /admin/(protected)/trabalhos/new/page
2026-03-10T06:08:41.4741677Z [2026-03-10T06:08:41.473Z]  • non-static component /admin/(protected)/trabalhos/page
2026-03-10T06:08:41.4742998Z [2026-03-10T06:08:41.473Z]  • non-static component /api/admin/storage/upload/route
2026-03-10T06:08:41.4744193Z [2026-03-10T06:08:41.473Z]  • non-static component /api/contact/route
2026-03-10T06:08:41.4745337Z [2026-03-10T06:08:41.473Z]  • non-static component /api/report-error/route
2026-03-10T06:08:41.4746710Z [2026-03-10T06:08:41.473Z]  • non-static component /api/site-assets/route
2026-03-10T06:08:41.4747624Z [2026-03-10T06:08:41.473Z]  • non-static component /api/view-cv/route
2026-03-10T06:08:41.4748539Z [2026-03-10T06:08:41.473Z]  • non-static component /auth/callback/route
2026-03-10T06:08:41.4749245Z [2026-03-10T06:08:41.473Z]  • non-static component /portfolio/[slug]/page
2026-03-10T06:08:41.4749909Z [2026-03-10T06:08:41.473Z]  • non-static component /portfolio/page
2026-03-10T06:08:41.4750957Z [2026-03-10T06:08:41.473Z]  • non-static component /projects/[slug]/page
2026-03-10T06:08:41.4751868Z [2026-03-10T06:08:41.473Z]  • route with server action /admin/config
2026-03-10T06:08:41.4752504Z [2026-03-10T06:08:41.473Z]  • route with server action /admin/copy-agent
2026-03-10T06:08:41.4753173Z [2026-03-10T06:08:41.473Z]  • route with server action /admin/landing-pages/[id]
2026-03-10T06:08:41.4753863Z [2026-03-10T06:08:41.473Z]  • route with server action /admin/landing-pages/new
2026-03-10T06:08:41.4754727Z [2026-03-10T06:08:41.473Z]  • route with server action /admin/landing-pages
2026-03-10T06:08:41.4756083Z [2026-03-10T06:08:41.474Z]  • route with server action /admin/midia
2026-03-10T06:08:41.4757313Z [2026-03-10T06:08:41.474Z]  • route with server action /admin
2026-03-10T06:08:41.4757988Z [2026-03-10T06:08:41.474Z]  • route with server action /admin/scene-generator
2026-03-10T06:08:41.4758983Z [2026-03-10T06:08:41.474Z]  • route with server action /admin/settings
2026-03-10T06:08:41.4759656Z [2026-03-10T06:08:41.474Z]  • route with server action /admin/tags
2026-03-10T06:08:41.4760316Z [2026-03-10T06:08:41.474Z]  • route with server action /admin/trabalhos/[id]
2026-03-10T06:08:41.4761550Z [2026-03-10T06:08:41.474Z]  • route with server action /admin/trabalhos/new
2026-03-10T06:08:41.4762764Z [2026-03-10T06:08:41.474Z]  • route with server action /admin/trabalhos
2026-03-10T06:08:41.4763357Z 
2026-03-10T06:09:01.4756536Z Warning: Global esbuild version (0.27.3) does not match the required version (^0.19.2).
2026-03-10T06:10:01.6231508Z [2026-03-10T06:10:01.622Z] No OAuth tokens found
2026-03-10T06:10:01.6233625Z [2026-03-10T06:10:01.623Z] >>> [apiv2][query] GET https://firebasehosting.googleapis.com/v1beta1/projects/***/sites/*** [none]
2026-03-10T06:10:02.1429545Z [2026-03-10T06:10:02.142Z] <<< [apiv2][status] GET https://firebasehosting.googleapis.com/v1beta1/projects/***/sites/*** 200
2026-03-10T06:10:02.1434107Z [2026-03-10T06:10:02.142Z] <<< [apiv2][body] GET https://firebasehosting.googleapis.com/v1beta1/projects/***/sites/*** ***"name":"projects/***/sites/***","defaultUrl":"https://***.web.app","appId":"1:350817205989:web:f7ae32f12d353ef081de0c","type":"DEFAULT_SITE"***
2026-03-10T06:10:07.8230165Z npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
2026-03-10T06:10:09.7070753Z npm warn deprecated glob@10.5.0: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
2026-03-10T06:10:24.4022456Z 
2026-03-10T06:10:24.4023115Z added 768 packages in 21s
2026-03-10T06:10:24.4023510Z 
2026-03-10T06:10:24.4023827Z 175 packages are looking for funding
2026-03-10T06:10:24.4024442Z   run `npm fund` for details
2026-03-10T06:10:24.4575260Z [2026-03-10T06:10:24.455Z] [web frameworks] effective firebase.json:  ***
2026-03-10T06:10:24.4580603Z   "hosting": [
2026-03-10T06:10:24.4581074Z     ***
2026-03-10T06:10:24.4581493Z       "source": ".",
2026-03-10T06:10:24.4581957Z       "ignore": [
2026-03-10T06:10:24.4582404Z         "firebase.json",
2026-03-10T06:10:24.4583189Z         "**/.*",
2026-03-10T06:10:24.4583661Z         "**/node_modules/**",
2026-03-10T06:10:24.4584144Z         ".env",
2026-03-10T06:10:24.4584566Z         ".env.local",
2026-03-10T06:10:24.4585023Z         ".env.development",
2026-03-10T06:10:24.4585498Z         "functions/**",
2026-03-10T06:10:24.4585952Z         "test/**",
2026-03-10T06:10:24.4586570Z         "docs/**",
2026-03-10T06:10:24.4587032Z         "scripts/**"
2026-03-10T06:10:24.4587499Z       ],
2026-03-10T06:10:24.4587981Z       "frameworksBackend": ***
2026-03-10T06:10:24.4588549Z         "region": "us-central1"
2026-03-10T06:10:24.4589053Z       ***,
2026-03-10T06:10:24.4589464Z       "headers": [
2026-03-10T06:10:24.4589900Z         ***
2026-03-10T06:10:24.4590309Z           "source": "**",
2026-03-10T06:10:24.4590777Z           "headers": [
2026-03-10T06:10:24.4591235Z             ***
2026-03-10T06:10:24.4591778Z               "key": "Strict-Transport-Security",
2026-03-10T06:10:24.4592548Z               "value": "max-age=31536000; includeSubDomains; preload"
2026-03-10T06:10:24.4593205Z             ***,
2026-03-10T06:10:24.4593617Z             ***
2026-03-10T06:10:24.4594093Z               "key": "X-Frame-Options",
2026-03-10T06:10:24.4594632Z               "value": "DENY"
2026-03-10T06:10:24.4595106Z             ***,
2026-03-10T06:10:24.4595525Z             ***
2026-03-10T06:10:24.4596039Z               "key": "X-Content-Type-Options",
2026-03-10T06:10:24.4596820Z               "value": "nosniff"
2026-03-10T06:10:24.4597331Z             ***,
2026-03-10T06:10:24.4597740Z             ***
2026-03-10T06:10:24.4598222Z               "key": "Referrer-Policy",
2026-03-10T06:10:24.4598881Z               "value": "strict-origin-when-cross-origin"
2026-03-10T06:10:24.4599471Z             ***
2026-03-10T06:10:24.4599874Z           ]
2026-03-10T06:10:24.4600269Z         ***,
2026-03-10T06:10:24.4600668Z         ***
2026-03-10T06:10:24.4601140Z           "source": "/_next/static/**",
2026-03-10T06:10:24.4601689Z           "headers": [
2026-03-10T06:10:24.4602136Z             ***
2026-03-10T06:10:24.4602619Z               "key": "Cache-Control",
2026-03-10T06:10:24.4603264Z               "value": "public, max-age=31536000, immutable"
2026-03-10T06:10:24.4603860Z             ***
2026-03-10T06:10:24.4604270Z           ]
2026-03-10T06:10:24.4604666Z         ***,
2026-03-10T06:10:24.4605063Z         ***
2026-03-10T06:10:24.4605647Z           "source": "**/*.@(glb|gltf|bin|hdr|exr|mp4|webm|mov|m3u8)",
2026-03-10T06:10:24.4606779Z           "headers": [
2026-03-10T06:10:24.4607240Z             ***
2026-03-10T06:10:24.4607727Z               "key": "Cache-Control",
2026-03-10T06:10:24.4608477Z               "value": "public, max-age=3600, stale-while-revalidate=86400"
2026-03-10T06:10:24.4609151Z             ***
2026-03-10T06:10:24.4609558Z           ]
2026-03-10T06:10:24.4609950Z         ***,
2026-03-10T06:10:24.4610360Z         ***
2026-03-10T06:10:24.4610820Z           "source": "**/*.@(glb|gltf|bin)",
2026-03-10T06:10:24.4611368Z           "headers": [
2026-03-10T06:10:24.4611819Z             ***
2026-03-10T06:10:24.4612298Z               "key": "Cache-Control",
2026-03-10T06:10:24.4612948Z               "value": "public, max-age=31536000, immutable"
2026-03-10T06:10:24.4616271Z             ***
2026-03-10T06:10:24.4616890Z           ]
2026-03-10T06:10:24.4617311Z         ***,
2026-03-10T06:10:24.4617722Z         ***
2026-03-10T06:10:24.4618162Z           "source": "/api/**",
2026-03-10T06:10:24.4618658Z           "headers": [
2026-03-10T06:10:24.4619113Z             ***
2026-03-10T06:10:24.4619608Z               "key": "Cache-Control",
2026-03-10T06:10:24.4620174Z               "value": "no-store"
2026-03-10T06:10:24.4620664Z             ***
2026-03-10T06:10:24.4621084Z           ]
2026-03-10T06:10:24.4621485Z         ***,
2026-03-10T06:10:24.4621883Z         ***
2026-03-10T06:10:24.4622324Z           "source": "/:path*",
2026-03-10T06:10:24.4622814Z           "headers": [
2026-03-10T06:10:24.4623251Z             ***
2026-03-10T06:10:24.4625234Z               "key": "Content-Security-Policy",
2026-03-10T06:10:24.4635714Z               "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' blob: https://www.youtube.com https://s.ytimg.com https://challenges.cloudflare.com https://turnstile.cloudflare.com; worker-src 'self' blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com https://assets.codepen.io umkmwbkwvulxtdodzmzf.supabase.co; img-src 'self' blob: data: umkmwbkwvulxtdodzmzf.supabase.co https://raw.githack.com https://dl.polyhaven.org https://www.gstatic.com https://raw.githubusercontent.com https://grainy-gradients.vercel.app https://img.youtube.com https://i.ytimg.com https://fonts.gstatic.com; object-src 'none'; base-uri 'self'; form-action 'self' https://formsubmit.co; frame-ancestors 'none'; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://challenges.cloudflare.com https://turnstile.cloudflare.com; connect-src 'self' umkmwbkwvulxtdodzmzf.supabase.co https://*.supabase.co wss://*.supabase.co https://*.firebaseio.com https://dl.polyhaven.org https://formsubmit.co https://raw.githack.com https://www.gstatic.com https://raw.githubusercontent.com https://fonts.googleapis.com https://fonts.gstatic.com https://challenges.cloudflare.com https://turnstile.cloudflare.com; media-src 'self' blob: data: umkmwbkwvulxtdodzmzf.supabase.co https://*.supabase.co https://raw.githack.com https://dl.polyhaven.org https://www.gstatic.com https://raw.githubusercontent.com"
2026-03-10T06:10:24.4645261Z             ***,
2026-03-10T06:10:24.4645698Z             ***
2026-03-10T06:10:24.4646218Z               "key": "X-Content-Type-Options",
2026-03-10T06:10:24.4652640Z               "value": "nosniff"
2026-03-10T06:10:24.4653182Z             ***,
2026-03-10T06:10:24.4653608Z             ***
2026-03-10T06:10:24.4654082Z               "key": "X-Frame-Options",
2026-03-10T06:10:24.4654626Z               "value": "DENY"
2026-03-10T06:10:24.4655113Z             ***,
2026-03-10T06:10:24.4655534Z             ***
2026-03-10T06:10:24.4656011Z               "key": "Referrer-Policy",
2026-03-10T06:10:24.4656895Z               "value": "strict-origin-when-cross-origin"
2026-03-10T06:10:24.4657524Z             ***,
2026-03-10T06:10:24.4657947Z             ***
2026-03-10T06:10:24.4658444Z               "key": "Permissions-Policy",
2026-03-10T06:10:24.4659220Z               "value": "camera=(), microphone=(), geolocation=(), payment=()"
2026-03-10T06:10:24.4660150Z             ***,
2026-03-10T06:10:24.4660575Z             ***
2026-03-10T06:10:24.4661093Z               "key": "Strict-Transport-Security",
2026-03-10T06:10:24.4661860Z               "value": "max-age=31536000; includeSubDomains; preload"
2026-03-10T06:10:24.4662489Z             ***,
2026-03-10T06:10:24.4662908Z             ***
2026-03-10T06:10:24.4663385Z               "key": "Cache-Control",
2026-03-10T06:10:24.4664178Z               "value": "public, max-age=0, s-maxage=900, stale-while-revalidate=3600"
2026-03-10T06:10:24.4664881Z             ***
2026-03-10T06:10:24.4665282Z           ]
2026-03-10T06:10:24.4665670Z         ***,
2026-03-10T06:10:24.4666073Z         ***
2026-03-10T06:10:24.4666753Z           "source": "/_next/static/:path*",
2026-03-10T06:10:24.4667320Z           "headers": [
2026-03-10T06:10:24.4667771Z             ***
2026-03-10T06:10:24.4668252Z               "key": "Cache-Control",
2026-03-10T06:10:24.4668911Z               "value": "public, max-age=31536000, immutable"
2026-03-10T06:10:24.4669501Z             ***
2026-03-10T06:10:24.4669907Z           ]
2026-03-10T06:10:24.4670298Z         ***,
2026-03-10T06:10:24.4670699Z         ***
2026-03-10T06:10:24.4671147Z           "source": "/fonts/:path*",
2026-03-10T06:10:24.4671673Z           "headers": [
2026-03-10T06:10:24.4672120Z             ***
2026-03-10T06:10:24.4672593Z               "key": "Cache-Control",
2026-03-10T06:10:24.4673243Z               "value": "public, max-age=31536000, immutable"
2026-03-10T06:10:24.4673990Z             ***
2026-03-10T06:10:24.4674403Z           ]
2026-03-10T06:10:24.4674791Z         ***,
2026-03-10T06:10:24.4675196Z         ***
2026-03-10T06:10:24.4675669Z           "source": "/captions/:path*",
2026-03-10T06:10:24.4676191Z           "headers": [
2026-03-10T06:10:24.4676831Z             ***
2026-03-10T06:10:24.4677307Z               "key": "Cache-Control",
2026-03-10T06:10:24.4678058Z               "value": "public, max-age=86400, stale-while-revalidate=604800"
2026-03-10T06:10:24.4678739Z             ***
2026-03-10T06:10:24.4679138Z           ]
2026-03-10T06:10:24.4679533Z         ***,
2026-03-10T06:10:24.4679933Z         ***
2026-03-10T06:10:24.4680392Z           "source": "/_global-error",
2026-03-10T06:10:24.4680915Z           "headers": [
2026-03-10T06:10:24.4681371Z             ***
2026-03-10T06:10:24.4681867Z               "key": "x-nextjs-stale-time",
2026-03-10T06:10:24.4682420Z               "value": "300"
2026-03-10T06:10:24.4682896Z             ***,
2026-03-10T06:10:24.4683312Z             ***
2026-03-10T06:10:24.4683800Z               "key": "x-nextjs-prerender",
2026-03-10T06:10:24.4684332Z               "value": "1"
2026-03-10T06:10:24.4684795Z             ***,
2026-03-10T06:10:24.4685203Z             ***
2026-03-10T06:10:24.4685681Z               "key": "x-next-cache-tags",
2026-03-10T06:10:24.4686828Z               "value": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error"
2026-03-10T06:10:24.4687715Z             ***
2026-03-10T06:10:24.4688139Z           ]
2026-03-10T06:10:24.4688539Z         ***,
2026-03-10T06:10:24.4688935Z         ***
2026-03-10T06:10:24.4689432Z           "source": "/contato/opengraph-image",
2026-03-10T06:10:24.4689995Z           "headers": [
2026-03-10T06:10:24.4690432Z             ***
2026-03-10T06:10:24.4690909Z               "key": "cache-control",
2026-03-10T06:10:24.4691572Z               "value": "public, max-age=0, must-revalidate"
2026-03-10T06:10:24.4692175Z             ***,
2026-03-10T06:10:24.4692589Z             ***
2026-03-10T06:10:24.4693060Z               "key": "content-type",
2026-03-10T06:10:24.4693615Z               "value": "image/png"
2026-03-10T06:10:24.4694116Z             ***,
2026-03-10T06:10:24.4694528Z             ***
2026-03-10T06:10:24.4695000Z               "key": "x-next-cache-tags",
2026-03-10T06:10:24.4696490Z               "value": "_N_T_/layout,_N_T_/contato/layout,_N_T_/contato/opengraph-image/layout,_N_T_/contato/opengraph-image/route,_N_T_/contato/opengraph-image"
2026-03-10T06:10:24.4697883Z             ***
2026-03-10T06:10:24.4698294Z           ]
2026-03-10T06:10:24.4698686Z         ***,
2026-03-10T06:10:24.4699083Z         ***
2026-03-10T06:10:24.4699541Z           "source": "/_not-found",
2026-03-10T06:10:24.4700067Z           "headers": [
2026-03-10T06:10:24.4700526Z             ***
2026-03-10T06:10:24.4700999Z               "key": "x-nextjs-stale-time",
2026-03-10T06:10:24.4701498Z               "value": "300"
2026-03-10T06:10:24.4701926Z             ***,
2026-03-10T06:10:24.4702320Z             ***
2026-03-10T06:10:24.4702799Z               "key": "x-nextjs-prerender",
2026-03-10T06:10:24.4703343Z               "value": "1"
2026-03-10T06:10:24.4703806Z             ***,
2026-03-10T06:10:24.4704217Z             ***
2026-03-10T06:10:24.4704687Z               "key": "x-next-cache-tags",
2026-03-10T06:10:24.4705554Z               "value": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found"
2026-03-10T06:10:24.4706508Z             ***
2026-03-10T06:10:24.4706945Z           ]
2026-03-10T06:10:24.4707344Z         ***,
2026-03-10T06:10:24.4707739Z         ***
2026-03-10T06:10:24.4708180Z           "source": "/contato",
2026-03-10T06:10:24.4708662Z           "headers": [
2026-03-10T06:10:24.4709106Z             ***
2026-03-10T06:10:24.4709585Z               "key": "x-nextjs-stale-time",
2026-03-10T06:10:24.4710127Z               "value": "300"
2026-03-10T06:10:24.4710592Z             ***,
2026-03-10T06:10:24.4711006Z             ***
2026-03-10T06:10:24.4711673Z               "key": "x-nextjs-prerender",
2026-03-10T06:10:24.4712379Z               "value": "1"
2026-03-10T06:10:24.4712891Z             ***,
2026-03-10T06:10:24.4713295Z             ***
2026-03-10T06:10:24.4713779Z               "key": "x-next-cache-tags",
2026-03-10T06:10:24.4714551Z               "value": "_N_T_/layout,_N_T_/contato/layout,_N_T_/contato/page,_N_T_/contato"
2026-03-10T06:10:24.4715236Z             ***
2026-03-10T06:10:24.4715617Z           ]
2026-03-10T06:10:24.4716066Z         ***,
2026-03-10T06:10:24.4716616Z         ***
2026-03-10T06:10:24.4717121Z           "source": "/portfolio/opengraph-image",
2026-03-10T06:10:24.4717681Z           "headers": [
2026-03-10T06:10:24.4718134Z             ***
2026-03-10T06:10:24.4718610Z               "key": "cache-control",
2026-03-10T06:10:24.4719280Z               "value": "public, max-age=0, must-revalidate"
2026-03-10T06:10:24.4719866Z             ***,
2026-03-10T06:10:24.4720281Z             ***
2026-03-10T06:10:24.4720744Z               "key": "content-type",
2026-03-10T06:10:24.4721312Z               "value": "image/png"
2026-03-10T06:10:24.4721845Z             ***,
2026-03-10T06:10:24.4722287Z             ***
2026-03-10T06:10:24.4722814Z               "key": "x-next-cache-tags",
2026-03-10T06:10:24.4724014Z               "value": "_N_T_/layout,_N_T_/portfolio/layout,_N_T_/portfolio/opengraph-image/layout,_N_T_/portfolio/opengraph-image/route,_N_T_/portfolio/opengraph-image"
2026-03-10T06:10:24.4724782Z             ***
2026-03-10T06:10:24.4725058Z           ]
2026-03-10T06:10:24.4725312Z         ***,
2026-03-10T06:10:24.4725565Z         ***
2026-03-10T06:10:24.4725983Z           "source": "/opengraph-image",
2026-03-10T06:10:24.4726734Z           "headers": [
2026-03-10T06:10:24.4727225Z             ***
2026-03-10T06:10:24.4727740Z               "key": "cache-control",
2026-03-10T06:10:24.4728446Z               "value": "public, max-age=0, must-revalidate"
2026-03-10T06:10:24.4729105Z             ***,
2026-03-10T06:10:24.4729559Z             ***
2026-03-10T06:10:24.4730076Z               "key": "content-type",
2026-03-10T06:10:24.4730682Z               "value": "image/png"
2026-03-10T06:10:24.4731224Z             ***,
2026-03-10T06:10:24.4731680Z             ***
2026-03-10T06:10:24.4732198Z               "key": "x-next-cache-tags",
2026-03-10T06:10:24.4733298Z               "value": "_N_T_/layout,_N_T_/opengraph-image/layout,_N_T_/opengraph-image/route,_N_T_/opengraph-image"
2026-03-10T06:10:24.4734280Z             ***
2026-03-10T06:10:24.4734937Z           ]
2026-03-10T06:10:24.4735376Z         ***,
2026-03-10T06:10:24.4735802Z         ***
2026-03-10T06:10:24.4736292Z           "source": "/robots.txt",
2026-03-10T06:10:24.4737040Z           "headers": [
2026-03-10T06:10:24.4737522Z             ***
2026-03-10T06:10:24.4738031Z               "key": "cache-control",
2026-03-10T06:10:24.4738735Z               "value": "public, max-age=0, must-revalidate"
2026-03-10T06:10:24.4739384Z             ***,
2026-03-10T06:10:24.4739829Z             ***
2026-03-10T06:10:24.4740341Z               "key": "content-type",
2026-03-10T06:10:24.4740947Z               "value": "text/plain"
2026-03-10T06:10:24.4741490Z             ***,
2026-03-10T06:10:24.4741929Z             ***
2026-03-10T06:10:24.4742445Z               "key": "x-next-cache-tags",
2026-03-10T06:10:24.4743406Z               "value": "_N_T_/layout,_N_T_/robots.txt/layout,_N_T_/robots.txt/route,_N_T_/robots.txt"
2026-03-10T06:10:24.4744295Z             ***
2026-03-10T06:10:24.4744565Z           ]
2026-03-10T06:10:24.4744823Z         ***,
2026-03-10T06:10:24.4745076Z         ***
2026-03-10T06:10:24.4745361Z           "source": "/privacidade",
2026-03-10T06:10:24.4745685Z           "headers": [
2026-03-10T06:10:24.4746015Z             ***
2026-03-10T06:10:24.4746789Z               "key": "x-nextjs-stale-time",
2026-03-10T06:10:24.4747494Z               "value": "300"
2026-03-10T06:10:24.4748041Z             ***,
2026-03-10T06:10:24.4748493Z             ***
2026-03-10T06:10:24.4749023Z               "key": "x-nextjs-prerender",
2026-03-10T06:10:24.4749792Z               "value": "1"
2026-03-10T06:10:24.4750305Z             ***,
2026-03-10T06:10:24.4750751Z             ***
2026-03-10T06:10:24.4751335Z               "key": "x-next-cache-tags",
2026-03-10T06:10:24.4752432Z               "value": "_N_T_/layout,_N_T_/privacidade/layout,_N_T_/privacidade/page,_N_T_/privacidade"
2026-03-10T06:10:24.4753330Z             ***
2026-03-10T06:10:24.4753764Z           ]
2026-03-10T06:10:24.4754184Z         ***,
2026-03-10T06:10:24.4754613Z         ***
2026-03-10T06:10:24.4755115Z           "source": "/sitemap.xml",
2026-03-10T06:10:24.4755671Z           "headers": [
2026-03-10T06:10:24.4756175Z             ***
2026-03-10T06:10:24.4756884Z               "key": "cache-control",
2026-03-10T06:10:24.4757629Z               "value": "public, max-age=0, must-revalidate"
2026-03-10T06:10:24.4758288Z             ***,
2026-03-10T06:10:24.4758741Z             ***
2026-03-10T06:10:24.4769819Z               "key": "content-type",
2026-03-10T06:10:24.4770553Z               "value": "application/xml"
2026-03-10T06:10:24.4771157Z             ***,
2026-03-10T06:10:24.4771611Z             ***
2026-03-10T06:10:24.4772139Z               "key": "x-next-cache-tags",
2026-03-10T06:10:24.4773148Z               "value": "_N_T_/layout,_N_T_/sitemap.xml/layout,_N_T_/sitemap.xml/route,_N_T_/sitemap.xml"
2026-03-10T06:10:24.4774052Z             ***
2026-03-10T06:10:24.4774507Z           ]
2026-03-10T06:10:24.4774942Z         ***,
2026-03-10T06:10:24.4775371Z         ***
2026-03-10T06:10:24.4775906Z           "source": "/sobre/opengraph-image",
2026-03-10T06:10:24.4776707Z           "headers": [
2026-03-10T06:10:24.4777215Z             ***
2026-03-10T06:10:24.4777725Z               "key": "cache-control",
2026-03-10T06:10:24.4778479Z               "value": "public, max-age=0, must-revalidate"
2026-03-10T06:10:24.4779111Z             ***,
2026-03-10T06:10:24.4779569Z             ***
2026-03-10T06:10:24.4780084Z               "key": "content-type",
2026-03-10T06:10:24.4780700Z               "value": "image/png"
2026-03-10T06:10:24.4781243Z             ***,
2026-03-10T06:10:24.4781689Z             ***
2026-03-10T06:10:24.4782150Z               "key": "x-next-cache-tags",
2026-03-10T06:10:24.4782958Z               "value": "_N_T_/layout,_N_T_/sobre/layout,_N_T_/sobre/opengraph-image/layout,_N_T_/sobre/opengraph-image/route,_N_T_/sobre/opengraph-image"
2026-03-10T06:10:24.4783638Z             ***
2026-03-10T06:10:24.4783906Z           ]
2026-03-10T06:10:24.4784165Z         ***,
2026-03-10T06:10:24.4784627Z         ***
2026-03-10T06:10:24.4784908Z           "source": "/sobre",
2026-03-10T06:10:24.4785229Z           "headers": [
2026-03-10T06:10:24.4785518Z             ***
2026-03-10T06:10:24.4785842Z               "key": "x-nextjs-stale-time",
2026-03-10T06:10:24.4786199Z               "value": "300"
2026-03-10T06:10:24.4786801Z             ***,
2026-03-10T06:10:24.4787089Z             ***
2026-03-10T06:10:24.4787418Z               "key": "x-nextjs-prerender",
2026-03-10T06:10:24.4787789Z               "value": "1"
2026-03-10T06:10:24.4788090Z             ***,
2026-03-10T06:10:24.4788355Z             ***
2026-03-10T06:10:24.4788664Z               "key": "x-next-cache-tags",
2026-03-10T06:10:24.4789166Z               "value": "_N_T_/layout,_N_T_/sobre/layout,_N_T_/sobre/page,_N_T_/sobre"
2026-03-10T06:10:24.4789649Z             ***
2026-03-10T06:10:24.4789914Z           ]
2026-03-10T06:10:24.4790165Z         ***,
2026-03-10T06:10:24.4790426Z         ***
2026-03-10T06:10:24.4790714Z           "source": "**/*.[jt]s",
2026-03-10T06:10:24.4791030Z           "headers": [
2026-03-10T06:10:24.4791311Z             ***
2026-03-10T06:10:24.4791611Z               "key": "Set-Cookie",
2026-03-10T06:10:24.4798867Z               "value": "__FIREBASE_DEFAULTS__=eyJjb25maWciOnsicHJvamVjdElkIjoicG9ydGZvbGlvLWRhbmlsby1ub3ZhaXMiLCJhcHBJZCI6IjE6MzUwODE3MjA1OTg5OndlYjpmN2FlMzJmMTJkMzUzZWYwODFkZTBjIiwiZGF0YWJhc2VVUkwiOiJodHRwczovL3Bv***LWRlZmF1bHQtcnRkYi5maXJlYmFzZWlvLmNvbSIsInN0b3JhZ2VCdWNrZXQiOiJwb3J0Zm9saW8tZGFuaWxvLW5vdmFpcy5maXJlYmFzZXN0b3JhZ2UuYXBwIiwiYXBpS2V5IjoiQUl6YVN5RFRkMWtDTlhtV1hGS3FyYkVqcnRDM3Q1NURmelNKWFU0IiwiYXV0aERvbWFpbiI6InBv***LmZpcmViYXNlYXBwLmNvbSIsIm1lc3NhZ2luZ1NlbmRlcklkIjoiMzUwODE3MjA1OTg5IiwibWVhc3VyZW1lbnRJZCI6IkctUE0zNFZZUFpaVyIsInByb2plY3ROdW1iZXIiOiIzNTA4MTcyMDU5ODkiLCJ2ZXJzaW9uIjoiMiJ9LCJfYXV0aFRva2VuU3luY1VSTCI6Ii9fX3Nlc3Npb24ifQ; SameSite=Strict; Expires=2028-02-02T16:50:24.454Z; Path=/;"
2026-03-10T06:10:24.4805428Z             ***
2026-03-10T06:10:24.4805825Z           ]
2026-03-10T06:10:24.4806260Z         ***
2026-03-10T06:10:24.4806799Z       ],
2026-03-10T06:10:24.4807273Z       "site": "***",
2026-03-10T06:10:24.4807753Z       "rewrites": [
2026-03-10T06:10:24.4808210Z         ***
2026-03-10T06:10:24.4808486Z           "source": "**",
2026-03-10T06:10:24.4808799Z           "function": ***
2026-03-10T06:10:24.4809180Z             "functionId": "ssrportfoliodanilonovai",
2026-03-10T06:10:24.4809595Z             "region": "us-central1",
2026-03-10T06:10:24.4810231Z             "pinTag": true
2026-03-10T06:10:24.4810724Z           ***
2026-03-10T06:10:24.4811144Z         ***
2026-03-10T06:10:24.4811550Z       ],
2026-03-10T06:10:24.4811970Z       "redirects": [
2026-03-10T06:10:24.4812411Z         ***
2026-03-10T06:10:24.4812905Z           "source": "/portfolio/key_vision",
2026-03-10T06:10:24.4813623Z           "destination": "/portfolio/key-vision",
2026-03-10T06:10:24.4814216Z           "type": 308
2026-03-10T06:10:24.4814668Z         ***,
2026-03-10T06:10:24.4815085Z         ***
2026-03-10T06:10:24.4815590Z           "source": "/portfolio/brand_video",
2026-03-10T06:10:24.4816494Z           "destination": "/portfolio/brand-video",
2026-03-10T06:10:24.4817106Z           "type": 308
2026-03-10T06:10:24.4817568Z         ***,
2026-03-10T06:10:24.4817984Z         ***
2026-03-10T06:10:24.4818473Z           "source": "/privacy-policy",
2026-03-10T06:10:24.4819098Z           "destination": "/privacidade",
2026-03-10T06:10:24.4819650Z           "type": 308
2026-03-10T06:10:24.4820103Z         ***
2026-03-10T06:10:24.4820507Z       ],
2026-03-10T06:10:24.4820926Z       "cleanUrls": true,
2026-03-10T06:10:24.4821428Z       "trailingSlash": false,
2026-03-10T06:10:24.4822129Z       "public": ".firebase/***/hosting",
2026-03-10T06:10:24.4822745Z       "webFramework": "next_ssr"
2026-03-10T06:10:24.4823252Z     ***
2026-03-10T06:10:24.4823640Z   ],
2026-03-10T06:10:24.4824037Z   "functions": [
2026-03-10T06:10:24.4824473Z     ***
2026-03-10T06:10:24.4824894Z       "source": "functions",
2026-03-10T06:10:24.4825627Z       "codebase": "default",
2026-03-10T06:10:24.4826120Z       "ignore": [
2026-03-10T06:10:24.4826727Z         "node_modules",
2026-03-10T06:10:24.4827195Z         ".git",
2026-03-10T06:10:24.4827655Z         "firebase-debug.log",
2026-03-10T06:10:24.4828220Z         "firebase-debug.*.log"
2026-03-10T06:10:24.4828717Z       ],
2026-03-10T06:10:24.4829134Z       "runtime": "nodejs20"
2026-03-10T06:10:24.4829607Z     ***,
2026-03-10T06:10:24.4830007Z     ***
2026-03-10T06:10:24.4830631Z       "source": ".firebase/***/functions",
2026-03-10T06:10:24.4831441Z       "codebase": "firebase-frameworks-***"
2026-03-10T06:10:24.4832049Z     ***
2026-03-10T06:10:24.4832475Z   ]
2026-03-10T06:10:24.4832907Z ***
2026-03-10T06:10:24.4833513Z [2026-03-10T06:10:24.457Z] No OAuth tokens found
2026-03-10T06:10:24.4835199Z [2026-03-10T06:10:24.457Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v1/projects/***/locations/-/functions [none]
2026-03-10T06:10:25.3158808Z [2026-03-10T06:10:25.315Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v1/projects/***/locations/-/functions 200
2026-03-10T06:10:25.3160269Z [2026-03-10T06:10:25.315Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v1/projects/***/locations/-/functions ***
2026-03-10T06:10:25.3163689Z [2026-03-10T06:10:25.316Z] No OAuth tokens found
2026-03-10T06:10:25.3170220Z [2026-03-10T06:10:25.316Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/-/functions filter=environment%3D%22GEN_2%22
2026-03-10T06:10:26.0384212Z [2026-03-10T06:10:26.038Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/-/functions 200
2026-03-10T06:10:26.0489497Z [2026-03-10T06:10:26.038Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/-/functions ***"functions":[***"name":"projects/***/locations/southamerica-east1/functions/annotate_gcs","description":"Vision API Image Annotate with GCS","buildConfig":***"build":"projects/350817205989/locations/southamerica-east1/builds/05265522-299e-4eaf-8df0-50fbe3e25625","runtime":"python310","entryPoint":"annotate_gcs","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-southamerica-east1","object":"annotate_gcs/function-source.zip","generation":"1749079648113526"***,"environmentVariables":***"BUILD_CONFIG_TEST":"build_test"***,"dockerRepository":"projects/***/locations/southamerica-east1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-southamerica-east1","object":"annotate_gcs/function-source.zip","generation":"1749079648113526"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/southamerica-east1/services/annotate-gcs","timeoutSeconds":120,"environmentVariables":***"ANNOTATIONS_BUCKET":"vision-annotations-350817205989","FEATURES":"FACE_DETECTION,PRODUCT_SEARCH,SAFE_SEARCH_DETECTION","INPUT_BUCKET":"vision-input-350817205989","LOG_LEVEL":"","LOG_EXECUTION_ID":"true"***,"maxInstanceCount":10,"ingressSettings":"ALLOW_INTERNAL_ONLY","uri":"https://annotate-gcs-qc26fkohcq-rj.a.run.app","serviceAccountEmail":"gcf-sa@***.iam.gserviceaccount.com","availableMemory":"256M","allTrafficOnLatestRevision":true,"revision":"annotate-gcs-00001-lah","maxInstanceRequestConcurrency":1,"availableCpu":"0.1666"***,"eventTrigger":***"trigger":"projects/***/locations/southamerica-east1/triggers/annotate-gcs-598050","triggerRegion":"southamerica-east1","eventType":"google.cloud.storage.object.v1.finalized","eventFilters":[***"attribute":"bucket","value":"vision-input-350817205989"***],"pubsubTopic":"projects/***/topics/eventarc-southamerica-east1-annotate-gcs-598050-778","serviceAccountEmail":"gcf-sa@***.iam.gserviceaccount.com","retryPolicy":"RETRY_POLICY_RETRY"***,"state":"ACTIVE","updateTime":"2026-02-15T13:01:23.157179306Z","labels":***"goog-solutions-console-solution-id":"aiml-image-processing-on-cloud-functions","goog-ccm":"true","goog-solutions-console-deployment-name":"aiml-image-processing-on-cloud-functions"***,"environment":"GEN_2","url":"https://southamerica-east1-***.cloudfunctions.net/annotate_gcs","satisfiesPzs":true,"createTime":"2025-06-04T23:27:28.541042455Z","satisfiesPzi":true***,***"name":"projects/***/locations/southamerica-east1/functions/knowledge-base-webhook","buildConfig":***"build":"projects/350817205989/locations/southamerica-east1/builds/aa75bb76-f163-4099-8520-5cb3a11d8bfb","runtime":"python312","entryPoint":"on_cloud_event","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-southamerica-east1","object":"knowledge-base-webhook/function-source.zip","generation":"1745479179400411"***,"dockerRepository":"projects/***/locations/southamerica-east1/repositories/knowledge-base-repo","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-southamerica-east1","object":"knowledge-base-webhook/function-source.zip","generation":"1745479179400411"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/southamerica-east1/services/knowledge-base-webhook","timeoutSeconds":300,"environmentVariables":***"DATABASE":"knowledge-base-database","DOCAI_LOCATION":"us","DOCAI_PROCESSOR":"projects/***/locations/us/processors/19044296709a82ba","INDEX_ID":"projects/***/locations/southamerica-east1/indexes/1677837151800131584","LOCATION":"southamerica-east1","LOG_EXECUTION_ID":"true","OUTPUT_BUCKET":"knowledge-base-bucket-***","PROJECT_ID":"***"***,"maxInstanceCount":20,"ingressSettings":"ALLOW_ALL","uri":"https://knowledge-base-webhook-qc26fkohcq-rj.a.run.app","serviceAccountEmail":"knowledge-base-webhook-sa@***.iam.gserviceaccount.com","availableMemory":"4G","allTrafficOnLatestRevision":true,"revision":"knowledge-base-webhook-00001-laq","maxInstanceRequestConcurrency":1,"availableCpu":"2"***,"state":"ACTIVE","updateTime":"2026-02-15T13:01:23.052209545Z","labels":***"goog-solutions-console-solution-id":"generative-ai-knowledge-base","goog-ccm":"true","goog-solutions-console-deployment-name":"generative-ai-knowledge-base"***,"environment":"GEN_2","url":"https://southamerica-east1-***.cloudfunctions.net/knowledge-base-webhook","satisfiesPzs":true,"createTime":"2025-04-24T07:19:39.844004529Z","satisfiesPzi":true***,***"name":"projects/***/locations/southamerica-east1/functions/function-1","buildConfig":***"build":"projects/350817205989/locations/southamerica-east1/builds/a243a8b1-69ad-4293-ac69-ead6cab9ec4e","runtime":"nodejs20","entryPoint":"helloGCS","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-southamerica-east1","object":"function-1/function-source.zip","generation":"1748470570876615"***,"dockerRepository":"projects/***/locations/southamerica-east1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-southamerica-east1","object":"function-1/function-source.zip","generation":"1748470570876615"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/southamerica-east1/services/function-1","timeoutSeconds":60,"environmentVariables":***"LOG_EXECUTION_ID":"true"***,"maxInstanceCount":100,"ingressSettings":"ALLOW_ALL","uri":"https://function-1-qc26fkohcq-rj.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"function-1-00001-kes","maxInstanceRequestConcurrency":1,"availableCpu":"167m"***,"eventTrigger":***"trigger":"projects/***/locations/southamerica-east1/triggers/function-1-805841","triggerRegion":"southamerica-east1","eventType":"google.cloud.storage.object.v1.metadataUpdated","eventFilters":[***"attribute":"bucket","value":"bucket-portfolio-danilo"***],"pubsubTopic":"projects/***/topics/eventarc-southamerica-east1-function-1-805841-242","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","retryPolicy":"RETRY_POLICY_DO_NOT_RETRY"***,"state":"ACTIVE","updateTime":"2026-02-15T13:01:23.191979762Z","labels":***"goog-managed-by":"storage","deployment-tool":"console-cloud"***,"environment":"GEN_2","url":"https://southamerica-east1-***.cloudfunctions.net/function-1","satisfiesPzs":true,"createTime":"2025-05-28T22:16:11.383618549Z","satisfiesPzi":true***,***"name":"projects/***/locations/southamerica-east1/functions/annotate-http","description":"Vision API Image Annotate via HTTP, external","buildConfig":***"build":"projects/350817205989/locations/southamerica-east1/builds/e39fa15f-e73c-4276-9683-1d08ac2384c7","runtime":"python311","entryPoint":"annotate_http","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-southamerica-east1","object":"annotate-http/function-source.zip","generation":"1749079648299518"***,"dockerRepository":"projects/***/locations/southamerica-east1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-southamerica-east1","object":"annotate-http/function-source.zip","generation":"1749079648299518"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/southamerica-east1/services/annotate-http","timeoutSeconds":120,"environmentVariables":***"ANNOTATIONS_BUCKET":"vision-annotations-350817205989","FEATURES":"FACE_DETECTION,PRODUCT_SEARCH,SAFE_SEARCH_DETECTION","INPUT_BUCKET":"vision-input-350817205989","LOG_LEVEL":"","LOG_EXECUTION_ID":"true"***,"maxInstanceCount":10,"ingressSettings":"ALLOW_ALL","uri":"https://annotate-http-qc26fkohcq-rj.a.run.app","serviceAccountEmail":"gcf-sa@***.iam.gserviceaccount.com","availableMemory":"256M","allTrafficOnLatestRevision":true,"revision":"annotate-http-00001-siq","maxInstanceRequestConcurrency":1,"availableCpu":"0.1666"***,"state":"ACTIVE","updateTime":"2026-02-15T13:01:23.206256333Z","labels":***"goog-ccm":"true","goog-solutions-console-deployment-name":"aiml-image-processing-on-cloud-functions","goog-solutions-console-solution-id":"aiml-image-processing-on-cloud-functions"***,"environment":"GEN_2","url":"https://southamerica-east1-***.cloudfunctions.net/annotate-http","satisfiesPzs":true,"createTime":"2025-06-04T23:27:28.687018198Z","satisfiesPzi":true***,***"name":"projects/***/locations/us-central1/functions/heartbeat","buildConfig":***"build":"projects/350817205989/locations/us-central1/builds/917141b3-b895-4905-b82d-0f028b196864","runtime":"nodejs20","entryPoint":"heartbeat","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1772954153655356"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1772954153655356"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/heartbeat","timeoutSeconds":60,"environmentVariables":***"FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/heartbeat","FUNCTION_TARGET":"heartbeat","LOG_EXECUTION_ID":"true"***,"maxInstanceCount":10,"ingressSettings":"ALLOW_ALL","uri":"https://heartbeat-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"heartbeat-00009-tot","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","updateTime":"2026-03-09T13:13:06.212859101Z","labels":***"firebase-functions-hash":"035a6a6a5f75f546793c3e6f801cf4871aaa61de","deployment-tool":"cli-firebase"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/heartbeat","createTime":"2026-02-24T01:36:04.099834050Z","satisfiesPzi":true***,***"name":"projects/***/locations/us-central1/functions/setWebhook","buildConfig":***"build":"projects/350817205989/locations/us-central1/builds/6b6c0c7e-3a04-4856-b6f4-2a81b39cf04e","runtime":"nodejs24","entryPoint":"setWebhook","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"setWebhook/function-source.zip","generation":"1770665898519818"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"setWebhook/function-source.zip","generation":"1770665898519818"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/setwebhook","timeoutSeconds":60,"environmentVariables":***"FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/setWebhook","FUNCTION_TARGET":"setWebhook","LOG_EXECUTION_ID":"true","FUNCTION_SIGNATURE_TYPE":"http"***,"maxInstanceCount":10,"ingressSettings":"ALLOW_ALL","uri":"https://setwebhook-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"secretEnvironmentVariables":[***"key":"TELEGRAM_BOT_TOKEN","projectId":"***","secret":"TELEGRAM_BOT_TOKEN","version":"1"***],"revision":"setwebhook-00004-puw","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","updateTime":"2026-02-15T13:01:22.649412416Z","labels":***"firebase-functions-codebase":"chatbot","firebase-functions-hash":"c81f6b3ccfe3ff1067b17b7f11bb96a6debe0f75","deployment-tool":"cli-firebase"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/setWebhook","createTime":"2026-02-06T04:17:28.641956946Z","satisfiesPzi":true***,***"name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"build":"projects/350817205989/locations/us-central1/builds/47038162-5d07-4152-9290-c6d2185c22b3","runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"maxInstanceCount":3,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","updateTime":"2026-03-09T13:37:31.812381966Z","labels":***"firebase-functions-hash":"f6d7feb52be0166f528bd258242878090f38bc91","deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","createTime":"2026-02-15T13:30:47.483217832Z","satisfiesPzi":true***,***"name":"projects/***/locations/us-central1/functions/telegramWebhook","buildConfig":***"build":"projects/350817205989/locations/us-central1/builds/6b6c0c7e-3a04-4856-b6f4-2a81b39cf04e","runtime":"nodejs24","entryPoint":"telegramWebhook","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"telegramWebhook/function-source.zip","generation":"1770665852757718"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"telegramWebhook/function-source.zip","generation":"1770665852757718"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/telegramwebhook","timeoutSeconds":60,"environmentVariables":***"FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/telegramWebhook","FUNCTION_TARGET":"telegramWebhook","LOG_EXECUTION_ID":"true"***,"maxInstanceCount":10,"ingressSettings":"ALLOW_ALL","uri":"https://telegramwebhook-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"secretEnvironmentVariables":[***"key":"TELEGRAM_BOT_TOKEN","projectId":"***","secret":"TELEGRAM_BOT_TOKEN","version":"1"***],"revision":"telegramwebhook-00004-xos","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","updateTime":"2026-02-15T13:01:22.738256405Z","labels":***"firebase-functions-hash":"c81f6b3ccfe3ff1067b17b7f11bb96a6debe0f75","deployment-tool":"cli-firebase","firebase-functions-codebase":"chatbot"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/telegramWebhook","createTime":"2026-02-06T04:16:22.008114279Z","satisfiesPzi":true***]***
2026-03-10T06:10:26.0552524Z [2026-03-10T06:10:26.039Z] Converting a function to an endpoint with an invalid memory option 244.140625
2026-03-10T06:10:26.0553391Z [2026-03-10T06:10:26.039Z] Converting a function to an endpoint with an invalid memory option 3814.697265625
2026-03-10T06:10:26.0554217Z [2026-03-10T06:10:26.039Z] Converting a function to an endpoint with an invalid memory option 244.140625
2026-03-10T06:10:26.0555229Z i  hosting: The following function(s) are pinned to site *** and will be deployed as well: ssrportfoliodanilonovai 
2026-03-10T06:10:26.0555857Z 
2026-03-10T06:10:26.0556088Z === Deploying to '***'...
2026-03-10T06:10:26.0556277Z 
2026-03-10T06:10:26.0556562Z i  deploying functions, hosting 
2026-03-10T06:10:26.0556981Z [2026-03-10T06:10:26.042Z] No OAuth tokens found
2026-03-10T06:10:26.0558019Z [2026-03-10T06:10:26.042Z] >>> [apiv2][query] GET https://serviceusage.googleapis.com/v1/projects/***/services/cloudresourcemanager.googleapis.com [none]
2026-03-10T06:10:26.0559632Z [2026-03-10T06:10:26.042Z] >>> [apiv2][(partial)header] GET https://serviceusage.googleapis.com/v1/projects/***/services/cloudresourcemanager.googleapis.com  x-goog-user-project=***
2026-03-10T06:10:26.4092595Z [2026-03-10T06:10:26.408Z] <<< [apiv2][status] GET https://serviceusage.googleapis.com/v1/projects/***/services/cloudresourcemanager.googleapis.com 200
2026-03-10T06:10:26.4094117Z [2026-03-10T06:10:26.409Z] <<< [apiv2][body] GET https://serviceusage.googleapis.com/v1/projects/***/services/cloudresourcemanager.googleapis.com [omitted]
2026-03-10T06:10:26.4198130Z [2026-03-10T06:10:26.419Z] No OAuth tokens found
2026-03-10T06:10:26.4201109Z [2026-03-10T06:10:26.419Z] >>> [apiv2][query] GET https://cloudresourcemanager.googleapis.com/v1/projects/*** [none]
2026-03-10T06:10:26.5316029Z [2026-03-10T06:10:26.531Z] <<< [apiv2][status] GET https://cloudresourcemanager.googleapis.com/v1/projects/*** 200
2026-03-10T06:10:26.5321342Z [2026-03-10T06:10:26.531Z] <<< [apiv2][body] GET https://cloudresourcemanager.googleapis.com/v1/projects/*** ***"projectNumber":"350817205989","projectId":"***","lifecycleState":"ACTIVE","name":"Portfolio Danilo Novais","labels":***"firebase":"enabled","firebase-core":"disabled","generative-language":"enabled"***,"createTime":"2025-04-23T19:44:33.277227Z","parent":***"type":"organization","id":"106397661751"***
2026-03-10T06:10:26.5324370Z i  functions: preparing codebase default for deployment 
2026-03-10T06:10:26.5325652Z i  functions: preparing codebase firebase-frameworks-*** for deployment 
2026-03-10T06:10:26.5326846Z i  functions: ensuring required API cloudfunctions.googleapis.com is enabled... 
2026-03-10T06:10:26.5329177Z [2026-03-10T06:10:26.532Z] No OAuth tokens found
2026-03-10T06:10:26.5331663Z [2026-03-10T06:10:26.533Z] No OAuth tokens found
2026-03-10T06:10:26.5333773Z i  functions: ensuring required API cloudbuild.googleapis.com is enabled... 
2026-03-10T06:10:26.5335607Z [2026-03-10T06:10:26.533Z] No OAuth tokens found
2026-03-10T06:10:26.5337676Z i  artifactregistry: ensuring required API artifactregistry.googleapis.com is enabled... 
2026-03-10T06:10:26.5339394Z [2026-03-10T06:10:26.533Z] No OAuth tokens found
2026-03-10T06:10:26.5342110Z [2026-03-10T06:10:26.533Z] >>> [apiv2][query] GET https://serviceusage.googleapis.com/v1/projects/***/services/cloudfunctions.googleapis.com [none]
2026-03-10T06:10:26.5344034Z [2026-03-10T06:10:26.534Z] >>> [apiv2][(partial)header] GET https://serviceusage.googleapis.com/v1/projects/***/services/cloudfunctions.googleapis.com  x-goog-user-project=***
2026-03-10T06:10:26.5348614Z [2026-03-10T06:10:26.534Z] >>> [apiv2][query] GET https://serviceusage.googleapis.com/v1/projects/***/services/runtimeconfig.googleapis.com [none]
2026-03-10T06:10:26.5350534Z [2026-03-10T06:10:26.534Z] >>> [apiv2][(partial)header] GET https://serviceusage.googleapis.com/v1/projects/***/services/runtimeconfig.googleapis.com  x-goog-user-project=***
2026-03-10T06:10:26.5365636Z [2026-03-10T06:10:26.536Z] >>> [apiv2][query] GET https://serviceusage.googleapis.com/v1/projects/***/services/cloudbuild.googleapis.com [none]
2026-03-10T06:10:26.5367787Z [2026-03-10T06:10:26.536Z] >>> [apiv2][(partial)header] GET https://serviceusage.googleapis.com/v1/projects/***/services/cloudbuild.googleapis.com  x-goog-user-project=***
2026-03-10T06:10:26.5382227Z [2026-03-10T06:10:26.537Z] >>> [apiv2][query] GET https://serviceusage.googleapis.com/v1/projects/***/services/artifactregistry.googleapis.com [none]
2026-03-10T06:10:26.5385044Z [2026-03-10T06:10:26.538Z] >>> [apiv2][(partial)header] GET https://serviceusage.googleapis.com/v1/projects/***/services/artifactregistry.googleapis.com  x-goog-user-project=***
2026-03-10T06:10:26.8728144Z [2026-03-10T06:10:26.872Z] <<< [apiv2][status] GET https://serviceusage.googleapis.com/v1/projects/***/services/cloudfunctions.googleapis.com 200
2026-03-10T06:10:26.8731212Z [2026-03-10T06:10:26.872Z] <<< [apiv2][body] GET https://serviceusage.googleapis.com/v1/projects/***/services/cloudfunctions.googleapis.com [omitted]
2026-03-10T06:10:26.8733166Z ✔  functions: required API cloudfunctions.googleapis.com is enabled 
2026-03-10T06:10:26.8771871Z [2026-03-10T06:10:26.876Z] <<< [apiv2][status] GET https://serviceusage.googleapis.com/v1/projects/***/services/artifactregistry.googleapis.com 200
2026-03-10T06:10:26.8774477Z [2026-03-10T06:10:26.876Z] <<< [apiv2][body] GET https://serviceusage.googleapis.com/v1/projects/***/services/artifactregistry.googleapis.com [omitted]
2026-03-10T06:10:26.8776634Z ✔  artifactregistry: required API artifactregistry.googleapis.com is enabled 
2026-03-10T06:10:26.8867307Z [2026-03-10T06:10:26.886Z] <<< [apiv2][status] GET https://serviceusage.googleapis.com/v1/projects/***/services/cloudbuild.googleapis.com 200
2026-03-10T06:10:26.8869618Z [2026-03-10T06:10:26.886Z] <<< [apiv2][body] GET https://serviceusage.googleapis.com/v1/projects/***/services/cloudbuild.googleapis.com [omitted]
2026-03-10T06:10:26.8871264Z ✔  functions: required API cloudbuild.googleapis.com is enabled 
2026-03-10T06:10:26.8993543Z [2026-03-10T06:10:26.899Z] <<< [apiv2][status] GET https://serviceusage.googleapis.com/v1/projects/***/services/runtimeconfig.googleapis.com 200
2026-03-10T06:10:26.8995943Z [2026-03-10T06:10:26.899Z] <<< [apiv2][body] GET https://serviceusage.googleapis.com/v1/projects/***/services/runtimeconfig.googleapis.com [omitted]
2026-03-10T06:10:26.9004950Z [2026-03-10T06:10:26.900Z] No OAuth tokens found
2026-03-10T06:10:26.9007252Z [2026-03-10T06:10:26.900Z] >>> [apiv2][query] GET https://firebase.googleapis.com/v1beta1/projects/***/adminSdkConfig [none]
2026-03-10T06:10:27.7994027Z [2026-03-10T06:10:27.798Z] <<< [apiv2][status] GET https://firebase.googleapis.com/v1beta1/projects/***/adminSdkConfig 200
2026-03-10T06:10:27.7996128Z [2026-03-10T06:10:27.799Z] <<< [apiv2][body] GET https://firebase.googleapis.com/v1beta1/projects/***/adminSdkConfig ***"projectId":"***","databaseURL":"https://***-default-rtdb.firebaseio.com","storageBucket":"***.firebasestorage.app"***
2026-03-10T06:10:27.7999316Z [2026-03-10T06:10:27.799Z] No OAuth tokens found
2026-03-10T06:10:27.8001323Z [2026-03-10T06:10:27.799Z] >>> [apiv2][query] GET https://runtimeconfig.googleapis.com/v1beta1/projects/***/configs [none]
2026-03-10T06:10:28.0323948Z [2026-03-10T06:10:28.032Z] <<< [apiv2][status] GET https://runtimeconfig.googleapis.com/v1beta1/projects/***/configs 200
2026-03-10T06:10:28.0326755Z [2026-03-10T06:10:28.032Z] <<< [apiv2][body] GET https://runtimeconfig.googleapis.com/v1beta1/projects/***/configs ***"configs":[***"name":"projects/***/configs/telegram"***]***
2026-03-10T06:10:28.0329067Z [2026-03-10T06:10:28.032Z] No OAuth tokens found
2026-03-10T06:10:28.0332865Z [2026-03-10T06:10:28.032Z] >>> [apiv2][query] GET https://runtimeconfig.googleapis.com/v1beta1/projects/***/configs/telegram/variables [none]
2026-03-10T06:10:28.1712426Z [2026-03-10T06:10:28.170Z] <<< [apiv2][status] GET https://runtimeconfig.googleapis.com/v1beta1/projects/***/configs/telegram/variables 200
2026-03-10T06:10:28.1715911Z [2026-03-10T06:10:28.170Z] <<< [apiv2][body] GET https://runtimeconfig.googleapis.com/v1beta1/projects/***/configs/telegram/variables ***"variables":[***"name":"projects/***/configs/telegram/variables/bot_token","updateTime":"2026-02-06T02:47:01.290552158Z"***]***
2026-03-10T06:10:28.1718301Z [2026-03-10T06:10:28.171Z] No OAuth tokens found
2026-03-10T06:10:28.1720122Z [2026-03-10T06:10:28.171Z] >>> [apiv2][query] GET https://runtimeconfig.googleapis.com/v1beta1/projects/***/configs/telegram/variables/bot_token [none]
2026-03-10T06:10:28.2860694Z [2026-03-10T06:10:28.285Z] <<< [apiv2][status] GET https://runtimeconfig.googleapis.com/v1beta1/projects/***/configs/telegram/variables/bot_token 200
2026-03-10T06:10:28.2864980Z [2026-03-10T06:10:28.285Z] <<< [apiv2][body] GET https://runtimeconfig.googleapis.com/v1beta1/projects/***/configs/telegram/variables/bot_token ***"name":"projects/***/configs/telegram/variables/bot_token","updateTime":"2026-02-06T02:47:01.290552158Z","text":"8464621503:AAEv4K10FW7iowQvV5ITXJM3-PTi320ULt0"***
2026-03-10T06:10:28.2875618Z [2026-03-10T06:10:28.287Z] Validating nodejs source
2026-03-10T06:10:28.2881179Z ⚠  functions: Runtime Node.js 20 will be deprecated on 2026-04-30 and will be decommissioned on 2026-10-30, after which you will not be able to deploy without upgrading. Consider upgrading now to avoid disruption. See https://cloud.google.com/functions/docs/runtime-support for full details on the lifecycle policy 
2026-03-10T06:10:28.6853054Z ⚠  functions: package.json indicates an outdated version of firebase-functions. Please upgrade using npm install --save firebase-functions@latest in your functions directory. 
2026-03-10T06:10:28.6858967Z [2026-03-10T06:10:28.685Z] > [functions] package.json contents: ***
2026-03-10T06:10:28.6859593Z   "name": "functions",
2026-03-10T06:10:28.6860017Z   "type": "module",
2026-03-10T06:10:28.6860485Z   "scripts": ***
2026-03-10T06:10:28.6860771Z     "lint": "eslint .",
2026-03-10T06:10:28.6861060Z     "build": "tsc",
2026-03-10T06:10:28.6861362Z     "build:watch": "tsc --watch",
2026-03-10T06:10:28.6862055Z     "serve": "pnpm run build && firebase emulators:start --only functions",
2026-03-10T06:10:28.6863021Z     "shell": "pnpm run build && firebase functions:shell",
2026-03-10T06:10:28.6863462Z     "start": "pnpm run shell",
2026-03-10T06:10:28.6863867Z     "deploy": "firebase deploy --only functions",
2026-03-10T06:10:28.6864274Z     "logs": "firebase functions:log"
2026-03-10T06:10:28.6864612Z   ***,
2026-03-10T06:10:28.6864874Z   "engines": ***
2026-03-10T06:10:28.6865142Z     "node": "20"
2026-03-10T06:10:28.6865397Z   ***,
2026-03-10T06:10:28.6865650Z   "main": "lib/index.js",
2026-03-10T06:10:28.6865964Z   "dependencies": ***
2026-03-10T06:10:28.6866857Z     "@dataconnect/admin-generated": "file:src/dataconnect-admin-generated",
2026-03-10T06:10:28.6867979Z     "firebase-admin": "^13.6.1",
2026-03-10T06:10:28.6868367Z     "firebase-functions": "^7.0.5"
2026-03-10T06:10:28.6868712Z   ***,
2026-03-10T06:10:28.6868980Z   "devDependencies": ***
2026-03-10T06:10:28.6869360Z     "@typescript-eslint/eslint-plugin": "^8.24.0",
2026-03-10T06:10:28.6869804Z     "@typescript-eslint/parser": "^8.24.0",
2026-03-10T06:10:28.6870156Z     "eslint": "^9.20.1",
2026-03-10T06:10:28.6870737Z     "firebase-functions-test": "^3.4.1",
2026-03-10T06:10:28.6871362Z     "typescript": "^5.7.3"
2026-03-10T06:10:28.6871873Z   ***,
2026-03-10T06:10:28.6872263Z   "private": true,
2026-03-10T06:10:28.6872584Z   "packageManager": "pnpm@10.30.3"
2026-03-10T06:10:28.6872909Z ***
2026-03-10T06:10:28.6873258Z [2026-03-10T06:10:28.685Z] Building nodejs source
2026-03-10T06:10:28.6873919Z i  functions: Loading and analyzing source code for codebase default to determine what to deploy 
2026-03-10T06:10:28.6874673Z [2026-03-10T06:10:28.686Z] Could not find functions.yaml. Must use http discovery
2026-03-10T06:10:28.6910084Z [2026-03-10T06:10:28.690Z] Found firebase-functions binary at '/home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/functions/node_modules/.bin/firebase-functions'
2026-03-10T06:10:28.8209575Z Serving at port 8664
2026-03-10T06:10:28.8211298Z 
2026-03-10T06:10:29.1562715Z [2026-03-10T06:10:29.155Z] Got response from /__/functions.yaml ***"endpoints":***"heartbeat":***"availableMemoryMb":256,"timeoutSeconds":null,"minInstances":null,"maxInstances":10,"ingressSettings":null,"concurrency":null,"serviceAccountEmail":null,"vpc":null,"platform":"gcfv2","region":["us-central1"],"labels":***,"httpsTrigger":***,"entryPoint":"heartbeat"***,"specVersion":"v1alpha1","requiredAPIs":[],"extensions":***
2026-03-10T06:10:33.1801316Z [2026-03-10T06:10:33.179Z] Validating nodejs source
2026-03-10T06:10:33.1805129Z ⚠  functions: Runtime Node.js 20 will be deprecated on 2026-04-30 and will be decommissioned on 2026-10-30, after which you will not be able to deploy without upgrading. Consider upgrading now to avoid disruption. See https://cloud.google.com/functions/docs/runtime-support for full details on the lifecycle policy 
2026-03-10T06:10:33.5276645Z [2026-03-10T06:10:33.527Z] > [functions] package.json contents: ***
2026-03-10T06:10:33.5277631Z   "name": "danilo-novais-portfolio",
2026-03-10T06:10:33.5278290Z   "private": true,
2026-03-10T06:10:33.5278788Z   "version": "1.0.1",
2026-03-10T06:10:33.5279301Z   "type": "module",
2026-03-10T06:10:33.5279779Z   "keywords": [
2026-03-10T06:10:33.5280243Z     "react",
2026-03-10T06:10:33.5281208Z     "three",
2026-03-10T06:10:33.5281670Z     "threejs",
2026-03-10T06:10:33.5282164Z     "react-three-fiber"
2026-03-10T06:10:33.5282664Z   ],
2026-03-10T06:10:33.5283130Z   "engines": ***
2026-03-10T06:10:33.5283639Z     "node": "20"
2026-03-10T06:10:33.5284164Z   ***,
2026-03-10T06:10:33.5284605Z   "pnpm": ***
2026-03-10T06:10:33.5285094Z     "overrides": ***
2026-03-10T06:10:33.5285673Z       "fast-xml-parser": ">=5.3.4"
2026-03-10T06:10:33.5286281Z     ***,
2026-03-10T06:10:33.5287213Z     "ignoredBuiltDependencies": [
2026-03-10T06:10:33.5287829Z       "@firebase/util",
2026-03-10T06:10:33.5288333Z       "esbuild",
2026-03-10T06:10:33.5288821Z       "msw",
2026-03-10T06:10:33.5289307Z       "protobufjs",
2026-03-10T06:10:33.5289787Z       "re2",
2026-03-10T06:10:33.5290657Z       "sharp",
2026-03-10T06:10:33.5291191Z       "sqlite3",
2026-03-10T06:10:33.5291703Z       "unrs-resolver"
2026-03-10T06:10:33.5292200Z     ]
2026-03-10T06:10:33.5292631Z   ***,
2026-03-10T06:10:33.5293078Z   "dependencies": ***
2026-03-10T06:10:33.5293927Z     "@dataconnect/admin-generated": "file:dataconnect-admin-generated-0.0.1.tgz",
2026-03-10T06:10:33.5295084Z     "@dataconnect/generated": "file:dataconnect-generated-1.0.0.tgz",
2026-03-10T06:10:33.5295995Z     "@genkit-ai/google-genai": "^1.29.0",
2026-03-10T06:10:33.5297067Z     "@google/adk": "^0.5.0",
2026-03-10T06:10:33.5297618Z     "@gsap/react": "^2.1.2",
2026-03-10T06:10:33.5298152Z     "@hookform/resolvers": "^5.2.2",
2026-03-10T06:10:33.5298752Z     "@modelcontextprotocol/sdk": "^1.27.1",
2026-03-10T06:10:33.5299366Z     "@radix-ui/react-alert-dialog": "^1.1.15",
2026-03-10T06:10:33.5299935Z     "@radix-ui/react-avatar": "^1.1.11",
2026-03-10T06:10:33.5300491Z     "@radix-ui/react-checkbox": "^1.3.3",
2026-03-10T06:10:33.5301096Z     "@radix-ui/react-collapsible": "^1.1.12",
2026-03-10T06:10:33.5301726Z     "@radix-ui/react-dialog": "^1.1.15",
2026-03-10T06:10:33.5302367Z     "@radix-ui/react-dropdown-menu": "^2.1.16",
2026-03-10T06:10:33.5303011Z     "@radix-ui/react-label": "^2.1.8",
2026-03-10T06:10:33.5303613Z     "@radix-ui/react-menubar": "^1.1.16",
2026-03-10T06:10:33.5304225Z     "@radix-ui/react-popover": "^1.1.15",
2026-03-10T06:10:33.5304827Z     "@radix-ui/react-radio-group": "^1.3.8",
2026-03-10T06:10:33.5305417Z     "@radix-ui/react-separator": "^1.1.8",
2026-03-10T06:10:33.5306007Z     "@radix-ui/react-slider": "^1.3.6",
2026-03-10T06:10:33.5307990Z     "@radix-ui/react-slot": "^1.2.4",
2026-03-10T06:10:33.5308556Z     "@radix-ui/react-switch": "^1.2.6",
2026-03-10T06:10:33.5309149Z     "@radix-ui/react-tabs": "^1.1.13",
2026-03-10T06:10:33.5309746Z     "@radix-ui/react-toast": "^1.2.15",
2026-03-10T06:10:33.5310404Z     "@radix-ui/react-tooltip": "^1.2.8",
2026-03-10T06:10:33.5311276Z     "@react-three/drei": "^10.7.7",
2026-03-10T06:10:33.5311850Z     "@react-three/fiber": "^9.5.0",
2026-03-10T06:10:33.5312247Z     "@react-three/postprocessing": "^3.0.4",
2026-03-10T06:10:33.5312612Z     "@supabase/ssr": "0.9.0",
2026-03-10T06:10:33.5312955Z     "@supabase/supabase-js": "^2.99.0",
2026-03-10T06:10:33.5313332Z     "class-variance-authority": "^0.7.1",
2026-03-10T06:10:33.5313670Z     "clsx": "^2.1.1",
2026-03-10T06:10:33.5313989Z     "embla-carousel-react": "^8.6.0",
2026-03-10T06:10:33.5314319Z     "firebase": "^12.10.0",
2026-03-10T06:10:33.5314852Z     "firebase-admin": "^13.7.0",
2026-03-10T06:10:33.5315195Z     "firebase-functions": "^7.1.1",
2026-03-10T06:10:33.5315536Z     "framer-motion": "^12.35.2",
2026-03-10T06:10:33.5315842Z     "gsap": "^3.14.2",
2026-03-10T06:10:33.5316123Z     "husky": "^9.1.7",
2026-03-10T06:10:33.5316634Z     "lenis": "^1.3.18",
2026-03-10T06:10:33.5316958Z     "lightningcss": "1.32.0",
2026-03-10T06:10:33.5317269Z     "lint-staged": "^16.3.3",
2026-03-10T06:10:33.5317593Z     "lucide-react": "^0.577.0",
2026-03-10T06:10:33.5317895Z     "maath": "^0.10.8",
2026-03-10T06:10:33.5318173Z     "motion": "^12.35.2",
2026-03-10T06:10:33.5318457Z     "next": "16.1.6",
2026-03-10T06:10:33.5318725Z     "ogl": "^1.0.11",
2026-03-10T06:10:33.5318997Z     "openai": "^6.27.0",
2026-03-10T06:10:33.5319313Z     "postprocessing": "^6.38.3",
2026-03-10T06:10:33.5319635Z     "react": "^19.2.4",
2026-03-10T06:10:33.5320229Z     "react-day-picker": "^9.14.0",
2026-03-10T06:10:33.5320797Z     "react-dom": "^19.2.4",
2026-03-10T06:10:33.5321365Z     "react-hook-form": "^7.71.2",
2026-03-10T06:10:33.5321954Z     "react-markdown": "^10.1.0",
2026-03-10T06:10:33.5322521Z     "server-only": "^0.0.1",
2026-03-10T06:10:33.5323073Z     "sharp": "^0.32 || ^0.33",
2026-03-10T06:10:33.5323641Z     "tailwind-merge": "^3.5.0",
2026-03-10T06:10:33.5324253Z     "tailwindcss-animate": "^1.0.7",
2026-03-10T06:10:33.5324832Z     "three": "^0.183.2",
2026-03-10T06:10:33.5325382Z     "three-stdlib": "^2.36.1",
2026-03-10T06:10:33.5326150Z     "uuid": "^13.0.0",
2026-03-10T06:10:33.5326894Z     "zod": "^4.3.6",
2026-03-10T06:10:33.5327401Z     "zustand": "^5.0.11",
2026-03-10T06:10:33.5327978Z     "firebase-frameworks": "^0.11.0"
2026-03-10T06:10:33.5328535Z   ***,
2026-03-10T06:10:33.5328957Z   "overrides": ***
2026-03-10T06:10:33.5329494Z     "esbuild": "0.27.3",
2026-03-10T06:10:33.5329998Z     "test-exclude": "7.0.1",
2026-03-10T06:10:33.5330539Z     "tar": "7.5.7",
2026-03-10T06:10:33.5331040Z     "hono": "4.11.7",
2026-03-10T06:10:33.5331596Z     "fast-xml-parser": "5.3.4",
2026-03-10T06:10:33.5332160Z     "cookie": "0.7.0",
2026-03-10T06:10:33.5332742Z     "@react-three/drei": ***
2026-03-10T06:10:33.5333313Z       "react": "$react",
2026-03-10T06:10:33.5333909Z       "react-dom": "$react-dom"
2026-03-10T06:10:33.5334507Z     ***,
2026-03-10T06:10:33.5335088Z     "@react-three/postprocessing": ***
2026-03-10T06:10:33.5335719Z       "react": "$react",
2026-03-10T06:10:33.5336539Z       "react-dom": "$react-dom"
2026-03-10T06:10:33.5337161Z     ***
2026-03-10T06:10:33.5337648Z   ***,
2026-03-10T06:10:33.5338184Z   "packageManager": "pnpm@10.32.0",
2026-03-10T06:10:33.5338812Z   "main": "server.js"
2026-03-10T06:10:33.5339358Z ***
2026-03-10T06:10:33.5340005Z [2026-03-10T06:10:33.527Z] Building nodejs source
2026-03-10T06:10:33.5341659Z i  functions: Loading and analyzing source code for codebase firebase-frameworks-*** to determine what to deploy 
2026-03-10T06:10:33.5343153Z [2026-03-10T06:10:33.528Z] Could not find functions.yaml. Must use http discovery
2026-03-10T06:10:33.5345547Z [2026-03-10T06:10:33.529Z] Found firebase-functions binary at '/home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/.firebase/***/functions/node_modules/.bin/firebase-functions'
2026-03-10T06:10:33.6569896Z Serving at port 8551
2026-03-10T06:10:33.6570273Z 
2026-03-10T06:10:33.8037526Z [2026-03-10T06:10:33.802Z] Got response from /__/functions.yaml ***"endpoints":***"ssrportfoliodanilonovai":***"availableMemoryMb":null,"timeoutSeconds":null,"minInstances":null,"maxInstances":null,"ingressSettings":null,"concurrency":null,"serviceAccountEmail":null,"vpc":null,"platform":"gcfv2","region":["us-central1"],"labels":***,"httpsTrigger":***,"entryPoint":"ssrportfoliodanilonovai"***,"specVersion":"v1alpha1","requiredAPIs":[],"extensions":***
2026-03-10T06:10:37.8154168Z i  extensions: ensuring required API firebaseextensions.googleapis.com is enabled... 
2026-03-10T06:10:37.8156999Z [2026-03-10T06:10:37.815Z] No OAuth tokens found
2026-03-10T06:10:37.8160401Z [2026-03-10T06:10:37.815Z] >>> [apiv2][query] GET https://serviceusage.googleapis.com/v1/projects/***/services/firebaseextensions.googleapis.com [none]
2026-03-10T06:10:37.8163322Z [2026-03-10T06:10:37.815Z] >>> [apiv2][(partial)header] GET https://serviceusage.googleapis.com/v1/projects/***/services/firebaseextensions.googleapis.com  x-goog-user-project=***
2026-03-10T06:10:38.1255379Z [2026-03-10T06:10:38.125Z] <<< [apiv2][status] GET https://serviceusage.googleapis.com/v1/projects/***/services/firebaseextensions.googleapis.com 200
2026-03-10T06:10:38.1258087Z [2026-03-10T06:10:38.125Z] <<< [apiv2][body] GET https://serviceusage.googleapis.com/v1/projects/***/services/firebaseextensions.googleapis.com [omitted]
2026-03-10T06:10:38.1259578Z ✔  extensions: required API firebaseextensions.googleapis.com is enabled 
2026-03-10T06:10:38.1299992Z [2026-03-10T06:10:38.129Z] > command requires scopes: ["email","openid","https://www.googleapis.com/auth/cloudplatformprojects.readonly","https://www.googleapis.com/auth/firebase","https://www.googleapis.com/auth/cloud-platform"]
2026-03-10T06:10:38.1303431Z [2026-03-10T06:10:38.130Z] Running auto auth
2026-03-10T06:10:38.1306871Z [2026-03-10T06:10:38.130Z] [iam] checking project *** for permissions ["firebase.projects.get","firebaseextensions.instances.list"]
2026-03-10T06:10:38.1309433Z [2026-03-10T06:10:38.130Z] No OAuth tokens found
2026-03-10T06:10:38.1312905Z [2026-03-10T06:10:38.130Z] >>> [apiv2][query] POST https://cloudresourcemanager.googleapis.com/v1/projects/***:testIamPermissions [none]
2026-03-10T06:10:38.1315684Z [2026-03-10T06:10:38.131Z] >>> [apiv2][(partial)header] POST https://cloudresourcemanager.googleapis.com/v1/projects/***:testIamPermissions  x-goog-user-project=***
2026-03-10T06:10:38.1318830Z [2026-03-10T06:10:38.131Z] >>> [apiv2][body] POST https://cloudresourcemanager.googleapis.com/v1/projects/***:testIamPermissions ***"permissions":["firebase.projects.get","firebaseextensions.instances.list"]***
2026-03-10T06:10:38.1917258Z [2026-03-10T06:10:38.191Z] <<< [apiv2][status] POST https://cloudresourcemanager.googleapis.com/v1/projects/***:testIamPermissions 200
2026-03-10T06:10:38.1919406Z [2026-03-10T06:10:38.191Z] <<< [apiv2][body] POST https://cloudresourcemanager.googleapis.com/v1/projects/***:testIamPermissions ***"permissions":["firebase.projects.get","firebaseextensions.instances.list"]***
2026-03-10T06:10:38.1921235Z [2026-03-10T06:10:38.191Z] No OAuth tokens found
2026-03-10T06:10:38.1924185Z [2026-03-10T06:10:38.192Z] >>> [apiv2][query] GET https://firebaseextensions.googleapis.com/v1beta/projects/***/instances pageSize=100&pageToken=
2026-03-10T06:10:38.5347139Z [2026-03-10T06:10:38.534Z] <<< [apiv2][status] GET https://firebaseextensions.googleapis.com/v1beta/projects/***/instances 200
2026-03-10T06:10:38.5348441Z [2026-03-10T06:10:38.534Z] <<< [apiv2][body] GET https://firebaseextensions.googleapis.com/v1beta/projects/***/instances ***
2026-03-10T06:10:38.5372229Z i  functions: Loaded environment variables from .env. 
2026-03-10T06:10:38.5377432Z i  functions: preparing functions directory for uploading... 
2026-03-10T06:10:49.5403927Z i  functions: packaged /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/functions (249.11 MB) for uploading 
2026-03-10T06:10:49.5409407Z i  functions: preparing .firebase/***/functions directory for uploading... 
2026-03-10T06:10:51.9813879Z i  functions: packaged /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/.firebase/***/functions (60.35 MB) for uploading 
2026-03-10T06:10:51.9832896Z i  functions: ensuring required API run.googleapis.com is enabled... 
2026-03-10T06:10:51.9836644Z [2026-03-10T06:10:51.983Z] No OAuth tokens found
2026-03-10T06:10:51.9837821Z i  functions: ensuring required API eventarc.googleapis.com is enabled... 
2026-03-10T06:10:51.9839537Z [2026-03-10T06:10:51.983Z] No OAuth tokens found
2026-03-10T06:10:51.9841183Z i  functions: ensuring required API pubsub.googleapis.com is enabled... 
2026-03-10T06:10:51.9842438Z [2026-03-10T06:10:51.984Z] No OAuth tokens found
2026-03-10T06:10:51.9844123Z i  functions: ensuring required API storage.googleapis.com is enabled... 
2026-03-10T06:10:51.9845437Z [2026-03-10T06:10:51.984Z] No OAuth tokens found
2026-03-10T06:10:51.9862951Z [2026-03-10T06:10:51.984Z] >>> [apiv2][query] GET https://serviceusage.googleapis.com/v1/projects/350817205989/services/run.googleapis.com [none]
2026-03-10T06:10:51.9865509Z [2026-03-10T06:10:51.984Z] >>> [apiv2][(partial)header] GET https://serviceusage.googleapis.com/v1/projects/350817205989/services/run.googleapis.com  x-goog-user-project=350817205989
2026-03-10T06:10:51.9878104Z [2026-03-10T06:10:51.986Z] >>> [apiv2][query] GET https://serviceusage.googleapis.com/v1/projects/350817205989/services/eventarc.googleapis.com [none]
2026-03-10T06:10:51.9881569Z [2026-03-10T06:10:51.986Z] >>> [apiv2][(partial)header] GET https://serviceusage.googleapis.com/v1/projects/350817205989/services/eventarc.googleapis.com  x-goog-user-project=350817205989
2026-03-10T06:10:51.9883998Z [2026-03-10T06:10:51.987Z] >>> [apiv2][query] GET https://serviceusage.googleapis.com/v1/projects/350817205989/services/pubsub.googleapis.com [none]
2026-03-10T06:10:51.9887108Z [2026-03-10T06:10:51.987Z] >>> [apiv2][(partial)header] GET https://serviceusage.googleapis.com/v1/projects/350817205989/services/pubsub.googleapis.com  x-goog-user-project=350817205989
2026-03-10T06:10:51.9900192Z [2026-03-10T06:10:51.989Z] >>> [apiv2][query] GET https://serviceusage.googleapis.com/v1/projects/350817205989/services/storage.googleapis.com [none]
2026-03-10T06:10:51.9904565Z [2026-03-10T06:10:51.989Z] >>> [apiv2][(partial)header] GET https://serviceusage.googleapis.com/v1/projects/350817205989/services/storage.googleapis.com  x-goog-user-project=350817205989
2026-03-10T06:10:52.3318855Z [2026-03-10T06:10:52.331Z] <<< [apiv2][status] GET https://serviceusage.googleapis.com/v1/projects/350817205989/services/eventarc.googleapis.com 200
2026-03-10T06:10:52.3320395Z [2026-03-10T06:10:52.331Z] <<< [apiv2][body] GET https://serviceusage.googleapis.com/v1/projects/350817205989/services/eventarc.googleapis.com [omitted]
2026-03-10T06:10:52.3321555Z ✔  functions: required API eventarc.googleapis.com is enabled 
2026-03-10T06:10:52.3401949Z [2026-03-10T06:10:52.339Z] <<< [apiv2][status] GET https://serviceusage.googleapis.com/v1/projects/350817205989/services/run.googleapis.com 200
2026-03-10T06:10:52.3404039Z [2026-03-10T06:10:52.339Z] <<< [apiv2][body] GET https://serviceusage.googleapis.com/v1/projects/350817205989/services/run.googleapis.com [omitted]
2026-03-10T06:10:52.3405182Z ✔  functions: required API run.googleapis.com is enabled 
2026-03-10T06:10:52.3412174Z [2026-03-10T06:10:52.341Z] <<< [apiv2][status] GET https://serviceusage.googleapis.com/v1/projects/350817205989/services/pubsub.googleapis.com 200
2026-03-10T06:10:52.3413581Z [2026-03-10T06:10:52.341Z] <<< [apiv2][body] GET https://serviceusage.googleapis.com/v1/projects/350817205989/services/pubsub.googleapis.com [omitted]
2026-03-10T06:10:52.3414541Z ✔  functions: required API pubsub.googleapis.com is enabled 
2026-03-10T06:10:52.3628537Z [2026-03-10T06:10:52.362Z] <<< [apiv2][status] GET https://serviceusage.googleapis.com/v1/projects/350817205989/services/storage.googleapis.com 200
2026-03-10T06:10:52.3630039Z [2026-03-10T06:10:52.362Z] <<< [apiv2][body] GET https://serviceusage.googleapis.com/v1/projects/350817205989/services/storage.googleapis.com [omitted]
2026-03-10T06:10:52.3631119Z ✔  functions: required API storage.googleapis.com is enabled 
2026-03-10T06:10:52.3640630Z i  functions: generating the service identity for pubsub.googleapis.com... 
2026-03-10T06:10:52.3642967Z [2026-03-10T06:10:52.364Z] No OAuth tokens found
2026-03-10T06:10:52.3643725Z i  functions: generating the service identity for eventarc.googleapis.com... 
2026-03-10T06:10:52.3645179Z [2026-03-10T06:10:52.364Z] No OAuth tokens found
2026-03-10T06:10:52.3648094Z [2026-03-10T06:10:52.364Z] >>> [apiv2][query] POST https://serviceusage.googleapis.com/v1beta1/projects/350817205989/services/pubsub.googleapis.com:generateServiceIdentity [none]
2026-03-10T06:10:52.3650485Z [2026-03-10T06:10:52.364Z] >>> [apiv2][(partial)header] POST https://serviceusage.googleapis.com/v1beta1/projects/350817205989/services/pubsub.googleapis.com:generateServiceIdentity  x-goog-user-project=350817205989
2026-03-10T06:10:52.3652103Z [2026-03-10T06:10:52.364Z] >>> [apiv2][body] POST https://serviceusage.googleapis.com/v1beta1/projects/350817205989/services/pubsub.googleapis.com:generateServiceIdentity ***
2026-03-10T06:10:52.3655705Z [2026-03-10T06:10:52.365Z] >>> [apiv2][query] POST https://serviceusage.googleapis.com/v1beta1/projects/350817205989/services/eventarc.googleapis.com:generateServiceIdentity [none]
2026-03-10T06:10:52.3657867Z [2026-03-10T06:10:52.365Z] >>> [apiv2][(partial)header] POST https://serviceusage.googleapis.com/v1beta1/projects/350817205989/services/eventarc.googleapis.com:generateServiceIdentity  x-goog-user-project=350817205989
2026-03-10T06:10:52.3659455Z [2026-03-10T06:10:52.365Z] >>> [apiv2][body] POST https://serviceusage.googleapis.com/v1beta1/projects/350817205989/services/eventarc.googleapis.com:generateServiceIdentity ***
2026-03-10T06:10:52.6134708Z [2026-03-10T06:10:52.613Z] <<< [apiv2][status] POST https://serviceusage.googleapis.com/v1beta1/projects/350817205989/services/pubsub.googleapis.com:generateServiceIdentity 200
2026-03-10T06:10:52.6138475Z [2026-03-10T06:10:52.613Z] <<< [apiv2][body] POST https://serviceusage.googleapis.com/v1beta1/projects/350817205989/services/pubsub.googleapis.com:generateServiceIdentity ***"name":"operations/finished.DONE_OPERATION","done":true,"response":***"@type":"type.googleapis.com/google.api.serviceusage.v1beta1.ServiceIdentity","email":"service-350817205989@gcp-sa-pubsub.iam.gserviceaccount.com","uniqueId":"118155262370014226082"***
2026-03-10T06:10:52.7264877Z [2026-03-10T06:10:52.726Z] <<< [apiv2][status] POST https://serviceusage.googleapis.com/v1beta1/projects/350817205989/services/eventarc.googleapis.com:generateServiceIdentity 200
2026-03-10T06:10:52.7268168Z [2026-03-10T06:10:52.726Z] <<< [apiv2][body] POST https://serviceusage.googleapis.com/v1beta1/projects/350817205989/services/eventarc.googleapis.com:generateServiceIdentity ***"name":"operations/finished.DONE_OPERATION","done":true,"response":***"@type":"type.googleapis.com/google.api.serviceusage.v1beta1.ServiceIdentity","email":"service-350817205989@gcp-sa-eventarc.iam.gserviceaccount.com","uniqueId":"110776938226831059605"***
2026-03-10T06:10:52.7281621Z [2026-03-10T06:10:52.728Z] No OAuth tokens found
2026-03-10T06:10:52.7283409Z [2026-03-10T06:10:52.728Z] >>> [apiv2][query] GET https://cloudresourcemanager.googleapis.com/v1/projects/*** [none]
2026-03-10T06:10:52.8448704Z [2026-03-10T06:10:52.844Z] <<< [apiv2][status] GET https://cloudresourcemanager.googleapis.com/v1/projects/*** 200
2026-03-10T06:10:52.8453429Z [2026-03-10T06:10:52.844Z] <<< [apiv2][body] GET https://cloudresourcemanager.googleapis.com/v1/projects/*** ***"projectNumber":"350817205989","projectId":"***","lifecycleState":"ACTIVE","name":"Portfolio Danilo Novais","labels":***"firebase":"enabled","firebase-core":"disabled","generative-language":"enabled"***,"createTime":"2025-04-23T19:44:33.277227Z","parent":***"type":"organization","id":"106397661751"***
2026-03-10T06:10:52.8456653Z [2026-03-10T06:10:52.845Z] No OAuth tokens found
2026-03-10T06:10:52.8457963Z [2026-03-10T06:10:52.845Z] >>> [apiv2][query] GET https://compute.googleapis.com/compute/v1/projects/350817205989 [none]
2026-03-10T06:10:53.1031361Z [2026-03-10T06:10:53.102Z] <<< [apiv2][status] GET https://compute.googleapis.com/compute/v1/projects/350817205989 200
2026-03-10T06:10:53.1056831Z [2026-03-10T06:10:53.102Z] <<< [apiv2][body] GET https://compute.googleapis.com/compute/v1/projects/350817205989 ***"kind":"compute#project","id":"6236362438918620630","creationTimestamp":"2025-10-22T08:41:45.457-07:00","name":"***","commonInstanceMetadata":***"kind":"compute#metadata","fingerprint":"Gst5Vv_56EI="***,"quotas":[***"metric":"SNAPSHOTS","limit":1000,"usage":0***,***"metric":"NETWORKS","limit":5,"usage":1***,***"metric":"FIREWALLS","limit":100,"usage":4***,***"metric":"IMAGES","limit":100,"usage":0***,***"metric":"STATIC_ADDRESSES","limit":8,"usage":0***,***"metric":"ROUTES","limit":200,"usage":0***,***"metric":"FORWARDING_RULES","limit":15,"usage":0***,***"metric":"TARGET_POOLS","limit":50,"usage":0***,***"metric":"HEALTH_CHECKS","limit":75,"usage":0***,***"metric":"IN_USE_ADDRESSES","limit":4,"usage":0***,***"metric":"TARGET_INSTANCES","limit":50,"usage":0***,***"metric":"TARGET_HTTP_PROXIES","limit":10,"usage":0***,***"metric":"URL_MAPS","limit":10,"usage":0***,***"metric":"BACKEND_SERVICES","limit":50,"usage":0***,***"metric":"INSTANCE_TEMPLATES","limit":100,"usage":0***,***"metric":"TARGET_VPN_GATEWAYS","limit":5,"usage":0***,***"metric":"VPN_TUNNELS","limit":10,"usage":0***,***"metric":"BACKEND_BUCKETS","limit":3,"usage":0***,***"metric":"ROUTERS","limit":10,"usage":0***,***"metric":"TARGET_SSL_PROXIES","limit":10,"usage":0***,***"metric":"TARGET_HTTPS_PROXIES","limit":10,"usage":0***,***"metric":"SSL_CERTIFICATES","limit":10,"usage":0***,***"metric":"SUBNETWORKS","limit":100,"usage":0***,***"metric":"TARGET_TCP_PROXIES","limit":10,"usage":0***,***"metric":"CPUS_ALL_REGIONS","limit":12,"usage":0***,***"metric":"SECURITY_POLICIES","limit":0,"usage":0***,***"metric":"SECURITY_POLICY_RULES","limit":0,"usage":0***,***"metric":"XPN_SERVICE_PROJECTS","limit":1000,"usage":0***,***"metric":"PACKET_MIRRORINGS","limit":20,"usage":0***,***"metric":"NETWORK_ENDPOINT_GROUPS","limit":100,"usage":0***,***"metric":"INTERCONNECTS","limit":6,"usage":0***,***"metric":"SSL_POLICIES","limit":10,"usage":0***,***"metric":"GLOBAL_INTERNAL_ADDRESSES","limit":5000,"usage":0***,***"metric":"VPN_GATEWAYS","limit":5,"usage":0***,***"metric":"MACHINE_IMAGES","limit":100,"usage":0***,***"metric":"SECURITY_POLICY_CEVAL_RULES","limit":0,"usage":0***,***"metric":"GPUS_ALL_REGIONS","limit":0,"usage":0***,***"metric":"EXTERNAL_VPN_GATEWAYS","limit":5,"usage":0***,***"metric":"PUBLIC_ADVERTISED_PREFIXES","limit":1,"usage":0***,***"metric":"PUBLIC_DELEGATED_PREFIXES","limit":10,"usage":0***,***"metric":"STATIC_BYOIP_ADDRESSES","limit":128,"usage":0***,***"metric":"NETWORK_FIREWALL_POLICIES","limit":10,"usage":0***,***"metric":"INTERNAL_TRAFFIC_DIRECTOR_FORWARDING_RULES","limit":15,"usage":0***,***"metric":"GLOBAL_EXTERNAL_MANAGED_FORWARDING_RULES","limit":15,"usage":0***,***"metric":"GLOBAL_INTERNAL_MANAGED_BACKEND_SERVICES","limit":50,"usage":0***,***"metric":"GLOBAL_EXTERNAL_MANAGED_BACKEND_SERVICES","limit":50,"usage":0***,***"metric":"GLOBAL_EXTERNAL_PROXY_LB_BACKEND_SERVICES","limit":50,"usage":0***,***"metric":"GLOBAL_INTERNAL_TRAFFIC_DIRECTOR_BACKEND_SERVICES","limit":100,"usage":0***],"selfLink":"https://www.googleapis.com/compute/v1/projects/***","defaultServiceAccount":"350817205989-compute@developer.gserviceaccount.com","xpnProjectStatus":"UNSPECIFIED_XPN_PROJECT_STATUS","defaultNetworkTier":"PREMIUM","vmDnsSetting":"ZONAL_ONLY","cloudArmorTier":"CA_STANDARD"***
2026-03-10T06:10:53.1072452Z [2026-03-10T06:10:53.104Z] No OAuth tokens found
2026-03-10T06:10:53.1073441Z [2026-03-10T06:10:53.104Z] >>> [apiv2][query] POST https://firebasehosting.googleapis.com/v1beta1/projects/-/sites/***/versions [none]
2026-03-10T06:10:53.1075063Z [2026-03-10T06:10:53.104Z] >>> [apiv2][body] POST https://firebasehosting.googleapis.com/v1beta1/projects/-/sites/***/versions ***"status":"CREATED","labels":***"deployment-tool":"cli-firebase","firebase-web-framework":"next_ssr"***
2026-03-10T06:10:54.7948917Z [2026-03-10T06:10:54.794Z] <<< [apiv2][status] POST https://firebasehosting.googleapis.com/v1beta1/projects/-/sites/***/versions 200
2026-03-10T06:10:54.7951258Z [2026-03-10T06:10:54.794Z] <<< [apiv2][body] POST https://firebasehosting.googleapis.com/v1beta1/projects/-/sites/***/versions ***"name":"projects/350817205989/sites/***/versions/e85628c7080efba6","status":"CREATED","config":***,"labels":***"firebase-web-framework":"next_ssr","deployment-tool":"cli-firebase"***
2026-03-10T06:10:54.7955443Z [2026-03-10T06:10:54.795Z] No OAuth tokens found
2026-03-10T06:10:54.7957805Z [2026-03-10T06:10:54.795Z] >>> [apiv2][query] GET https://cloudbilling.googleapis.com/v1/projects/***/billingInfo [none]
2026-03-10T06:10:54.9406075Z [2026-03-10T06:10:54.940Z] <<< [apiv2][status] GET https://cloudbilling.googleapis.com/v1/projects/***/billingInfo 200
2026-03-10T06:10:54.9408301Z [2026-03-10T06:10:54.940Z] <<< [apiv2][body] GET https://cloudbilling.googleapis.com/v1/projects/***/billingInfo ***"name":"projects/***/billingInfo","projectId":"***","billingAccountName":"billingAccounts/01AD43-A1038C-940B24","billingEnabled":true***
2026-03-10T06:10:54.9419674Z [2026-03-10T06:10:54.941Z] No OAuth tokens found
2026-03-10T06:10:54.9422609Z [2026-03-10T06:10:54.942Z] No OAuth tokens found
2026-03-10T06:10:54.9424960Z [2026-03-10T06:10:54.942Z] >>> [apiv2][query] POST https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/functions:generateUploadUrl [none]
2026-03-10T06:10:54.9437051Z [2026-03-10T06:10:54.943Z] >>> [apiv2][query] POST https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/functions:generateUploadUrl [none]
2026-03-10T06:10:55.1399967Z [2026-03-10T06:10:55.139Z] <<< [apiv2][status] POST https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/functions:generateUploadUrl 200
2026-03-10T06:10:55.1406189Z [2026-03-10T06:10:55.139Z] <<< [apiv2][body] POST https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/functions:generateUploadUrl ***"uploadUrl":"https://storage.googleapis.com/gcf-v2-uploads-350817205989.us-central1.cloudfunctions.appspot.com/6f2a1c09-016b-46e6-a4a8-41365c7703b8.zip?GoogleAccessId=service-350817205989@gcf-admin-robot.iam.gserviceaccount.com&Expires=1773124855&Signature=ZSODTQcMNk96augayXR5%2FZpx0nSIKt33jJ5JnbHkXrys8o1KGcuEjWlf6g7McvVFzJ%2FE2BLCaiQjs9n2CWHVl%2BrGx9V%2Fng5lINR5PpJ%2BFO9jTXAHVPDhphUfgYiVQ5J7fN2usgIG16xWTYC8iDC12cxk%2FqvQEq5Gxprl1JvJGN5rcbn4D3xe5VCcFVRx06yzmEfBjgUzHUMhAqBr71p6F2PaN%2Blhj4CmG2G7Rfj9DZiOXZ%2BD3sShKBuSVrgyJBpoC6ewqtp6MNQgCStF3EHGt8JKNv%2BV4Ko%2B%2BR%2Ffz%2FWBv7tdMxY%2BG8wWClpqFUn61rvI9CH8BpzA0hpG11W6mLkBvw%3D%3D","storageSource":***"bucket":"gcf-v2-uploads-350817205989.us-central1.cloudfunctions.appspot.com","object":"6f2a1c09-016b-46e6-a4a8-41365c7703b8.zip"***
2026-03-10T06:10:55.1415545Z [2026-03-10T06:10:55.140Z] >>> [apiv2][query] PUT https://storage.googleapis.com/gcf-v2-uploads-350817205989.us-central1.cloudfunctions.appspot.com/6f2a1c09-016b-46e6-a4a8-41365c7703b8.zip GoogleAccessId=service-350817205989%40gcf-admin-robot.iam.gserviceaccount.com&Expires=1773124855&Signature=ZSODTQcMNk96augayXR5%2FZpx0nSIKt33jJ5JnbHkXrys8o1KGcuEjWlf6g7McvVFzJ%2FE2BLCaiQjs9n2CWHVl%2BrGx9V%2Fng5lINR5PpJ%2BFO9jTXAHVPDhphUfgYiVQ5J7fN2usgIG16xWTYC8iDC12cxk%2FqvQEq5Gxprl1JvJGN5rcbn4D3xe5VCcFVRx06yzmEfBjgUzHUMhAqBr71p6F2PaN%2Blhj4CmG2G7Rfj9DZiOXZ%2BD3sShKBuSVrgyJBpoC6ewqtp6MNQgCStF3EHGt8JKNv%2BV4Ko%2B%2BR%2Ffz%2FWBv7tdMxY%2BG8wWClpqFUn61rvI9CH8BpzA0hpG11W6mLkBvw%3D%3D
2026-03-10T06:10:55.1421570Z [2026-03-10T06:10:55.140Z] >>> [apiv2][body] PUT https://storage.googleapis.com/gcf-v2-uploads-350817205989.us-central1.cloudfunctions.appspot.com/6f2a1c09-016b-46e6-a4a8-41365c7703b8.zip [stream]
2026-03-10T06:10:55.3395002Z [2026-03-10T06:10:55.339Z] <<< [apiv2][status] POST https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/functions:generateUploadUrl 200
2026-03-10T06:10:55.3401795Z [2026-03-10T06:10:55.339Z] <<< [apiv2][body] POST https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/functions:generateUploadUrl ***"uploadUrl":"https://storage.googleapis.com/gcf-v2-uploads-350817205989.us-central1.cloudfunctions.appspot.com/b01965c3-b993-43f8-bdbe-c408d0eec510.zip?GoogleAccessId=service-350817205989@gcf-admin-robot.iam.gserviceaccount.com&Expires=1773124855&Signature=WwkR4f%2FJntupV1h2o6vcKtmYsKNrpg2eYCO1kqFwWqW8wXzair3S0ZG19I98LJ%2BLyMqZR%2BVVCaa6sPCLC%2B0IV%2FZDxgdihA41aRJpTUnBWAmTmgsbwcvVB3bXwjOIH56o9cAKsFCBH0iWpjXMPDEy5NAkU%2FvWeE%2FL4AgiN1pzqDZtJXy3hgz5aTKojh6NIpcXW4PhFd%2FbA39zO3oJrmvYdv8Hx%2B2D9VVx9J95cPq4RWzuEacgbuJ%2F1tdydFs0H6bTkF6Sl9FA7x4dwfLbiZBEjGaHif5kkqRwtuZVD%2BcpjaR9rdBw3MymsPT0OLSH4sGsUS%2BmHxuH%2F8pyxR87iQnfaQ%3D%3D","storageSource":***"bucket":"gcf-v2-uploads-350817205989.us-central1.cloudfunctions.appspot.com","object":"b01965c3-b993-43f8-bdbe-c408d0eec510.zip"***
2026-03-10T06:10:55.3411774Z [2026-03-10T06:10:55.339Z] >>> [apiv2][query] PUT https://storage.googleapis.com/gcf-v2-uploads-350817205989.us-central1.cloudfunctions.appspot.com/b01965c3-b993-43f8-bdbe-c408d0eec510.zip GoogleAccessId=service-350817205989%40gcf-admin-robot.iam.gserviceaccount.com&Expires=1773124855&Signature=WwkR4f%2FJntupV1h2o6vcKtmYsKNrpg2eYCO1kqFwWqW8wXzair3S0ZG19I98LJ%2BLyMqZR%2BVVCaa6sPCLC%2B0IV%2FZDxgdihA41aRJpTUnBWAmTmgsbwcvVB3bXwjOIH56o9cAKsFCBH0iWpjXMPDEy5NAkU%2FvWeE%2FL4AgiN1pzqDZtJXy3hgz5aTKojh6NIpcXW4PhFd%2FbA39zO3oJrmvYdv8Hx%2B2D9VVx9J95cPq4RWzuEacgbuJ%2F1tdydFs0H6bTkF6Sl9FA7x4dwfLbiZBEjGaHif5kkqRwtuZVD%2BcpjaR9rdBw3MymsPT0OLSH4sGsUS%2BmHxuH%2F8pyxR87iQnfaQ%3D%3D
2026-03-10T06:10:55.3416200Z [2026-03-10T06:10:55.339Z] >>> [apiv2][body] PUT https://storage.googleapis.com/gcf-v2-uploads-350817205989.us-central1.cloudfunctions.appspot.com/b01965c3-b993-43f8-bdbe-c408d0eec510.zip [stream]
2026-03-10T06:10:56.2072493Z [2026-03-10T06:10:56.206Z] <<< [apiv2][status] PUT https://storage.googleapis.com/gcf-v2-uploads-350817205989.us-central1.cloudfunctions.appspot.com/6f2a1c09-016b-46e6-a4a8-41365c7703b8.zip 200
2026-03-10T06:10:56.2075404Z [2026-03-10T06:10:56.206Z] <<< [apiv2][body] PUT https://storage.googleapis.com/gcf-v2-uploads-350817205989.us-central1.cloudfunctions.appspot.com/6f2a1c09-016b-46e6-a4a8-41365c7703b8.zip [omitted]
2026-03-10T06:10:56.2077402Z ✔  functions: .firebase/***/functions source uploaded successfully 
2026-03-10T06:10:58.3913185Z [2026-03-10T06:10:58.390Z] <<< [apiv2][status] PUT https://storage.googleapis.com/gcf-v2-uploads-350817205989.us-central1.cloudfunctions.appspot.com/b01965c3-b993-43f8-bdbe-c408d0eec510.zip 200
2026-03-10T06:10:58.3916673Z [2026-03-10T06:10:58.390Z] <<< [apiv2][body] PUT https://storage.googleapis.com/gcf-v2-uploads-350817205989.us-central1.cloudfunctions.appspot.com/b01965c3-b993-43f8-bdbe-c408d0eec510.zip [omitted]
2026-03-10T06:10:58.3918143Z ✔  functions: functions source uploaded successfully 
2026-03-10T06:10:58.3997432Z i  hosting[***]: beginning deploy... 
2026-03-10T06:10:58.4371453Z i  hosting[***]: found 177 files in .firebase/***/hosting 
2026-03-10T06:10:58.4372317Z [2026-03-10T06:10:58.436Z] [hosting] uploading with 200 concurrency
2026-03-10T06:10:58.4379161Z [2026-03-10T06:10:58.437Z] [hosting] hash cache [LmZpcmViYXNlL3Bv***L2hvc3Rpbmc] not populated
2026-03-10T06:10:59.4478415Z [2026-03-10T06:10:59.447Z] No OAuth tokens found
2026-03-10T06:10:59.4498684Z [2026-03-10T06:10:59.448Z] [hosting] hash cache [LmZpcmViYXNlL3Bv***L2hvc3Rpbmc] stored for 177 files
2026-03-10T06:10:59.4501036Z [2026-03-10T06:10:59.448Z] [hosting][hash queue][FINAL] ***"max":1005,"min":17,"avg":87.54802259887008,"active":0,"complete":177,"success":177,"errored":0,"retried":0,"total":177,"elapsed":1011***
2026-03-10T06:10:59.4504073Z [2026-03-10T06:10:59.449Z] >>> [apiv2][query] POST https://firebasehosting.googleapis.com/v1beta1/projects/350817205989/sites/***/versions/e85628c7080efba6:populateFiles [none]
2026-03-10T06:10:59.4668756Z [2026-03-10T06:10:59.449Z] >>> [apiv2][body] POST https://firebasehosting.googleapis.com/v1beta1/projects/350817205989/sites/***/versions/e85628c7080efba6:populateFiles ***"files":***"/test.txt":"04d9dadd1711eb2fd667240d7f7fd2b8d0c4ee611ee3655e3aa6263c8558416b","/sitemap.xml":"72ca962038828a2e7b4fd07c87109e96146168016e1edb225e14f1e79d7f07d1","/robots.txt":"aeafe5802bfea38b20e65c7f727c3477492fed1763eebe1eeb07f1bbe7dfff9c","/privacy-policy.htm":"0d792ab1357732a387260c40b4dc7f61f96b68cbe28da6262cf821031e340fe5","/manifest.json":"b1a6fa8c76d18579154e385b3ce8251ec403c7a5fa7455121dc821bb6eac26e2","/privacidade.html":"9998446ba87a3723a456442775e96d86590cfd15b82cc932129a5ec479b3cb0e","/build-info.json":"e8984726d3879c7010f4f0764cfcc6b2ddcfe5e964d9db0eee37129b0040c5f8","/_not-found.html":"20d7efc2ae88ed4d5672d5e63ff5cea8fcade1f4e622974c273146ff7092f21b","/_global-error.html":"cb3d4c52375eab7f5de1d51c927205b922baf71fe96fd58b2897a5039d56c3e7","/contato.html":"d208840b74e03e44687e7e249a975aa00a5c70298188ca4d5849748802a0ec17","/500.html":"cb3d4c52375eab7f5de1d51c927205b922baf71fe96fd58b2897a5039d56c3e7","/404.js":"5c8a9bfd773f9a8829aec3ea7460c0c7b8ef4922d2d39a1a06ac208fbb3009df","/404.css":"1316d469958467bfcfe16e3c86932fcfe70363e48c09a681aeb5c383f05595a4","/404.html":"20d7efc2ae88ed4d5672d5e63ff5cea8fcade1f4e622974c273146ff7092f21b","/CURRICULUM-2026.html":"f30ead68f45c4ef025cfc0b0ccbf0f826d968d623d892cda13a7fca1bf8f1a0a","/site.assets/images:videos/404.webp":"ed930956360f5fbfe04500818e56116278a3c15327da371a2eb678e833870f9b","/site.assets/global/404.webp":"ed930956360f5fbfe04500818e56116278a3c15327da371a2eb678e833870f9b","/site.assets/global/logos/FaivconLight.svg":"345ac6b342990c3ef4ecf09ac4d19d7e190cdd54d557a6fe6781e67785f11935","/site.assets/global/logos/LogoDark.svg":"8a09b53fe5aff3eb8e0604f55c927b003541f8133f2a527a35f35f9ae8c239ca","/site.assets/global/logos/Faivcon.svg":"0fb868b2545396d503bf45942db5880efdb8a72837e11bebb5666395ce4d26cc","/site.assets/images:videos/converted-(5).webp":"94eaffb9707d4a93a246362a45d8a2afc54b6562c6bc70187d69dd77ee5ece04","/site.assets/images:videos/404.png":"f43f8c71a2f428ba5c604280c6cbf22fb8d0a0980657d78650f159f0a7a303b5","/opengraph-image":"4fe898d63b63da78e10e95d4806eaee2e2d0d3d10dacf7ff80a2b58e2f04b7c5","/sobre.html":"e1f5c1969a839ca3560a405efd294d0956a8d6b2702500091ca8113e17790c2e","/site.assets/images:videos/nescau.webp":"36805cbb5e136578aded1baabe74295015af741b27f2335b60181ff0be618b91","/site.assets/global/logos/LogoDark.webp":"119194e0e8cf90e8c19d27dbc7ea192f4c7b8f54a4aa312051d7c06e62ce4fe0","/site.assets/global/logos/LogoLight.svg":"41505c254632cbca69791b77053c9dae46570b0e7f21dc3392308a47e4c0870b","/index.html":"ad8dcbff63a0e01988cf8d45758d42e79bbf6f396a121b718f5b9b0a1aa5039f","/site.assets/clients/clients.strip.8.svg":"c3d76f3217e62056a331f8b7f2a7594738e357153b5b91f001081339923fbdf3","/site.assets/clients/clients.strip.7.svg":"17727131c5eb7985dceb19d94e184dcfb1b2d124cc2cf57ba9a05f581cf3bf92","/site.assets/clients/clients.strip.6.svg":"9db2f1f18c833ebadb0e6704b6282ce08c430d16e9d2c1b37fd95fa4c30e3d15","/site.assets/clients/clients.strip.3.svg":"8ae668bf2e24ce211aa4af855b5fadb40252aaaa8dcaeb6c58fddd9c1e9d3514","/site.assets/clients/clients.strip.5.svg":"a4a7ff8f6c6bc72628f11a4478f7a012a27b45850946375a6366b251b3e75bb3","/site.assets/clients/clients.strip.2.svg":"9600bde30b168166abc6c79eaa3f0fc29197ab7dc177fefba9146c6b8532738a","/site.assets/clients/clients.strip.12.svg":"c2fc6ad2e951450c64dbfd1f8d02facb9bc3dcb63d6a1394edb1f2b038202326","/site.assets/clients/clients.strip.4.svg":"2bbe4d0315225a594f365ec90c5b4876b7161b684009ae42cea339e94e11e5b5","/site.assets/images:videos/converted-(10).webp":"88ba5b0fdc9fe955bd3a7f119c5546ea03724f900646505b6335d4cdc19481b7","/site.assets/clients/clients.strip.11.svg":"96c075dad67105f13f190ab57f61fccddd046251e3ace9951f4a4a28d81e3df7","/site.assets/clients/clients.strip.10.svg":"835030cb8b750b6bdccb6e056eac1c9b28a522f2fa37f5b66e6ac7d6411134a1","/site.assets/clients/clients.strip.1.svg":"a5a1f7eab719be0d54e1ab09bbd0b1d3b4cdfc4ff6a5925ba4aaf723e89deec7","/site.assets/clients/clients.strip.9.svg":"63e5aaab07b454211204bcaf8dcbdb723c7917478de7776b68422874806a5ffc","/site.assets/images:videos/converted-(3).webp":"c464c7d13447a3de7e738df04bbfed8bf45b31bcd2b4634e94b9fae14a764ece","/site.assets/demo/cs3.webp":"36805cbb5e136578aded1baabe74295015af741b27f2335b60181ff0be618b91","/site.assets/about/origin/about.origin_image.1.webp":"34561df5f473fce798c3b2c7ab4568b48e78eb06765a5c2c2659cd68407cbfd4","/site.assets/about/origin/about.origin_image.3.webp":"f42e836aa4dd95a454a0b5d23dd0c0024509a7b5c0837715fdd1ef6af6b35aa1","/site.assets/demo/cs1.webp":"15e50b7c9125ed63a5809af839122b7f8523cf3c193e5068e6dd8c19ed29d70b","/site.assets/images:videos/converted-(7).webp":"4c96f5197eb5359411b6b9edaf23d7132f2ace63ce6c72ff549888930c0c553b","/site.assets/images:videos/converted-(9).webp":"bdf0c4e49b9a2d12f69d1369dc47f6c01677481f17fd6f01f715a67299d27798","/site.assets/images:videos/converted-(6).webp":"a1335c51360c35f2080690785537a275bad195787f8794c95ccaa1c1229016d4","/site.assets/3d/Ghost.jsx":"0981ee37e3bd86f8bc69679956579b0e1ac80744870250c93d944eeb399318ae","/site.assets/about/origin/about.origin_image.4.webp":"91e1884d60729b2d725e754b3bcd5ca11ee898c4250c7cc7cb6d93f671f40f75","/site.assets/demo/cs4.webp":"c464c7d13447a3de7e738df04bbfed8bf45b31bcd2b4634e94b9fae14a764ece","/site.assets/images:videos/converted-(8).webp":"234d0e959c254c4f8f7b79f572f24f5d79f300774909d6c99eae3529881347d3","/site.assets/images:videos/converted-(1).webp":"22892a21c5735992ee2fb6a25d6a7776f144e73c2e62012db09d347211e61b83","/sobre/opengraph-image":"ad503e914eb00764b3baf145d75db4f591a328428511d6c1cb45880a50d93e23","/site.assets/about/origin/about.origin_image.2.webp":"b4cda56c0caffe9954ae6cbf6f3ec39b75e69c48823cd1c39a14926089468bc9","/site.assets/global/fonts/TT Norms Pro Black.ttf":"b97fb8cadb64713dbe5a40d7596cbbcc864baf6db7ca314d5311c4591769859b","/fonts/tt-norms-pro-black.woff2":"5081762a384a4ee606306b68bc1f19ea27d774c7bec0765f66bc80c2c78b3974","/site.assets/home/showcase/Branding-Project.webp":"f63f25b69b09d864459053af9a0a4a3c04cac7545cf63738b0cf50b7f852de0d","/captions/ambient.vtt":"71956d0cad8f2ce0e274b20caab1f510ac41531cbe4dae66efa5fa161dde6c9b","/admin/reset-password.html":"679eb40f2f24b7600dc3d9eb0179c951c756f6583f4dcdc7a3482cfba5987319","/site.assets/demo/cs2.webp":"22892a21c5735992ee2fb6a25d6a7776f144e73c2e62012db09d347211e61b83","/admin/login.html":"09d56cf27a1a6f59a2035755c05f3354aca9469730ccfcafcc854dc10180f001","/assets/3d/bar-v2.glb":"e5de8f7dbcff5ecbbf71f5ef0af144d901715a44064f5f081f1f186d6cf148d7","/_next/static/oJGzsorcCASyPobcb5XOc/_ssgManifest.js":"d8d8790f4e673a23bec506f00699bed8a258ac0e4965bb1ca8598172cfc0ec97","/_next/static/oJGzsorcCASyPobcb5XOc/_clientMiddlewareManifest.json":"5536dd95a4c2e8eca49d77a8bd7f3d49e1dc5eb3c31d20baf138c8de190f9096","/fonts/TT Norms Pro Thin.woff2":"523de859bad00dbe9c66ffecc944896676b33e0c589157f0382366fa303c6560","/fonts/tt-norms-pro-regular.woff2":"e9184c99e0cfb4bbbab39f8cd4a4a81c1ba759f4b2fea282f5f531d9ae5030c4","/fonts/TT Norms Pro Regular.woff2":"e9184c99e0cfb4bbbab39f8cd4a4a81c1ba759f4b2fea282f5f531d9ae5030c4","/_next/static/oJGzsorcCASyPobcb5XOc/_buildManifest.js":"eadf3650017b2094542d95eeda190a7ef5689624c557c1c1ae4d5a0d53057195","/portfolio/opengraph-image":"a60c6c2a9168ccb3e54b99e29f7139b505aec76f94d5c1403873235cbf8d48ae","/fonts/TT Norms Pro Medium.woff2":"003a9ed92ac39b780c540a77ef3d05782fb6fb18e4dc7169a36cd94e9785ad7a","/site.assets/home/showcase/Key-Visual.webp":"c1cf13437b6f091e18677c68a7e5cfb295b39dc4a798ca16695d8f60d6aaf058","/_next/static/chunks/turbopack-8438dada38b3c0db.js":"86d8fa5a637d11016b879c91ef92aae5958d046607d89d40cf43a4840748ceac","/fonts/TT Norms Pro Black.woff2":"5081762a384a4ee606306b68bc1f19ea27d774c7bec0765f66bc80c2c78b3974","/_next/static/chunks/fd43b105ecff1f18.js":"38918ec63f2cbb949fe36e344253c845f3a63333cbe3c9cd73c9aed7c6e034a6","/fonts/TT Norms Pro Light.woff2":"d7be1c57a2a41455e349f684096fb7d8600818b3586aa3107267d7394ff40b09","/_next/static/chunks/f9dffce05e1ed190.js":"8c983f5b0a34d3e8430031341d3fb7027e9520d7847434009402b30b5e883596","/_next/static/chunks/f4d0f6e1cad4d2eb.js":"db72a09817f48ccf951a4f49115f94b98cc5a24aa9efa043f8f2e1ec2c5e7523","/_next/static/chunks/e7f016fa5db00cbf.js":"3001e67c92209d890e0c040c64b9e62d84138831f24d22541de8ab5280dc5570","/fonts/TT Norms Pro Bold.woff2":"808f4e0ef7ce1eaabf33499db3a2d173a042c654c07f1d13d0177e65e8c45f7f","/_next/static/chunks/e5743e0110d021e1.js":"736cd69a838acef81ca9b28e29b54668e69b34b6fbbe4b9bbf6a5dff908b7f8b","/_next/static/chunks/e55fd137c31e2a56.js":"ab88583388ccc991e73df731f50015e8ec9bcb84cb7339bbb1d8d0b88abb09b7","/_next/static/chunks/e55237f307e266d4.js":"cf900563f1d8646f0adc990884eaf613451896a9b149ed4142ab72e1fd93a38f","/_next/static/chunks/e262aa3a7770bf09.js":"2f5584c5148550c25d7d630c4f1a3d96cf10ce4913f53422c36ee97ff5db33d5","/_next/static/chunks/d34ceb3d3e857df8.js":"9765361f14875243ff28830ee74ece80856849b5375b3217cce2f32b8d48db5b","/_next/static/chunks/d442fd33d58c7887.js":"b8ab0f3fd2d58c8f83f89208b1622a391ee05a18b24f26a726647a81f30ebb7b","/_next/static/chunks/d246a5be2c6e0a1e.js":"ba73a2baa79195c1565c7946e93f6e177ddd2d40604b51088c7c699da6f5bbfa","/_next/static/chunks/cd22de2cdbc4970e.js":"588618dff883fc1fc1af8914e33998b4d3b1a6ae6abee7cb3a39fdd59336824a","/_next/static/chunks/c556653440f5b134.js":"49706fe6e7eece9f9eb4ab926e75325e17d694d9fab1ea26b4857000ce719574","/_next/static/chunks/bff74c285a82b7e1.js":"ee91acef8a4c142bf6640e98253da983a95e57b499225976e828f1042d627e1e","/_next/static/chunks/bac6fffc580a05ae.js":"f11852209e0eaba337f8d35d2601a4b801808f9f9491b6c27e5907a41f01ec6f","/fonts/TT Norms Pro Thin.ttf":"7e605f417fb4891266a6c6ec60dcd8d2921dc22f042ee7a299e547e5ae5a94eb","/_next/static/chunks/e2b2987132a6de5a.js":"8fb5a9a7fce16e4058b12e566cdde48733b02bd80f7a0c8a58e4535cdbaa4150","/_next/static/chunks/a5d7144b4dcd0566.js":"d113a0370c2373b8908699b1d32d45317b8de6a13a901588e389399a64ab5116","/_next/static/chunks/a59bff9111a4a1e4.js":"73b94b0004865f4d8ed9720c2fff31cf0d021d96a73f60f8327f51c3dd8bd83f","/_next/static/chunks/b014060d296ab697.js":"2099c324262a4adf853b3e23da738bc2e574de5e5fb62a558284f370e3293856","/_next/static/chunks/a0e6da91b3326e0b.js":"5321f78d00d6f552ba582934a00772b641b91ac6941beaa0f4d0ba6e921cb1b6","/_next/static/chunks/9a521a4c3efb5888.js":"60b1c282e926ff7692f64d8c1f9a3d6f822ef3fd0528660662b2916ed47c8bbe","/fonts/TT Norms Pro Regular.ttf":"da3b6b224cf324f4951770ac2fd85e5ba944594ca7554eb14b90edb7107c7415","/fonts/TT Norms Pro Black.ttf":"b97fb8cadb64713dbe5a40d7596cbbcc864baf6db7ca314d5311c4591769859b","/_next/static/chunks/99f7080de4f55d91.js":"b0004b99ecd7e09027bcb52c8b6978b2b45870bb268a3665b03a5383a02b911a","/fonts/TT Norms Pro Medium.ttf":"6e7ebdba9a4df0b9134a12f7e9f4de46cc88e3392464845c7c2d5b83dce38054","/fonts/TT Norms Pro Light.ttf":"86356b765f86b21d6157986f8fd8a5eeb9b08b1d51f74b5e734698fa335e2408","/contato/opengraph-image":"3b3b9c087d8aa7213c818856a5935fe81654d496b0a3e1e4bd3aac3a1b7b95fc","/_next/static/chunks/997cf54043b8e1c6.js":"af8a28ba62965082dda7862102414a03ab5cb6736e7cb1a7295d986d530d452c","/_next/static/chunks/921f6d78766cc29f.js":"10bc3fe67d260f2c3fa600eee3e83868d74c74571c03b010823855d3e2c65769","/_next/static/chunks/9470d603967a9f13.js":"a6ab5d6fac16e3e5a39b40242c63e28e8ef5683abda227f68dcb2aa3b83cae3a","/_next/static/chunks/8887aaa01b8096de.js":"c7fd5b4b7a3e25b63e9692423b07504ead3e8dc9265fe92b7de3c5c10e436ed5","/_next/static/chunks/a6dad97d9634a72d.js.map":"755290295d3187db8976f6cfcb864952be20de0bfc6d42f4b9f031fb5ee55b3f","/_next/static/chunks/84ab3f30b1efa361.js":"33057b7bb131d873777b0742b848edadff9b81d7c45d46c97fee4a37986ca4c8","/_next/static/chunks/815545ea1e09c76d.js":"ba3777c340caab95f085c70f7a008c37fbbfaa4cf6a78b96ccfc71fe605b8d48","/site.assets/3d/ghost.glb":"4a73d179225c896621aa4b15b81abe6d4753797144fe9f681a6e3938b214fd58","/fonts/TT Norms Pro Bold.ttf":"3ca4d569e08a873e515991a31842921e06f4119301e3ae9825ca82bf03b4e871","/_next/static/chunks/c96dbfdc9b709db5.js":"8ff789a61cf810d1f75e1b0b310e8bbdeba83bd97e5c0c36f3f1c4bf6b2c088a","/models/ghost.glb":"4a73d179225c896621aa4b15b81abe6d4753797144fe9f681a6e3938b214fd58","/_next/static/chunks/74efdab0cb31290b.js":"4e5ad41f0595fee7a37a4a5b8f3dd18b95c86d1610225fb3cfd7317ef0e09cbf","/_next/static/chunks/a6dad97d9634a72d.js":"45b36f93bb08c52e360d14b0e8449c88770aa8cf5d59bff1c76cbe6e198fe7c5","/_next/static/chunks/6e4b390e35e8a887.js":"6b583acfd5e4363e17131e4da52398c9b471b450dbf568379655cbe0ab3f3d11","/_next/static/chunks/657274edfbb1e8c3.js":"a50acb8ee7bbc72d0a52048e545a0e8bf5918df6fbeda44001c1f0b2e64db8e3","/_next/static/chunks/64e2c25f10e4de15.js":"f588f9b7c87b5758cf22f0c70a574ab433f4fb6bfcb64f28b53bef3a500887db","/_next/static/chunks/96dd8d7bbb341fd1.js":"e92f9b7ac6a5b236d1980bd36b9173bab1b8c7484aec0e1f4a82901344188d9c","/_next/static/chunks/5e350a1ed0439878.js":"c0d95b7c12a1bae474834d7d89acea70a8513bdf89bc0e8b1524891a5943631b","/_next/static/chunks/5b679f607aa689ad.js":"6e388b3b31f9835768084891bd81e498d872e7f9718f8e9f565f9ad1cf251502","/_next/static/chunks/513e0e1cef169f14.js":"659d0de471c8f456bc788d4361dea4854c0e09cc3c4c42438a7d05a9a9d9f35a","/_next/static/chunks/4fb77c3266716afb.js":"23dc60d61093a3567f4e2d798c17e82ddeb20dff45fdc18705ee1e246db8a37a","/_next/static/chunks/483758629e0a4859.js":"4ac8cdbefa971c6471558f75154e81663326875888aadc7688430667b384f968","/_next/static/chunks/8f4c0ddc60637df8.js":"3a968a7f0af6eda10ddad5f3983cfb78dcbe97b5bfccc71fabf5dcb0101562c2","/_next/static/chunks/44268786ea924031.js":"9942503040b1ea378f08c6bc59dbbf7a31420ebbc9140b08d5fba5f6640c844f","/_next/static/chunks/44dad2fbcd512a45.js":"c39e76c5ca28e894eca3311b9957e2d027d401ca0c0c7dd71a87326d75f632cf","/_next/static/chunks/3d3ed6a31bd7f715.js":"b6fbb05ef1d4fe4db5b48edfaaa233366b1ae9857cc54078e1e0ca3003a2eed7","/_next/static/chunks/3f7b7855c6f9859b.js":"26196f5388a458f4ceea2221f9a63f3994502b8fbe66097293720ff44ed81cfe","/_next/static/chunks/5d7f1e9b6b8aa1b1.js":"6144f11cebe59ef3659afff0e55c9cfb1bcfd9d2ad3b89f0181547f99a5aa4fe","/_next/static/chunks/3561f5621a05112e.js":"123a0f8f5aea7892e09d9a8d31d3c77a91101f3b91301f5b909a00e41ac73451","/_next/static/chunks/3367e52ca5e65f72.js":"bb308e1d460d3eca4af8561c515c9076305f84ac60f0e239468d96959e639ad4","/_next/static/chunks/2ed6dada56686e92.css":"fcc355c76c91c8b3f8c4958bcfec4b8606ac1b65471de1002882bd62e498f399","/site.assets/home/showcase/webdesigner-2.gif":"ddea833d8d3238ae332fe5f91a160f2ffff8c8588fac3db96f58a62fbe8c1889","/_next/static/chunks/c409d75d8ac2f8ed.js":"da19918ea826a539e07329f4c8442f590c12d17057e03bc91b5b289713bc4ba9","/_next/static/chunks/2725fbe4c97c7a88.js":"be06b6267e15dfde7a38995beebc13a34aa37cf8e7dc4e085ffad6ceeabd4780","/_next/static/chunks/255f1f88105e5070.js":"608586860161e9513270a25877eda915711b43f0be41d40bd0e4a49b0646440c","/_next/static/chunks/24beee69ba2e06e4.css":"a6c00d542a36290ea848acd31a3674059922174c0079dcde9a6c0c755c329616","/_next/static/chunks/23e7316e7857183e.js":"75ec5a044c02cce1bbcb2fc077240833cf61891f3a116aaa4642b79b2f2492e4","/_next/static/chunks/1fad0b6517d2cf9b.js":"2ef91faa7e5227fed96789b8a3ba8ff2fd547c5f58bc5b139fcd64538e7ad19e","/_next/static/chunks/4c4dc77efe945d7e.js":"5a386fcb3d5e4e9a5ca7a15a6b45050d97b5ef2515ffc73911aaeaa5135d4e38","/_next/static/chunks/177983b023cc9b7b.js":"8ea3fdb07accd63e2610416026b0e5ab20c17719897e3d271107f4884580747e","/_next/static/chunks/11b7eb9ec1f2fcf2.js":"e879c534a3910f6f93b1c3db375f42c1a1708da42ffe3589370766e8446efc55","/_next/static/chunks/22225b4f59aff158.js":"e6036d1cc413665b7c7bb2874368261108534d82c50ee6e362b9a08cdf5e3a7e","/_next/static/chunks/47038f0e3f0d8207.js":"c38ca509a7f93601e138e8801b158eac515f914d13cf9ff651eaffaf74f11c15","/_next/static/chunks/03a4afccd896e593.js":"0318fc504ecde236d4b437df132921409d82e083e0ef05dbb71de8c36bb63c16","/_next/static/chunks/0229fe47a1909139.js":"07142b74fb1d25b8751b3ce539afd5da2250a81bbbad0316c0fa5ea8ff46b3df","/_next/static/chunks/35cd4290674dd9c9.js":"c59f225be00467ede78dba3f5dbd887982d2be003ea9f66f40d6b83203ec44a8","/_next/static/chunks/99c369edd9cd6104.js":"abce46bfdb7af4e13846933de12eb36d35fd0fb1b16f12c91dd9a1d7c93bf5e8","/_next/static/chunks/1723d327acc52f5c.js":"4b7b9d69ba7a0dff7aade5a10a152441af546bad2f4d39efe29add9d04273f75","/_next/static/chunks/08a6b42dacb3f996.css":"3c4cfbae22a2019173a0e89115bb971f74c9a7dfa1446be5541bc99c44f276b4","/_next/static/chunks/0058ad2bd69ea755.js":"10414c3ea2915fe218b898f7f352a60df1a385e3d4b64f773be62e8fffe01ef4","/_next/static/chunks/0f732026055a0e29.js":"1a7e4592a6ead86ee6d399fc0e46143e4f1fa8f3b43151d7d685b245a545171b","/site.assets/about/method/about.method.mobile_video.mp4":"7ae2dfa6df57540d85344c21872b6507681211eaaa27b118b61747fc126d879a","/_next/static/chunks/1d9eb95d46bc1ca4.js":"91e57d0b957138832c66127296a18231175655809010969ae298b06a2a01cd79","/site.assets/home/showcase/show.video.mp4":"65361034008640ca6f0473cc0e80dac07e280545e986839cc89812ba14f0a4d3","/_next/static/chunks/5aecdec56bd4ebc7.js":"ebe12ff8dcbd115499e517cd5aba1af0afdca6f70377643019a99d8d93b62a66","/cv-danilo-novais.pdf":"7d0236f245e7a2937b47be74f25c1dcf22867a21c504092aaa247e3eb0453947","/site.assets/about/hero/about.hero.mobile.compress.mp4":"0290d9529cecd00bfc5fe535f5fd6cf4d6e2e86d9f538e552969b86ac61f1e21","/site.assets/about/hero/about.hero.desktop.compress.mp4":"e54d3612c7f485ac2ab789a87639a0a7ac6f1c3a855ecac5dd935b1884993b93","/site.assets/about/closing/video.closing.desk.mp4":"78f1aedbe748e752d6187d818d6f6444ad467aa909871983d5b760942fec83d7","/site.assets/images:videos/VIDEOGANHOU CAUSOU.mp4":"85ba2d2cbdd1b194b89f0411c4317b4d789ab8177dad75168fffaecb5f7a3f5e","/site.assets/about/hero/about.hero.mobile_video.mp4":"cc9e85abaebd30d05e3f67848ed5ba23ae4c9ab263ca945ceb52723ae1c0dc12","/site.assets/about/closing/video.closing.mobile.mp4":"289fc06e8843a0a1ae2108534827b421856cff2a806a8118004824d83af04928","/site.assets/portfolio/portfolio.hero_mobile_video.mp4":"f1fe48871d6b949a14d0ca571b83966d2dd6efb132339b294484b70924f8b16d","/site.assets/images:videos/converted-(4).webp":"3f035f0b33c0a09d7df7261f8b1a107108e24e5bc77ac204ad7a5104664a0389","/site.assets/demo/cs5.webp":"3f035f0b33c0a09d7df7261f8b1a107108e24e5bc77ac204ad7a5104664a0389","/site.assets/about/hero/about.hero.desktop_video.mp4":"07fb8d63198b5f8d6185d29ed63a3d95428a778465fa0fda50af5f26615c59a0","/site.assets/home/video.manifesto.mobile.mp4":"90764200cc13ed221bc27935981f2c76d61749f165b69a11c0796ffba299e7f9","/site.assets/home/video.manifesto.desk.mp4":"23c28ff7225e2f3e9c6026ab1a82d319bedf12da0a434b31c35c52859696a58b","/site.assets/portfolio/portfolio.hero_desktop_video.mp4":"8b4bcdae1611c70aaba1d4f5450104275605dbfdda0baec62991ad3a1c63f0db","/site.assets/about/method/about.method.desktop_video.mp4":"16a7557f93d32615af70ecd94353a6bab684e52f9347183ca8072cc06a10c820","/site.assets/images:videos/VIDEO HORIZONTAL 3072X1536 PIXEL COM TELEFONE_compressed.mp4":"2629054916e822faaac380970eadab831200258b0a12b25941b5c0c3461ba29c","/site.assets/images:videos/VIDEOMANIFESTOGLAD.mp4":"07b9240d7a8133c85ff8b2ab64e5cf09d0049301b85ad08033f8fbcc52b17d96"***
2026-03-10T06:11:00.1951723Z [2026-03-10T06:11:00.194Z] <<< [apiv2][status] POST https://firebasehosting.googleapis.com/v1beta1/projects/350817205989/sites/***/versions/e85628c7080efba6:populateFiles 200
2026-03-10T06:11:00.1968833Z [2026-03-10T06:11:00.194Z] <<< [apiv2][body] POST https://firebasehosting.googleapis.com/v1beta1/projects/350817205989/sites/***/versions/e85628c7080efba6:populateFiles ***"uploadRequiredHashes":["e1f5c1969a839ca3560a405efd294d0956a8d6b2702500091ca8113e17790c2e","d113a0370c2373b8908699b1d32d45317b8de6a13a901588e389399a64ab5116","e8984726d3879c7010f4f0764cfcc6b2ddcfe5e964d9db0eee37129b0040c5f8","cb3d4c52375eab7f5de1d51c927205b922baf71fe96fd58b2897a5039d56c3e7","09d56cf27a1a6f59a2035755c05f3354aca9469730ccfcafcc854dc10180f001","6144f11cebe59ef3659afff0e55c9cfb1bcfd9d2ad3b89f0181547f99a5aa4fe","9998446ba87a3723a456442775e96d86590cfd15b82cc932129a5ec479b3cb0e","23dc60d61093a3567f4e2d798c17e82ddeb20dff45fdc18705ee1e246db8a37a","2099c324262a4adf853b3e23da738bc2e574de5e5fb62a558284f370e3293856","20d7efc2ae88ed4d5672d5e63ff5cea8fcade1f4e622974c273146ff7092f21b","72ca962038828a2e7b4fd07c87109e96146168016e1edb225e14f1e79d7f07d1","c0d95b7c12a1bae474834d7d89acea70a8513bdf89bc0e8b1524891a5943631b","be06b6267e15dfde7a38995beebc13a34aa37cf8e7dc4e085ffad6ceeabd4780","679eb40f2f24b7600dc3d9eb0179c951c756f6583f4dcdc7a3482cfba5987319","d208840b74e03e44687e7e249a975aa00a5c70298188ca4d5849748802a0ec17","b8ab0f3fd2d58c8f83f89208b1622a391ee05a18b24f26a726647a81f30ebb7b","6b583acfd5e4363e17131e4da52398c9b471b450dbf568379655cbe0ab3f3d11","e6036d1cc413665b7c7bb2874368261108534d82c50ee6e362b9a08cdf5e3a7e","0318fc504ecde236d4b437df132921409d82e083e0ef05dbb71de8c36bb63c16","ad8dcbff63a0e01988cf8d45758d42e79bbf6f396a121b718f5b9b0a1aa5039f","10bc3fe67d260f2c3fa600eee3e83868d74c74571c03b010823855d3e2c65769"],"uploadUrl":"https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files"***
2026-03-10T06:11:00.1981666Z [2026-03-10T06:11:00.195Z] No OAuth tokens found
2026-03-10T06:11:00.1982535Z [2026-03-10T06:11:00.195Z] No OAuth tokens found
2026-03-10T06:11:00.1983805Z [2026-03-10T06:11:00.196Z] No OAuth tokens found
2026-03-10T06:11:00.1984641Z [2026-03-10T06:11:00.196Z] No OAuth tokens found
2026-03-10T06:11:00.1985481Z [2026-03-10T06:11:00.196Z] No OAuth tokens found
2026-03-10T06:11:00.1986533Z [2026-03-10T06:11:00.196Z] No OAuth tokens found
2026-03-10T06:11:00.1987383Z [2026-03-10T06:11:00.196Z] No OAuth tokens found
2026-03-10T06:11:00.1988191Z [2026-03-10T06:11:00.197Z] No OAuth tokens found
2026-03-10T06:11:00.1989043Z [2026-03-10T06:11:00.197Z] No OAuth tokens found
2026-03-10T06:11:00.1989868Z [2026-03-10T06:11:00.197Z] No OAuth tokens found
2026-03-10T06:11:00.1990820Z [2026-03-10T06:11:00.197Z] No OAuth tokens found
2026-03-10T06:11:00.1991629Z [2026-03-10T06:11:00.198Z] No OAuth tokens found
2026-03-10T06:11:00.1992460Z [2026-03-10T06:11:00.198Z] No OAuth tokens found
2026-03-10T06:11:00.1993279Z [2026-03-10T06:11:00.198Z] No OAuth tokens found
2026-03-10T06:11:00.1994094Z [2026-03-10T06:11:00.198Z] No OAuth tokens found
2026-03-10T06:11:00.1994921Z [2026-03-10T06:11:00.198Z] No OAuth tokens found
2026-03-10T06:11:00.1995731Z [2026-03-10T06:11:00.199Z] No OAuth tokens found
2026-03-10T06:11:00.1996768Z [2026-03-10T06:11:00.199Z] No OAuth tokens found
2026-03-10T06:11:00.1997582Z [2026-03-10T06:11:00.199Z] No OAuth tokens found
2026-03-10T06:11:00.1998946Z [2026-03-10T06:11:00.199Z] No OAuth tokens found
2026-03-10T06:11:00.2001024Z [2026-03-10T06:11:00.199Z] No OAuth tokens found
2026-03-10T06:11:00.2005065Z [2026-03-10T06:11:00.200Z] >>> [apiv2][query] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/e1f5c1969a839ca3560a405efd294d0956a8d6b2702500091ca8113e17790c2e [none]
2026-03-10T06:11:00.2007222Z [2026-03-10T06:11:00.200Z] >>> [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/e1f5c1969a839ca3560a405efd294d0956a8d6b2702500091ca8113e17790c2e [stream]
2026-03-10T06:11:00.2022589Z [2026-03-10T06:11:00.201Z] >>> [apiv2][query] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/d113a0370c2373b8908699b1d32d45317b8de6a13a901588e389399a64ab5116 [none]
2026-03-10T06:11:00.2026105Z [2026-03-10T06:11:00.201Z] >>> [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/d113a0370c2373b8908699b1d32d45317b8de6a13a901588e389399a64ab5116 [stream]
2026-03-10T06:11:00.2030851Z [2026-03-10T06:11:00.202Z] >>> [apiv2][query] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/e8984726d3879c7010f4f0764cfcc6b2ddcfe5e964d9db0eee37129b0040c5f8 [none]
2026-03-10T06:11:00.2034352Z [2026-03-10T06:11:00.202Z] >>> [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/e8984726d3879c7010f4f0764cfcc6b2ddcfe5e964d9db0eee37129b0040c5f8 [stream]
2026-03-10T06:11:00.2038941Z [2026-03-10T06:11:00.203Z] >>> [apiv2][query] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/cb3d4c52375eab7f5de1d51c927205b922baf71fe96fd58b2897a5039d56c3e7 [none]
2026-03-10T06:11:00.2042482Z [2026-03-10T06:11:00.203Z] >>> [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/cb3d4c52375eab7f5de1d51c927205b922baf71fe96fd58b2897a5039d56c3e7 [stream]
2026-03-10T06:11:00.2048118Z [2026-03-10T06:11:00.204Z] >>> [apiv2][query] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/09d56cf27a1a6f59a2035755c05f3354aca9469730ccfcafcc854dc10180f001 [none]
2026-03-10T06:11:00.2051655Z [2026-03-10T06:11:00.204Z] >>> [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/09d56cf27a1a6f59a2035755c05f3354aca9469730ccfcafcc854dc10180f001 [stream]
2026-03-10T06:11:00.2055914Z [2026-03-10T06:11:00.205Z] >>> [apiv2][query] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/6144f11cebe59ef3659afff0e55c9cfb1bcfd9d2ad3b89f0181547f99a5aa4fe [none]
2026-03-10T06:11:00.2060060Z [2026-03-10T06:11:00.205Z] >>> [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/6144f11cebe59ef3659afff0e55c9cfb1bcfd9d2ad3b89f0181547f99a5aa4fe [stream]
2026-03-10T06:11:00.2065305Z [2026-03-10T06:11:00.206Z] >>> [apiv2][query] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/9998446ba87a3723a456442775e96d86590cfd15b82cc932129a5ec479b3cb0e [none]
2026-03-10T06:11:00.2070707Z [2026-03-10T06:11:00.206Z] >>> [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/9998446ba87a3723a456442775e96d86590cfd15b82cc932129a5ec479b3cb0e [stream]
2026-03-10T06:11:00.2074475Z [2026-03-10T06:11:00.206Z] >>> [apiv2][query] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/23dc60d61093a3567f4e2d798c17e82ddeb20dff45fdc18705ee1e246db8a37a [none]
2026-03-10T06:11:00.2078284Z [2026-03-10T06:11:00.207Z] >>> [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/23dc60d61093a3567f4e2d798c17e82ddeb20dff45fdc18705ee1e246db8a37a [stream]
2026-03-10T06:11:00.2082123Z [2026-03-10T06:11:00.207Z] >>> [apiv2][query] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/2099c324262a4adf853b3e23da738bc2e574de5e5fb62a558284f370e3293856 [none]
2026-03-10T06:11:00.2085653Z [2026-03-10T06:11:00.207Z] >>> [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/2099c324262a4adf853b3e23da738bc2e574de5e5fb62a558284f370e3293856 [stream]
2026-03-10T06:11:00.2089530Z [2026-03-10T06:11:00.208Z] >>> [apiv2][query] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/20d7efc2ae88ed4d5672d5e63ff5cea8fcade1f4e622974c273146ff7092f21b [none]
2026-03-10T06:11:00.2093094Z [2026-03-10T06:11:00.208Z] >>> [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/20d7efc2ae88ed4d5672d5e63ff5cea8fcade1f4e622974c273146ff7092f21b [stream]
2026-03-10T06:11:00.2096962Z [2026-03-10T06:11:00.209Z] >>> [apiv2][query] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/72ca962038828a2e7b4fd07c87109e96146168016e1edb225e14f1e79d7f07d1 [none]
2026-03-10T06:11:00.2100470Z [2026-03-10T06:11:00.209Z] >>> [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/72ca962038828a2e7b4fd07c87109e96146168016e1edb225e14f1e79d7f07d1 [stream]
2026-03-10T06:11:00.2104555Z [2026-03-10T06:11:00.210Z] >>> [apiv2][query] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/c0d95b7c12a1bae474834d7d89acea70a8513bdf89bc0e8b1524891a5943631b [none]
2026-03-10T06:11:00.2108364Z [2026-03-10T06:11:00.210Z] >>> [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/c0d95b7c12a1bae474834d7d89acea70a8513bdf89bc0e8b1524891a5943631b [stream]
2026-03-10T06:11:00.2112821Z [2026-03-10T06:11:00.210Z] >>> [apiv2][query] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/be06b6267e15dfde7a38995beebc13a34aa37cf8e7dc4e085ffad6ceeabd4780 [none]
2026-03-10T06:11:00.2116672Z [2026-03-10T06:11:00.211Z] >>> [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/be06b6267e15dfde7a38995beebc13a34aa37cf8e7dc4e085ffad6ceeabd4780 [stream]
2026-03-10T06:11:00.2121019Z [2026-03-10T06:11:00.211Z] >>> [apiv2][query] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/679eb40f2f24b7600dc3d9eb0179c951c756f6583f4dcdc7a3482cfba5987319 [none]
2026-03-10T06:11:00.2124566Z [2026-03-10T06:11:00.211Z] >>> [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/679eb40f2f24b7600dc3d9eb0179c951c756f6583f4dcdc7a3482cfba5987319 [stream]
2026-03-10T06:11:00.2129261Z [2026-03-10T06:11:00.212Z] >>> [apiv2][query] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/d208840b74e03e44687e7e249a975aa00a5c70298188ca4d5849748802a0ec17 [none]
2026-03-10T06:11:00.2132779Z [2026-03-10T06:11:00.212Z] >>> [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/d208840b74e03e44687e7e249a975aa00a5c70298188ca4d5849748802a0ec17 [stream]
2026-03-10T06:11:00.2137174Z [2026-03-10T06:11:00.213Z] >>> [apiv2][query] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/b8ab0f3fd2d58c8f83f89208b1622a391ee05a18b24f26a726647a81f30ebb7b [none]
2026-03-10T06:11:00.2140702Z [2026-03-10T06:11:00.213Z] >>> [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/b8ab0f3fd2d58c8f83f89208b1622a391ee05a18b24f26a726647a81f30ebb7b [stream]
2026-03-10T06:11:00.2144879Z [2026-03-10T06:11:00.214Z] >>> [apiv2][query] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/6b583acfd5e4363e17131e4da52398c9b471b450dbf568379655cbe0ab3f3d11 [none]
2026-03-10T06:11:00.2148910Z [2026-03-10T06:11:00.214Z] >>> [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/6b583acfd5e4363e17131e4da52398c9b471b450dbf568379655cbe0ab3f3d11 [stream]
2026-03-10T06:11:00.2153300Z [2026-03-10T06:11:00.215Z] >>> [apiv2][query] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/e6036d1cc413665b7c7bb2874368261108534d82c50ee6e362b9a08cdf5e3a7e [none]
2026-03-10T06:11:00.2157031Z [2026-03-10T06:11:00.215Z] >>> [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/e6036d1cc413665b7c7bb2874368261108534d82c50ee6e362b9a08cdf5e3a7e [stream]
2026-03-10T06:11:00.2161637Z [2026-03-10T06:11:00.215Z] >>> [apiv2][query] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/0318fc504ecde236d4b437df132921409d82e083e0ef05dbb71de8c36bb63c16 [none]
2026-03-10T06:11:00.2165191Z [2026-03-10T06:11:00.215Z] >>> [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/0318fc504ecde236d4b437df132921409d82e083e0ef05dbb71de8c36bb63c16 [stream]
2026-03-10T06:11:00.2170845Z [2026-03-10T06:11:00.216Z] >>> [apiv2][query] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/ad8dcbff63a0e01988cf8d45758d42e79bbf6f396a121b718f5b9b0a1aa5039f [none]
2026-03-10T06:11:00.2174412Z [2026-03-10T06:11:00.216Z] >>> [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/ad8dcbff63a0e01988cf8d45758d42e79bbf6f396a121b718f5b9b0a1aa5039f [stream]
2026-03-10T06:11:00.2178712Z [2026-03-10T06:11:00.217Z] >>> [apiv2][query] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/10bc3fe67d260f2c3fa600eee3e83868d74c74571c03b010823855d3e2c65769 [none]
2026-03-10T06:11:00.2182263Z [2026-03-10T06:11:00.217Z] >>> [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/10bc3fe67d260f2c3fa600eee3e83868d74c74571c03b010823855d3e2c65769 [stream]
2026-03-10T06:11:00.2187243Z [2026-03-10T06:11:00.218Z] [hosting][populate queue][FINAL] ***"max":754,"min":754,"avg":754,"active":0,"complete":1,"success":1,"errored":0,"retried":0,"total":1,"elapsed":772***
2026-03-10T06:11:00.2188649Z [2026-03-10T06:11:00.218Z] [hosting] uploads queued: 21
2026-03-10T06:11:00.4390921Z i  hosting: uploading new files [0/21] (0%) 
2026-03-10T06:11:00.8278704Z [2026-03-10T06:11:00.827Z] <<< [apiv2][status] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/09d56cf27a1a6f59a2035755c05f3354aca9469730ccfcafcc854dc10180f001 200
2026-03-10T06:11:00.8281119Z [2026-03-10T06:11:00.827Z] <<< [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/09d56cf27a1a6f59a2035755c05f3354aca9469730ccfcafcc854dc10180f001 [stream]
2026-03-10T06:11:00.8403734Z [2026-03-10T06:11:00.839Z] <<< [apiv2][status] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/10bc3fe67d260f2c3fa600eee3e83868d74c74571c03b010823855d3e2c65769 200
2026-03-10T06:11:00.8406250Z [2026-03-10T06:11:00.840Z] <<< [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/10bc3fe67d260f2c3fa600eee3e83868d74c74571c03b010823855d3e2c65769 [stream]
2026-03-10T06:11:00.8538839Z [2026-03-10T06:11:00.853Z] <<< [apiv2][status] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/20d7efc2ae88ed4d5672d5e63ff5cea8fcade1f4e622974c273146ff7092f21b 200
2026-03-10T06:11:00.8541228Z [2026-03-10T06:11:00.853Z] <<< [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/20d7efc2ae88ed4d5672d5e63ff5cea8fcade1f4e622974c273146ff7092f21b [stream]
2026-03-10T06:11:00.8667611Z [2026-03-10T06:11:00.866Z] <<< [apiv2][status] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/ad8dcbff63a0e01988cf8d45758d42e79bbf6f396a121b718f5b9b0a1aa5039f 200
2026-03-10T06:11:00.8670223Z [2026-03-10T06:11:00.866Z] <<< [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/ad8dcbff63a0e01988cf8d45758d42e79bbf6f396a121b718f5b9b0a1aa5039f [stream]
2026-03-10T06:11:00.8830154Z [2026-03-10T06:11:00.882Z] <<< [apiv2][status] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/0318fc504ecde236d4b437df132921409d82e083e0ef05dbb71de8c36bb63c16 200
2026-03-10T06:11:00.8832457Z [2026-03-10T06:11:00.882Z] <<< [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/0318fc504ecde236d4b437df132921409d82e083e0ef05dbb71de8c36bb63c16 [stream]
2026-03-10T06:11:00.8958108Z [2026-03-10T06:11:00.895Z] <<< [apiv2][status] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/e1f5c1969a839ca3560a405efd294d0956a8d6b2702500091ca8113e17790c2e 200
2026-03-10T06:11:00.8960520Z [2026-03-10T06:11:00.895Z] <<< [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/e1f5c1969a839ca3560a405efd294d0956a8d6b2702500091ca8113e17790c2e [stream]
2026-03-10T06:11:00.9450784Z [2026-03-10T06:11:00.944Z] <<< [apiv2][status] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/6b583acfd5e4363e17131e4da52398c9b471b450dbf568379655cbe0ab3f3d11 200
2026-03-10T06:11:00.9453268Z [2026-03-10T06:11:00.944Z] <<< [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/6b583acfd5e4363e17131e4da52398c9b471b450dbf568379655cbe0ab3f3d11 [stream]
2026-03-10T06:11:00.9463954Z [2026-03-10T06:11:00.946Z] <<< [apiv2][status] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/9998446ba87a3723a456442775e96d86590cfd15b82cc932129a5ec479b3cb0e 200
2026-03-10T06:11:00.9465882Z [2026-03-10T06:11:00.946Z] <<< [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/9998446ba87a3723a456442775e96d86590cfd15b82cc932129a5ec479b3cb0e [stream]
2026-03-10T06:11:00.9643595Z [2026-03-10T06:11:00.963Z] <<< [apiv2][status] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/679eb40f2f24b7600dc3d9eb0179c951c756f6583f4dcdc7a3482cfba5987319 200
2026-03-10T06:11:00.9645810Z [2026-03-10T06:11:00.964Z] <<< [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/679eb40f2f24b7600dc3d9eb0179c951c756f6583f4dcdc7a3482cfba5987319 [stream]
2026-03-10T06:11:00.9928631Z [2026-03-10T06:11:00.992Z] <<< [apiv2][status] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/6144f11cebe59ef3659afff0e55c9cfb1bcfd9d2ad3b89f0181547f99a5aa4fe 200
2026-03-10T06:11:00.9931544Z [2026-03-10T06:11:00.992Z] <<< [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/6144f11cebe59ef3659afff0e55c9cfb1bcfd9d2ad3b89f0181547f99a5aa4fe [stream]
2026-03-10T06:11:01.0008699Z [2026-03-10T06:11:01.000Z] <<< [apiv2][status] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/e8984726d3879c7010f4f0764cfcc6b2ddcfe5e964d9db0eee37129b0040c5f8 200
2026-03-10T06:11:01.0011411Z [2026-03-10T06:11:01.000Z] <<< [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/e8984726d3879c7010f4f0764cfcc6b2ddcfe5e964d9db0eee37129b0040c5f8 [stream]
2026-03-10T06:11:01.0240014Z [2026-03-10T06:11:01.023Z] <<< [apiv2][status] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/d208840b74e03e44687e7e249a975aa00a5c70298188ca4d5849748802a0ec17 200
2026-03-10T06:11:01.0242168Z [2026-03-10T06:11:01.023Z] <<< [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/d208840b74e03e44687e7e249a975aa00a5c70298188ca4d5849748802a0ec17 [stream]
2026-03-10T06:11:01.0250610Z [2026-03-10T06:11:01.024Z] <<< [apiv2][status] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/cb3d4c52375eab7f5de1d51c927205b922baf71fe96fd58b2897a5039d56c3e7 200
2026-03-10T06:11:01.0252598Z [2026-03-10T06:11:01.024Z] <<< [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/cb3d4c52375eab7f5de1d51c927205b922baf71fe96fd58b2897a5039d56c3e7 [stream]
2026-03-10T06:11:01.0369973Z [2026-03-10T06:11:01.036Z] <<< [apiv2][status] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/d113a0370c2373b8908699b1d32d45317b8de6a13a901588e389399a64ab5116 200
2026-03-10T06:11:01.0372416Z [2026-03-10T06:11:01.036Z] <<< [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/d113a0370c2373b8908699b1d32d45317b8de6a13a901588e389399a64ab5116 [stream]
2026-03-10T06:11:01.0837354Z [2026-03-10T06:11:01.083Z] <<< [apiv2][status] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/be06b6267e15dfde7a38995beebc13a34aa37cf8e7dc4e085ffad6ceeabd4780 200
2026-03-10T06:11:01.0839552Z [2026-03-10T06:11:01.083Z] <<< [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/be06b6267e15dfde7a38995beebc13a34aa37cf8e7dc4e085ffad6ceeabd4780 [stream]
2026-03-10T06:11:01.0983563Z [2026-03-10T06:11:01.097Z] <<< [apiv2][status] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/b8ab0f3fd2d58c8f83f89208b1622a391ee05a18b24f26a726647a81f30ebb7b 200
2026-03-10T06:11:01.0985931Z [2026-03-10T06:11:01.098Z] <<< [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/b8ab0f3fd2d58c8f83f89208b1622a391ee05a18b24f26a726647a81f30ebb7b [stream]
2026-03-10T06:11:01.1787364Z [2026-03-10T06:11:01.178Z] <<< [apiv2][status] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/e6036d1cc413665b7c7bb2874368261108534d82c50ee6e362b9a08cdf5e3a7e 200
2026-03-10T06:11:01.1789398Z [2026-03-10T06:11:01.178Z] <<< [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/e6036d1cc413665b7c7bb2874368261108534d82c50ee6e362b9a08cdf5e3a7e [stream]
2026-03-10T06:11:01.1843705Z [2026-03-10T06:11:01.184Z] <<< [apiv2][status] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/72ca962038828a2e7b4fd07c87109e96146168016e1edb225e14f1e79d7f07d1 200
2026-03-10T06:11:01.1845721Z [2026-03-10T06:11:01.184Z] <<< [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/72ca962038828a2e7b4fd07c87109e96146168016e1edb225e14f1e79d7f07d1 [stream]
2026-03-10T06:11:01.1951769Z [2026-03-10T06:11:01.194Z] <<< [apiv2][status] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/c0d95b7c12a1bae474834d7d89acea70a8513bdf89bc0e8b1524891a5943631b 200
2026-03-10T06:11:01.1953754Z [2026-03-10T06:11:01.194Z] <<< [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/c0d95b7c12a1bae474834d7d89acea70a8513bdf89bc0e8b1524891a5943631b [stream]
2026-03-10T06:11:01.2728745Z [2026-03-10T06:11:01.272Z] <<< [apiv2][status] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/23dc60d61093a3567f4e2d798c17e82ddeb20dff45fdc18705ee1e246db8a37a 200
2026-03-10T06:11:01.2731009Z [2026-03-10T06:11:01.272Z] <<< [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/23dc60d61093a3567f4e2d798c17e82ddeb20dff45fdc18705ee1e246db8a37a [stream]
2026-03-10T06:11:01.3044324Z [2026-03-10T06:11:01.303Z] <<< [apiv2][status] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/2099c324262a4adf853b3e23da738bc2e574de5e5fb62a558284f370e3293856 200
2026-03-10T06:11:01.3049384Z [2026-03-10T06:11:01.304Z] <<< [apiv2][body] POST https://upload-firebasehosting.googleapis.com/upload/sites/***/versions/e85628c7080efba6/files/2099c324262a4adf853b3e23da738bc2e574de5e5fb62a558284f370e3293856 [stream]
2026-03-10T06:11:01.3052357Z [2026-03-10T06:11:01.304Z] [hosting][upload queue][FINAL] ***"max":1107,"min":631,"avg":822.2380952380952,"active":0,"complete":21,"success":21,"errored":0,"retried":0,"total":21,"elapsed":1109***
2026-03-10T06:11:01.3053831Z i  hosting: upload complete 
2026-03-10T06:11:01.3055033Z ✔  hosting[***]: file upload complete 
2026-03-10T06:11:01.3055965Z [2026-03-10T06:11:01.304Z] [hosting] deploy completed after 2911ms
2026-03-10T06:11:01.3071733Z i  functions: updating Node.js 20 (2nd Gen) function heartbeat(us-central1)... 
2026-03-10T06:11:01.3083419Z i  functions: updating Node.js 20 (2nd Gen) function firebase-frameworks-***:ssrportfoliodanilonovai(us-central1)... 
2026-03-10T06:11:01.3089586Z [2026-03-10T06:11:01.308Z] No OAuth tokens found
2026-03-10T06:11:01.3091497Z [2026-03-10T06:11:01.309Z] No OAuth tokens found
2026-03-10T06:11:01.3102854Z [2026-03-10T06:11:01.309Z] >>> [apiv2][query] PATCH https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/functions/heartbeat updateMask=name%2CbuildConfig.runtime%2CbuildConfig.entryPoint%2CbuildConfig.source.storageSource.bucket%2CbuildConfig.source.storageSource.object%2CbuildConfig.environmentVariables%2CbuildConfig.sourceToken%2CserviceConfig.environmentVariables%2CserviceConfig.ingressSettings%2CserviceConfig.timeoutSeconds%2CserviceConfig.serviceAccountEmail%2CserviceConfig.availableMemory%2CserviceConfig.minInstanceCount%2CserviceConfig.maxInstanceCount%2CserviceConfig.maxInstanceRequestConcurrency%2CserviceConfig.availableCpu%2CserviceConfig.vpcConnector%2CserviceConfig.vpcConnectorEgressSettings%2Clabels
2026-03-10T06:11:01.3119678Z [2026-03-10T06:11:01.309Z] >>> [apiv2][body] PATCH https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/functions/heartbeat ***"name":"projects/***/locations/us-central1/functions/heartbeat","buildConfig":***"runtime":"nodejs20","entryPoint":"heartbeat","source":***"storageSource":***"bucket":"gcf-v2-uploads-350817205989.us-central1.cloudfunctions.appspot.com","object":"b01965c3-b993-43f8-bdbe-c408d0eec510.zip"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"serviceConfig":***"environmentVariables":***"FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/heartbeat","FUNCTION_TARGET":"heartbeat","LOG_EXECUTION_ID":"true"***,"ingressSettings":null,"timeoutSeconds":null,"serviceAccountEmail":null,"availableMemory":"256Mi","minInstanceCount":null,"maxInstanceCount":10,"maxInstanceRequestConcurrency":80,"availableCpu":"1","vpcConnector":null,"vpcConnectorEgressSettings":null***,"labels":***"deployment-tool":"cli-firebase","firebase-functions-hash":"03dad288abdddb3db1ad90b736c8009efc4c3cdc"***
2026-03-10T06:11:01.3134272Z [2026-03-10T06:11:01.311Z] >>> [apiv2][query] PATCH https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/functions/ssrportfoliodanilonovai updateMask=name%2CbuildConfig.runtime%2CbuildConfig.entryPoint%2CbuildConfig.source.storageSource.bucket%2CbuildConfig.source.storageSource.object%2CbuildConfig.environmentVariables%2CbuildConfig.sourceToken%2CserviceConfig.environmentVariables%2CserviceConfig.ingressSettings%2CserviceConfig.timeoutSeconds%2CserviceConfig.serviceAccountEmail%2CserviceConfig.availableMemory%2CserviceConfig.minInstanceCount%2CserviceConfig.maxInstanceCount%2CserviceConfig.maxInstanceRequestConcurrency%2CserviceConfig.availableCpu%2CserviceConfig.vpcConnector%2CserviceConfig.vpcConnectorEgressSettings%2Clabels
2026-03-10T06:11:01.3150369Z [2026-03-10T06:11:01.311Z] >>> [apiv2][body] PATCH https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/functions/ssrportfoliodanilonovai ***"name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-uploads-350817205989.us-central1.cloudfunctions.appspot.com","object":"6f2a1c09-016b-46e6-a4a8-41365c7703b8.zip"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"serviceConfig":***"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":null,"timeoutSeconds":null,"serviceAccountEmail":null,"availableMemory":"256Mi","minInstanceCount":null,"maxInstanceCount":null,"maxInstanceRequestConcurrency":80,"availableCpu":"1","vpcConnector":null,"vpcConnectorEgressSettings":null***,"labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***
2026-03-10T06:11:02.4830643Z [2026-03-10T06:11:02.482Z] <<< [apiv2][status] PATCH https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/functions/ssrportfoliodanilonovai 200
2026-03-10T06:11:02.4836608Z [2026-03-10T06:11:02.482Z] <<< [apiv2][body] PATCH https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/functions/ssrportfoliodanilonovai ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2"***,"done":false***
2026-03-10T06:11:02.4840049Z [2026-03-10T06:11:02.483Z] No OAuth tokens found
2026-03-10T06:11:02.4841507Z [2026-03-10T06:11:02.483Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:11:02.4942764Z [2026-03-10T06:11:02.493Z] <<< [apiv2][status] PATCH https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/functions/heartbeat 200
2026-03-10T06:11:02.4947594Z [2026-03-10T06:11:02.494Z] <<< [apiv2][body] PATCH https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/functions/heartbeat ***"name":"projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.441712131Z","target":"projects/***/locations/us-central1/functions/heartbeat","verb":"update","cancelRequested":false,"apiVersion":"v2"***,"done":false***
2026-03-10T06:11:02.4949937Z [2026-03-10T06:11:02.494Z] No OAuth tokens found
2026-03-10T06:11:02.4951388Z [2026-03-10T06:11:02.494Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 [none]
2026-03-10T06:11:02.6442099Z [2026-03-10T06:11:02.643Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 200
2026-03-10T06:11:02.6458141Z [2026-03-10T06:11:02.643Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 ***"name":"projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.441712131Z","target":"projects/***/locations/us-central1/functions/heartbeat","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/heartbeat","buildConfig":***"runtime":"nodejs20","entryPoint":"heartbeat","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1773123062348911"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1772954153655356"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/heartbeat","timeoutSeconds":60,"environmentVariables":***"FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/heartbeat","FUNCTION_TARGET":"heartbeat","LOG_EXECUTION_ID":"true"***,"maxInstanceCount":10,"ingressSettings":"ALLOW_ALL","uri":"https://heartbeat-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"heartbeat-00009-tot","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-hash":"03dad288abdddb3db1ad90b736c8009efc4c3cdc"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/heartbeat","satisfiesPzi":true***,"stages":[***"name":"BUILD","state":"NOT_STARTED","stateMessages":[***"severity":"WARNING","type":"BuildAnalysisWarning","message":"Node.js 20 is no longer supported by the Node.js community as of 30 April, 2026. Node.js 20 will be deprecated on 2026-04-30. We recommend you to upgrade to the latest version of Node.js as soon as possible."***]***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION"***,"done":false***
2026-03-10T06:11:02.7947714Z [2026-03-10T06:11:02.794Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:11:02.7966849Z [2026-03-10T06:11:02.794Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","state":"NOT_STARTED","stateMessages":[***"severity":"WARNING","type":"BuildAnalysisWarning","message":"Node.js 20 is no longer supported by the Node.js community as of 30 April, 2026. Node.js 20 will be deprecated on 2026-04-30. We recommend you to upgrade to the latest version of Node.js as soon as possible."***]***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION"***,"done":false***
2026-03-10T06:11:03.1449822Z [2026-03-10T06:11:03.144Z] [update-default-us-central1-heartbeat] Retrying task index 0
2026-03-10T06:11:03.1451423Z [2026-03-10T06:11:03.144Z] No OAuth tokens found
2026-03-10T06:11:03.1454899Z [2026-03-10T06:11:03.145Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 [none]
2026-03-10T06:11:03.2956226Z [2026-03-10T06:11:03.295Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:11:03.2957967Z [2026-03-10T06:11:03.295Z] No OAuth tokens found
2026-03-10T06:11:03.2960174Z [2026-03-10T06:11:03.295Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:11:03.3806662Z [2026-03-10T06:11:03.380Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:11:03.3825899Z [2026-03-10T06:11:03.380Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Creating build","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:11:03.4562596Z [2026-03-10T06:11:03.455Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 200
2026-03-10T06:11:03.4578174Z [2026-03-10T06:11:03.456Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 ***"name":"projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.441712131Z","target":"projects/***/locations/us-central1/functions/heartbeat","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/heartbeat","buildConfig":***"runtime":"nodejs20","entryPoint":"heartbeat","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1773123062348911"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1772954153655356"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/heartbeat","timeoutSeconds":60,"environmentVariables":***"FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/heartbeat","FUNCTION_TARGET":"heartbeat","LOG_EXECUTION_ID":"true"***,"maxInstanceCount":10,"ingressSettings":"ALLOW_ALL","uri":"https://heartbeat-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"heartbeat-00009-tot","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-hash":"03dad288abdddb3db1ad90b736c8009efc4c3cdc"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/heartbeat","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Creating build","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/18612a3a-5248-41d1-a4d9-0cb39bb693bc","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/18612a3a-5248-41d1-a4d9-0cb39bb693bc?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/18612a3a-5248-41d1-a4d9-0cb39bb693bc"***,"done":false***
2026-03-10T06:11:04.3814700Z [2026-03-10T06:11:04.380Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:11:04.3816260Z [2026-03-10T06:11:04.381Z] No OAuth tokens found
2026-03-10T06:11:04.3818931Z [2026-03-10T06:11:04.381Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:11:04.4565630Z [2026-03-10T06:11:04.456Z] [update-default-us-central1-heartbeat] Retrying task index 0
2026-03-10T06:11:04.4567402Z [2026-03-10T06:11:04.456Z] No OAuth tokens found
2026-03-10T06:11:04.4569632Z [2026-03-10T06:11:04.456Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 [none]
2026-03-10T06:11:04.4910597Z [2026-03-10T06:11:04.490Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:11:04.4930907Z [2026-03-10T06:11:04.490Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:11:04.5927419Z [2026-03-10T06:11:04.592Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 200
2026-03-10T06:11:04.5944831Z [2026-03-10T06:11:04.592Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 ***"name":"projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.441712131Z","target":"projects/***/locations/us-central1/functions/heartbeat","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/heartbeat","buildConfig":***"runtime":"nodejs20","entryPoint":"heartbeat","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1773123062348911"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1772954153655356"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/heartbeat","timeoutSeconds":60,"environmentVariables":***"FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/heartbeat","FUNCTION_TARGET":"heartbeat","LOG_EXECUTION_ID":"true"***,"maxInstanceCount":10,"ingressSettings":"ALLOW_ALL","uri":"https://heartbeat-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"heartbeat-00009-tot","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-hash":"03dad288abdddb3db1ad90b736c8009efc4c3cdc"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/heartbeat","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/18612a3a-5248-41d1-a4d9-0cb39bb693bc","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/18612a3a-5248-41d1-a4d9-0cb39bb693bc?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/18612a3a-5248-41d1-a4d9-0cb39bb693bc"***,"done":false***
2026-03-10T06:11:06.4918763Z [2026-03-10T06:11:06.491Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:11:06.4920528Z [2026-03-10T06:11:06.491Z] No OAuth tokens found
2026-03-10T06:11:06.4923765Z [2026-03-10T06:11:06.491Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:11:06.5931796Z [2026-03-10T06:11:06.592Z] [update-default-us-central1-heartbeat] Retrying task index 0
2026-03-10T06:11:06.5933361Z [2026-03-10T06:11:06.593Z] No OAuth tokens found
2026-03-10T06:11:06.5936586Z [2026-03-10T06:11:06.593Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 [none]
2026-03-10T06:11:06.6683280Z [2026-03-10T06:11:06.668Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 200
2026-03-10T06:11:06.6700205Z [2026-03-10T06:11:06.668Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 ***"name":"projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.441712131Z","target":"projects/***/locations/us-central1/functions/heartbeat","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/heartbeat","buildConfig":***"runtime":"nodejs20","entryPoint":"heartbeat","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1773123062348911"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1772954153655356"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/heartbeat","timeoutSeconds":60,"environmentVariables":***"FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/heartbeat","FUNCTION_TARGET":"heartbeat","LOG_EXECUTION_ID":"true"***,"maxInstanceCount":10,"ingressSettings":"ALLOW_ALL","uri":"https://heartbeat-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"heartbeat-00009-tot","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-hash":"03dad288abdddb3db1ad90b736c8009efc4c3cdc"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/heartbeat","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/18612a3a-5248-41d1-a4d9-0cb39bb693bc","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/18612a3a-5248-41d1-a4d9-0cb39bb693bc?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/18612a3a-5248-41d1-a4d9-0cb39bb693bc"***,"done":false***
2026-03-10T06:11:06.7687216Z [2026-03-10T06:11:06.768Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:11:06.7707466Z [2026-03-10T06:11:06.768Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:11:10.6698883Z [2026-03-10T06:11:10.669Z] [update-default-us-central1-heartbeat] Retrying task index 0
2026-03-10T06:11:10.6704289Z [2026-03-10T06:11:10.670Z] No OAuth tokens found
2026-03-10T06:11:10.6707795Z [2026-03-10T06:11:10.670Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 [none]
2026-03-10T06:11:10.7692158Z [2026-03-10T06:11:10.768Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:11:10.7694008Z [2026-03-10T06:11:10.769Z] No OAuth tokens found
2026-03-10T06:11:10.7697408Z [2026-03-10T06:11:10.769Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:11:10.7736658Z [2026-03-10T06:11:10.773Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 200
2026-03-10T06:11:10.7752561Z [2026-03-10T06:11:10.773Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 ***"name":"projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.441712131Z","target":"projects/***/locations/us-central1/functions/heartbeat","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/heartbeat","buildConfig":***"runtime":"nodejs20","entryPoint":"heartbeat","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1773123062348911"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1772954153655356"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/heartbeat","timeoutSeconds":60,"environmentVariables":***"FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/heartbeat","FUNCTION_TARGET":"heartbeat","LOG_EXECUTION_ID":"true"***,"maxInstanceCount":10,"ingressSettings":"ALLOW_ALL","uri":"https://heartbeat-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"heartbeat-00009-tot","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-hash":"03dad288abdddb3db1ad90b736c8009efc4c3cdc"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/heartbeat","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/18612a3a-5248-41d1-a4d9-0cb39bb693bc","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/18612a3a-5248-41d1-a4d9-0cb39bb693bc?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/18612a3a-5248-41d1-a4d9-0cb39bb693bc"***,"done":false***
2026-03-10T06:11:10.8694619Z [2026-03-10T06:11:10.869Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:11:10.8714744Z [2026-03-10T06:11:10.869Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:11:18.7744120Z [2026-03-10T06:11:18.773Z] [update-default-us-central1-heartbeat] Retrying task index 0
2026-03-10T06:11:18.7746084Z [2026-03-10T06:11:18.774Z] No OAuth tokens found
2026-03-10T06:11:18.7749256Z [2026-03-10T06:11:18.774Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 [none]
2026-03-10T06:11:18.8693361Z [2026-03-10T06:11:18.869Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:11:18.8694799Z [2026-03-10T06:11:18.869Z] No OAuth tokens found
2026-03-10T06:11:18.8697171Z [2026-03-10T06:11:18.869Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:11:19.0024977Z [2026-03-10T06:11:19.002Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:11:19.0046541Z [2026-03-10T06:11:19.002Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:11:19.0839409Z [2026-03-10T06:11:19.083Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 200
2026-03-10T06:11:19.0856156Z [2026-03-10T06:11:19.083Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 ***"name":"projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.441712131Z","target":"projects/***/locations/us-central1/functions/heartbeat","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/heartbeat","buildConfig":***"runtime":"nodejs20","entryPoint":"heartbeat","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1773123062348911"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1772954153655356"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/heartbeat","timeoutSeconds":60,"environmentVariables":***"FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/heartbeat","FUNCTION_TARGET":"heartbeat","LOG_EXECUTION_ID":"true"***,"maxInstanceCount":10,"ingressSettings":"ALLOW_ALL","uri":"https://heartbeat-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"heartbeat-00009-tot","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-hash":"03dad288abdddb3db1ad90b736c8009efc4c3cdc"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/heartbeat","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/18612a3a-5248-41d1-a4d9-0cb39bb693bc","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/18612a3a-5248-41d1-a4d9-0cb39bb693bc?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/18612a3a-5248-41d1-a4d9-0cb39bb693bc"***,"done":false***
2026-03-10T06:11:29.0024238Z [2026-03-10T06:11:29.001Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:11:29.0026773Z [2026-03-10T06:11:29.002Z] No OAuth tokens found
2026-03-10T06:11:29.0029048Z [2026-03-10T06:11:29.002Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:11:29.0844984Z [2026-03-10T06:11:29.084Z] [update-default-us-central1-heartbeat] Retrying task index 0
2026-03-10T06:11:29.0847308Z [2026-03-10T06:11:29.084Z] No OAuth tokens found
2026-03-10T06:11:29.0849650Z [2026-03-10T06:11:29.084Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 [none]
2026-03-10T06:11:29.1261343Z [2026-03-10T06:11:29.125Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:11:29.1283566Z [2026-03-10T06:11:29.125Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:11:29.1992234Z [2026-03-10T06:11:29.198Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 200
2026-03-10T06:11:29.2008834Z [2026-03-10T06:11:29.199Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 ***"name":"projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.441712131Z","target":"projects/***/locations/us-central1/functions/heartbeat","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/heartbeat","buildConfig":***"runtime":"nodejs20","entryPoint":"heartbeat","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1773123062348911"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1772954153655356"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/heartbeat","timeoutSeconds":60,"environmentVariables":***"FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/heartbeat","FUNCTION_TARGET":"heartbeat","LOG_EXECUTION_ID":"true"***,"maxInstanceCount":10,"ingressSettings":"ALLOW_ALL","uri":"https://heartbeat-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"heartbeat-00009-tot","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-hash":"03dad288abdddb3db1ad90b736c8009efc4c3cdc"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/heartbeat","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/18612a3a-5248-41d1-a4d9-0cb39bb693bc","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/18612a3a-5248-41d1-a4d9-0cb39bb693bc?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/18612a3a-5248-41d1-a4d9-0cb39bb693bc"***,"done":false***
2026-03-10T06:11:39.1268127Z [2026-03-10T06:11:39.126Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:11:39.1270004Z [2026-03-10T06:11:39.126Z] No OAuth tokens found
2026-03-10T06:11:39.1273091Z [2026-03-10T06:11:39.126Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:11:39.1995070Z [2026-03-10T06:11:39.199Z] [update-default-us-central1-heartbeat] Retrying task index 0
2026-03-10T06:11:39.1996876Z [2026-03-10T06:11:39.199Z] No OAuth tokens found
2026-03-10T06:11:39.1999723Z [2026-03-10T06:11:39.199Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 [none]
2026-03-10T06:11:39.4441623Z [2026-03-10T06:11:39.443Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:11:39.4463870Z [2026-03-10T06:11:39.443Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:11:39.5286051Z [2026-03-10T06:11:39.528Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 200
2026-03-10T06:11:39.5301851Z [2026-03-10T06:11:39.528Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 ***"name":"projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.441712131Z","target":"projects/***/locations/us-central1/functions/heartbeat","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/heartbeat","buildConfig":***"runtime":"nodejs20","entryPoint":"heartbeat","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1773123062348911"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1772954153655356"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/heartbeat","timeoutSeconds":60,"environmentVariables":***"FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/heartbeat","FUNCTION_TARGET":"heartbeat","LOG_EXECUTION_ID":"true"***,"maxInstanceCount":10,"ingressSettings":"ALLOW_ALL","uri":"https://heartbeat-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"heartbeat-00009-tot","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-hash":"03dad288abdddb3db1ad90b736c8009efc4c3cdc"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/heartbeat","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/18612a3a-5248-41d1-a4d9-0cb39bb693bc","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/18612a3a-5248-41d1-a4d9-0cb39bb693bc?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/18612a3a-5248-41d1-a4d9-0cb39bb693bc"***,"done":false***
2026-03-10T06:11:49.4454037Z [2026-03-10T06:11:49.444Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:11:49.4455729Z [2026-03-10T06:11:49.445Z] No OAuth tokens found
2026-03-10T06:11:49.4458611Z [2026-03-10T06:11:49.445Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:11:49.5283345Z [2026-03-10T06:11:49.527Z] [update-default-us-central1-heartbeat] Retrying task index 0
2026-03-10T06:11:49.5284878Z [2026-03-10T06:11:49.528Z] No OAuth tokens found
2026-03-10T06:11:49.5287532Z [2026-03-10T06:11:49.528Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 [none]
2026-03-10T06:11:49.5700572Z [2026-03-10T06:11:49.569Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:11:49.5726886Z [2026-03-10T06:11:49.569Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:11:49.6309458Z [2026-03-10T06:11:49.630Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 200
2026-03-10T06:11:49.6325562Z [2026-03-10T06:11:49.630Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 ***"name":"projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.441712131Z","target":"projects/***/locations/us-central1/functions/heartbeat","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/heartbeat","buildConfig":***"runtime":"nodejs20","entryPoint":"heartbeat","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1773123062348911"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1772954153655356"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/heartbeat","timeoutSeconds":60,"environmentVariables":***"FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/heartbeat","FUNCTION_TARGET":"heartbeat","LOG_EXECUTION_ID":"true"***,"maxInstanceCount":10,"ingressSettings":"ALLOW_ALL","uri":"https://heartbeat-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"heartbeat-00009-tot","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-hash":"03dad288abdddb3db1ad90b736c8009efc4c3cdc"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/heartbeat","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/18612a3a-5248-41d1-a4d9-0cb39bb693bc","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/18612a3a-5248-41d1-a4d9-0cb39bb693bc?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/18612a3a-5248-41d1-a4d9-0cb39bb693bc"***,"done":false***
2026-03-10T06:11:59.5717528Z [2026-03-10T06:11:59.571Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:11:59.5718892Z [2026-03-10T06:11:59.571Z] No OAuth tokens found
2026-03-10T06:11:59.5721476Z [2026-03-10T06:11:59.571Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:11:59.6314433Z [2026-03-10T06:11:59.631Z] [update-default-us-central1-heartbeat] Retrying task index 0
2026-03-10T06:11:59.6315811Z [2026-03-10T06:11:59.631Z] No OAuth tokens found
2026-03-10T06:11:59.6318547Z [2026-03-10T06:11:59.631Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 [none]
2026-03-10T06:11:59.7442433Z [2026-03-10T06:11:59.743Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:11:59.7462647Z [2026-03-10T06:11:59.743Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:11:59.9369791Z [2026-03-10T06:11:59.936Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 200
2026-03-10T06:11:59.9387005Z [2026-03-10T06:11:59.936Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 ***"name":"projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.441712131Z","target":"projects/***/locations/us-central1/functions/heartbeat","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/heartbeat","buildConfig":***"runtime":"nodejs20","entryPoint":"heartbeat","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1773123062348911"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1772954153655356"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/heartbeat","timeoutSeconds":60,"environmentVariables":***"FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/heartbeat","FUNCTION_TARGET":"heartbeat","LOG_EXECUTION_ID":"true"***,"maxInstanceCount":10,"ingressSettings":"ALLOW_ALL","uri":"https://heartbeat-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"heartbeat-00009-tot","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-hash":"03dad288abdddb3db1ad90b736c8009efc4c3cdc"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/heartbeat","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/18612a3a-5248-41d1-a4d9-0cb39bb693bc","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/18612a3a-5248-41d1-a4d9-0cb39bb693bc?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/18612a3a-5248-41d1-a4d9-0cb39bb693bc"***,"done":false***
2026-03-10T06:12:09.7449285Z [2026-03-10T06:12:09.744Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:12:09.7450594Z [2026-03-10T06:12:09.744Z] No OAuth tokens found
2026-03-10T06:12:09.7458902Z [2026-03-10T06:12:09.745Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:12:09.8879998Z [2026-03-10T06:12:09.887Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:12:09.8900048Z [2026-03-10T06:12:09.887Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:12:09.9374415Z [2026-03-10T06:12:09.937Z] [update-default-us-central1-heartbeat] Retrying task index 0
2026-03-10T06:12:09.9376014Z [2026-03-10T06:12:09.937Z] No OAuth tokens found
2026-03-10T06:12:09.9379195Z [2026-03-10T06:12:09.937Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 [none]
2026-03-10T06:12:10.0452800Z [2026-03-10T06:12:10.044Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 200
2026-03-10T06:12:10.0468715Z [2026-03-10T06:12:10.045Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 ***"name":"projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.441712131Z","target":"projects/***/locations/us-central1/functions/heartbeat","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/heartbeat","buildConfig":***"runtime":"nodejs20","entryPoint":"heartbeat","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1773123062348911"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1772954153655356"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/heartbeat","timeoutSeconds":60,"environmentVariables":***"FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/heartbeat","FUNCTION_TARGET":"heartbeat","LOG_EXECUTION_ID":"true"***,"maxInstanceCount":10,"ingressSettings":"ALLOW_ALL","uri":"https://heartbeat-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"heartbeat-00009-tot","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-hash":"03dad288abdddb3db1ad90b736c8009efc4c3cdc"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/heartbeat","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/18612a3a-5248-41d1-a4d9-0cb39bb693bc","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/18612a3a-5248-41d1-a4d9-0cb39bb693bc?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/18612a3a-5248-41d1-a4d9-0cb39bb693bc"***,"done":false***
2026-03-10T06:12:19.8880820Z [2026-03-10T06:12:19.887Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:12:19.8882259Z [2026-03-10T06:12:19.888Z] No OAuth tokens found
2026-03-10T06:12:19.8885178Z [2026-03-10T06:12:19.888Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:12:20.0460032Z [2026-03-10T06:12:20.045Z] [update-default-us-central1-heartbeat] Retrying task index 0
2026-03-10T06:12:20.0461310Z [2026-03-10T06:12:20.045Z] No OAuth tokens found
2026-03-10T06:12:20.0464511Z [2026-03-10T06:12:20.046Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 [none]
2026-03-10T06:12:20.1805423Z [2026-03-10T06:12:20.180Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 200
2026-03-10T06:12:20.1834894Z [2026-03-10T06:12:20.180Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 ***"name":"projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.441712131Z","target":"projects/***/locations/us-central1/functions/heartbeat","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/heartbeat","buildConfig":***"runtime":"nodejs20","entryPoint":"heartbeat","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1773123062348911"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1772954153655356"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/heartbeat","timeoutSeconds":60,"environmentVariables":***"FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/heartbeat","FUNCTION_TARGET":"heartbeat","LOG_EXECUTION_ID":"true"***,"maxInstanceCount":10,"ingressSettings":"ALLOW_ALL","uri":"https://heartbeat-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"heartbeat-00009-tot","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-hash":"03dad288abdddb3db1ad90b736c8009efc4c3cdc"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/heartbeat","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/18612a3a-5248-41d1-a4d9-0cb39bb693bc","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/18612a3a-5248-41d1-a4d9-0cb39bb693bc?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/18612a3a-5248-41d1-a4d9-0cb39bb693bc"***,"done":false***
2026-03-10T06:12:20.2058970Z [2026-03-10T06:12:20.205Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:12:20.2082193Z [2026-03-10T06:12:20.205Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:12:30.1825451Z [2026-03-10T06:12:30.182Z] [update-default-us-central1-heartbeat] Retrying task index 0
2026-03-10T06:12:30.1827653Z [2026-03-10T06:12:30.182Z] No OAuth tokens found
2026-03-10T06:12:30.1830774Z [2026-03-10T06:12:30.182Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 [none]
2026-03-10T06:12:30.2069120Z [2026-03-10T06:12:30.206Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:12:30.2070598Z [2026-03-10T06:12:30.206Z] No OAuth tokens found
2026-03-10T06:12:30.2075046Z [2026-03-10T06:12:30.206Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:12:30.3040628Z [2026-03-10T06:12:30.303Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 200
2026-03-10T06:12:30.3127917Z [2026-03-10T06:12:30.303Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2 ***"name":"projects/***/locations/us-central1/operations/operation-1773123061601-64ca5623ad36a-c07a7283-f08ed2d2","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.441712131Z","endTime":"2026-03-10T06:12:22.131654809Z","target":"projects/***/locations/us-central1/functions/heartbeat","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/heartbeat","buildConfig":***"runtime":"nodejs20","entryPoint":"heartbeat","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1773123062348911"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"heartbeat/function-source.zip","generation":"1772954153655356"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/heartbeat","timeoutSeconds":60,"environmentVariables":***"FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/heartbeat","FUNCTION_TARGET":"heartbeat","LOG_EXECUTION_ID":"true"***,"maxInstanceCount":10,"ingressSettings":"ALLOW_ALL","uri":"https://heartbeat-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"heartbeat-00009-tot","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-hash":"03dad288abdddb3db1ad90b736c8009efc4c3cdc"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/heartbeat","satisfiesPzi":true***,"stages":[***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION"***,"done":true,"error":***"code":3,"message":"Build failed with status: FAILURE and message: npm error code EUSAGE\nnpm error\nnpm error `npm ci` can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock file with `npm install` before continuing.\nnpm error\nnpm error Missing: jest@30.3.0 from lock file\nnpm error Missing: @jest/core@30.3.0 from lock file\nnpm error Missing: @jest/types@30.3.0 from lock file\nnpm error Missing: import-local@3.2.0 from lock file\nnpm error Missing: jest-cli@30.3.0 from lock file\nnpm error Missing: @jest/console@30.3.0 from lock file\nnpm error Missing: @jest/pattern@30.0.1 from lock file\nnpm error Missing: @jest/reporters@30.3.0 from lock file\nnpm error Missing: @jest/test-result@30.3.0 from lock file\nnpm error Missing: @jest/transform@30.3.0 from lock file\nnpm error Missing: ansi-escapes@4.3.2 from lock file\nnpm error Missing: ci-info@4.4.0 from lock file\nnpm error Missing: exit-x@0.2.2 from lock file\nnpm error Missing: graceful-fs@4.2.11 from lock file\nnpm error Missing: jest-changed-files@30.3.0 from lock file\nnpm error Missing: jest-config@30.3.0 from lock file\nnpm error Missing: jest-haste-map@30.3.0 from lock file\nnpm error Missing: jest-message-util@30.3.0 from lock file\nnpm error Missing: jest-regex-util@30.0.1 from lock file\nnpm error Missing: jest-resolve@30.3.0 from lock file\nnpm error Missing: jest-resolve-dependencies@30.3.0 from lock file\nnpm error Missing: jest-runner@30.3.0 from lock file\nnpm error Missing: jest-runtime@30.3.0 from lock file\nnpm error Missing: jest-snapshot@30.3.0 from lock file\nnpm error Missing: jest-util@30.3.0 from lock file\nnpm error Missing: jest-validate@30.3.0 from lock file\nnpm error Missing: jest-watcher@30.3.0 from lock file\nnpm error Missing: pretty-format@30.3.0 from lock file\nnpm error Missing: slash@3.0.0 from lock file\nnpm error Missing: @bcoe/v8-coverage@0.2.3 from lock file\nnpm error Missing: @jridgewell/trace-mapping@0.3.31 from lock file\nnpm error Missing: collect-v8-coverage@1.0.3 from lock file\nnpm error Missing: istanbul-lib-coverage@3.2.2 from lock file\nnpm error Missing: istanbul-lib-instrument@6.0.3 from lock file\nnpm error Missing: istanbul-lib-report@3.0.1 from lock file\nnpm error Missing: istanbul-lib-source-maps@5.0.6 from lock file\nnpm error Missing: istanbul-reports@3.2.0 from lock file\nnpm error Missing: jest-worker@30.3.0 from lock file\nnpm error Missing: string-length@4.0.2 from lock file\nnpm error Missing: v8-to-istanbul@9.3.0 from lock file\nnpm error Missing: @types/istanbul-lib-coverage@2.0.6 from lock file\nnpm error Missing: @babel/core@7.29.0 from lock file\nnpm error Missing: babel-plugin-istanbul@7.0.1 from lock file\nnpm error Missing: convert-source-map@2.0.0 from lock file\nnpm error Missing: pirates@4.0.7 from lock file\nnpm error Missing: write-file-atomic@5.0.1 from lock file\nnpm error Missing: @babel/code-frame@7.29.0 from lock file\nnpm error Missing: @babel/generator@7.29.1 from lock file\nnpm error Missing: @babel/helper-compilation-targets@7.28.6 from lock file\nnpm error Missing: @babel/helper-module-transforms@7.28.6 from lock file\nnpm error Missing: @babel/helpers@7.28.6 from lock file\nnpm error Missing: @babel/parser@7.29.0 from lock file\nnpm error Missing: @babel/template@7.28.6 from lock file\nnpm error Missing: @babel/traverse@7.29.0 from lock file\nnpm error Missing: @babel/types@7.29.0 from lock file\nnpm error Missing: @jridgewell/remapping@2.3.5 from lock file\nnpm error Missing: gensync@1.0.0-beta.2 from lock file\nnpm error Missing: json5@2.2.3 from lock file\nnpm error Missing: semver@6.3.1 from lock file\nnpm error Missing: @babel/helper-validator-identifier@7.28.5 from lock file\nnpm error Missing: js-tokens@4.0.0 from lock file\nnpm error Missing: picocolors@1.1.1 from lock file\nnpm error Missing: @jridgewell/gen-mapping@0.3.13 from lock file\nnpm error Missing: jsesc@3.1.0 from lock file\nnpm error Missing: @babel/compat-data@7.29.0 from lock file\nnpm error Missing: @babel/helper-validator-option@7.27.1 from lock file\nnpm error Missing: browserslist@4.28.1 from lock file\nnpm error Missing: lru-cache@5.1.1 from lock file\nnpm error Missing: semver@6.3.1 from lock file\nnpm error Missing: @babel/helper-module-imports@7.28.6 from lock file\nnpm error Missing: @babel/helper-globals@7.28.0 from lock file\nnpm error Missing: @babel/helper-string-parser@7.27.1 from lock file\nnpm error Missing: @jest/schemas@30.0.5 from lock file\nnpm error Missing: @types/istanbul-reports@3.0.4 from lock file\nnpm error Missing: @types/yargs@17.0.35 from lock file\nnpm error Missing: @sinclair/typebox@0.34.48 from lock file\nnpm error Missing: @jridgewell/sourcemap-codec@1.5.5 from lock file\nnpm error Missing: @jridgewell/resolve-uri@3.1.2 from lock file\nnpm error Missing: @types/istanbul-lib-report@3.0.3 from lock file\nnpm error Missing: @types/yargs-parser@21.0.3 from lock file\nnpm error Missing: type-fest@0.21.3 from lock file\nnpm error Missing: @babel/helper-plugin-utils@7.28.6 from lock file\nnpm error Missing: @istanbuljs/load-nyc-config@1.1.0 from lock file\nnpm error Missing: @istanbuljs/schema@0.1.3 from lock file\nnpm error Missing: test-exclude@6.0.0 from lock file\nnpm error Missing: camelcase@5.3.1 from lock file\nnpm error Missing: find-up@4.1.0 from lock file\nnpm error Missing: get-package-type@0.1.0 from lock file\nnpm error Missing: js-yaml@3.14.2 from lock file\nnpm error Missing: resolve-from@5.0.0 from lock file\nnpm error Missing: baseline-browser-mapping@2.10.0 from lock file\nnpm error Missing: caniuse-lite@1.0.30001777 from lock file\nnpm error Missing: electron-to-chromium@1.5.307 from lock file\nnpm error Missing: node-releases@2.0.36 from lock file\nnpm error Missing: update-browserslist-db@1.2.3 from lock file\nnpm error Missing: pkg-dir@4.2.0 from lock file\nnpm error Missing: resolve-cwd@3.0.0 from lock file\nnpm error Missing: make-dir@4.0.0 from lock file\nnpm error Missing: html-escaper@2.0.2 from lock file\nnpm error Missing: execa@5.1.1 from lock file\nnpm error Missing: get-stream@6.0.1 from lock file\nnpm error Missing: human-signals@2.1.0 from lock file\nnpm error Missing: merge-stream@2.0.0 from lock file\nnpm error Missing: npm-run-path@4.0.1 from lock file\nnpm error Missing: onetime@5.1.2 from lock file\nnpm error Missing: signal-exit@3.0.7 from lock file\nnpm error Missing: strip-final-newline@2.0.0 from lock file\nnpm error Missing: @jest/get-type@30.1.0 from lock file\nnpm error Missing: @jest/test-sequencer@30.3.0 from lock file\nnpm error Missing: babel-jest@30.3.0 from lock file\nnpm error Missing: deepmerge@4.3.1 from lock file\nnpm error Missing: jest-circus@30.3.0 from lock file\nnpm error Missing: jest-docblock@30.2.0 from lock file\nnpm error Missing: jest-environment-node@30.3.0 from lock file\nnpm error Missing: parse-json@5.2.0 from lock file\nnpm error Missing: @types/babel__core@7.20.5 from lock file\nnpm error Missing: babel-preset-jest@30.3.0 from lock file\nnpm error Missing: @types/babel__generator@7.27.0 from lock file\nnpm error Missing: @types/babel__template@7.4.4 from lock file\nnpm error Missing: @types/babel__traverse@7.28.0 from lock file\nnpm error Missing: babel-plugin-jest-hoist@30.3.0 from lock file\nnpm error Missing: babel-preset-current-node-syntax@1.2.0 from lock file\nnpm error Missing: @babel/plugin-syntax-async-generators@7.8.4 from lock file\nnpm error Missing: @babel/plugin-syntax-bigint@7.8.3 from lock file\nnpm error Missing: @babel/plugin-syntax-class-properties@7.12.13 from lock file\nnpm error Missing: @babel/plugin-syntax-class-static-block@7.14.5 from lock file\nnpm error Missing: @babel/plugin-syntax-import-attributes@7.28.6 from lock file\nnpm error Missing: @babel/plugin-syntax-import-meta@7.10.4 from lock file\nnpm error Missing: @babel/plugin-syntax-json-strings@7.8.3 from lock file\nnpm error Missing: @babel/plugin-syntax-logical-assignment-operators@7.10.4 from lock file\nnpm error Missing: @babel/plugin-syntax-nullish-coalescing-operator@7.8.3 from lock file\nnpm error Missing: @babel/plugin-syntax-numeric-separator@7.10.4 from lock file\nnpm error Missing: @babel/plugin-syntax-object-rest-spread@7.8.3 from lock file\nnpm error Missing: @babel/plugin-syntax-optional-catch-binding@7.8.3 from lock file\nnpm error Missing: @babel/plugin-syntax-optional-chaining@7.8.3 from lock file\nnpm error Missing: @babel/plugin-syntax-private-property-in-object@7.14.5 from lock file\nnpm error Missing: @babel/plugin-syntax-top-level-await@7.14.5 from lock file\nnpm error Missing: @jest/environment@30.3.0 from lock file\nnpm error Missing: @jest/expect@30.3.0 from lock file\nnpm error Missing: co@4.6.0 from lock file\nnpm error Missing: dedent@1.7.2 from lock file\nnpm error Missing: is-generator-fn@2.1.0 from lock file\nnpm error Missing: jest-each@30.3.0 from lock file\nnpm error Missing: jest-matcher-utils@30.3.0 from lock file\nnpm error Missing: pure-rand@7.0.1 from lock file\nnpm error Missing: stack-utils@2.0.6 from lock file\nnpm error Missing: @jest/fake-timers@30.3.0 from lock file\nnpm error Missing: jest-mock@30.3.0 from lock file\nnpm error Missing: expect@30.3.0 from lock file\nnpm error Missing: @sinonjs/fake-timers@15.1.1 from lock file\nnpm error Missing: @sinonjs/commons@3.0.1 from lock file\nnpm error Missing: type-detect@4.0.8 from lock file\nnpm error Missing: @jest/expect-utils@30.3.0 from lock file\nnpm error Missing: detect-newline@3.1.0 from lock file\nnpm error Missing: anymatch@3.1.3 from lock file\nnpm error Missing: fb-watchman@2.0.2 from lock file\nnpm error Missing: fsevents@2.3.3 from lock file\nnpm error Missing: walker@1.0.8 from lock file\nnpm error Missing: normalize-path@3.0.0 from lock file\nnpm error Missing: picomatch@2.3.1 from lock file\nnpm error Missing: bser@2.1.1 from lock file\nnpm error Missing: node-int64@0.4.0 from lock file\nnpm error Missing: jest-diff@30.3.0 from lock file\nnpm error Missing: @jest/diff-sequences@30.3.0 from lock file\nnpm error Missing: @types/stack-utils@2.0.3 from lock file\nnpm error Missing: jest-pnp-resolver@1.2.3 from lock file\nnpm error Missing: unrs-resolver@1.11.1 from lock file\nnpm error Missing: emittery@0.13.1 from lock file\nnpm error Missing: jest-leak-detector@30.3.0 from lock file\nnpm error Missing: source-map-support@0.5.13 from lock file\nnpm error Missing: @jest/globals@30.3.0 from lock file\nnpm error Missing: @jest/source-map@30.0.1 from lock file\nnpm error Missing: cjs-module-lexer@2.2.0 from lock file\nnpm error Missing: strip-bom@4.0.0 from lock file\nnpm error Missing: @babel/plugin-syntax-jsx@7.28.6 from lock file\nnpm error Missing: @babel/plugin-syntax-typescript@7.28.6 from lock file\nnpm error Missing: @jest/snapshot-utils@30.3.0 from lock file\nnpm error Missing: synckit@0.11.12 from lock file\nnpm error Missing: camelcase@6.3.0 from lock file\nnpm error Missing: leven@3.1.0 from lock file\nnpm error Missing: @ungap/structured-clone@1.3.0 from lock file\nnpm error Missing: supports-color@8.1.1 from lock file\nnpm error Missing: mimic-fn@2.1.0 from lock file\nnpm error Missing: error-ex@1.3.4 from lock file\nnpm error Missing: json-parse-even-better-errors@2.3.1 from lock file\nnpm error Missing: lines-and-columns@1.2.4 from lock file\nnpm error Missing: is-arrayish@0.2.1 from lock file\nnpm error Missing: find-up@4.1.0 from lock file\nnpm error Missing: ansi-styles@5.2.0 from lock file\nnpm error Missing: react-is@18.3.1 from lock file\nnpm error Missing: resolve-from@5.0.0 from lock file\nnpm error Missing: buffer-from@1.1.2 from lock file\nnpm error Missing: source-map@0.6.1 from lock file\nnpm error Missing: escape-string-regexp@2.0.0 from lock file\nnpm error Missing: char-regex@1.0.2 from lock file\nnpm error Missing: @pkgr/core@0.2.9 from lock file\nnpm error Missing: glob@7.2.3 from lock file\nnpm error Missing: minimatch@3.1.5 from lock file\nnpm error Missing: @unrs/resolver-binding-android-arm-eabi@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-android-arm64@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-darwin-arm64@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-darwin-x64@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-freebsd-x64@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-arm-gnueabihf@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-arm-musleabihf@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-arm64-gnu@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-arm64-musl@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-ppc64-gnu@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-riscv64-gnu@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-riscv64-musl@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-s390x-gnu@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-x64-gnu@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-x64-musl@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-wasm32-wasi@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-win32-arm64-msvc@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-win32-ia32-msvc@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-win32-x64-msvc@1.11.1 from lock file\nnpm error Missing: napi-postinstall@0.3.4 from lock file\nnpm error Missing: @napi-rs/wasm-runtime@0.2.12 from lock file\nnpm error Missing: @emnapi/core@1.8.1 from lock file\nnpm error Missing: @emnapi/runtime@1.8.1 from lock file\nnpm error Missing: @tybys/wasm-util@0.10.1 from lock file\nnpm error Missing: @emnapi/wasi-threads@1.1.0 from lock file\nnpm error Missing: makeerror@1.0.12 from lock file\nnpm error Missing: tmpl@1.0.5 from lock file\nnpm error Missing: yallist@3.1.1 from lock file\nnpm error Missing: locate-path@5.0.0 from lock file\nnpm error Missing: argparse@1.0.10 from lock file\nnpm error Missing: esprima@4.0.1 from lock file\nnpm error Missing: sprintf-js@1.0.3 from lock file\nnpm error Missing: p-locate@4.1.0 from lock file\nnpm error Missing: p-limit@2.3.0 from lock file\nnpm error Missing: p-try@2.2.0 from lock file\nnpm error Missing: locate-path@5.0.0 from lock file\nnpm error Missing: p-locate@4.1.0 from lock file\nnpm error Missing: p-limit@2.3.0 from lock file\nnpm error Missing: fs.realpath@1.0.0 from lock file\nnpm error Missing: inflight@1.0.6 from lock file\nnpm error Missing: path-is-absolute@1.0.1 from lock file\nnpm error Missing: brace-expansion@1.1.12 from lock file\nnpm error Missing: balanced-match@1.0.2 from lock file\nnpm error\nnpm error Clean install a project\nnpm error\nnpm error Usage:\nnpm error npm ci\nnpm error\nnpm error Options:\nnpm error [--install-strategy <hoisted|nested|shallow|linked>] [--legacy-bundling]\nnpm error [--global-style] [--omit <dev|optional|peer> [--omit <dev|optional|peer> ...]]\nnpm error [--include <prod|dev|optional|peer> [--include <prod|dev|optional|peer> ...]]\nnpm error [--strict-peer-deps] [--foreground-scripts] [--ignore-scripts] [--no-audit]\nnpm error [--no-bin-links] [--no-fund] [--dry-run]\nnpm error [-w|--workspace <workspace-name> [-w|--workspace <workspace-name> ...]]\nnpm error [-ws|--workspaces] [--include-workspace-root] [--install-links]\nnpm error\nnpm error aliases: clean-install, ic, install-clean, isntall-clean\nnpm error\nnpm error Run \"npm help ci\" for more info\nnpm error A complete log of this run can be found in: /www-data-home/.npm/_logs/2026-03-10T06_11_47_219Z-debug-0.log. For more details see the logs at https://console.cloud.google.com/cloud-build/builds;region=us-central1/18612a3a-5248-41d1-a4d9-0cb39bb693bc?project=350817205989."***
2026-03-10T06:12:30.3189301Z [2026-03-10T06:12:30.304Z] Got source token undefined for region us-central1
2026-03-10T06:12:30.3189941Z Build failed with status: FAILURE and message: npm error code EUSAGE
2026-03-10T06:12:30.3190378Z npm error
2026-03-10T06:12:30.3191337Z npm error `npm ci` can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock file with `npm install` before continuing.
2026-03-10T06:12:30.3192161Z npm error
2026-03-10T06:12:30.3192486Z npm error Missing: jest@30.3.0 from lock file
2026-03-10T06:12:30.3192927Z npm error Missing: @jest/core@30.3.0 from lock file
2026-03-10T06:12:30.3193400Z npm error Missing: @jest/types@30.3.0 from lock file
2026-03-10T06:12:30.3193859Z npm error Missing: import-local@3.2.0 from lock file
2026-03-10T06:12:30.3194306Z npm error Missing: jest-cli@30.3.0 from lock file
2026-03-10T06:12:30.3194767Z npm error Missing: @jest/console@30.3.0 from lock file
2026-03-10T06:12:30.3195237Z npm error Missing: @jest/pattern@30.0.1 from lock file
2026-03-10T06:12:30.3195726Z npm error Missing: @jest/reporters@30.3.0 from lock file
2026-03-10T06:12:30.3196238Z npm error Missing: @jest/test-result@30.3.0 from lock file
2026-03-10T06:12:30.3196837Z npm error Missing: @jest/transform@30.3.0 from lock file
2026-03-10T06:12:30.3197322Z npm error Missing: ansi-escapes@4.3.2 from lock file
2026-03-10T06:12:30.3197766Z npm error Missing: ci-info@4.4.0 from lock file
2026-03-10T06:12:30.3198202Z npm error Missing: exit-x@0.2.2 from lock file
2026-03-10T06:12:30.3198655Z npm error Missing: graceful-fs@4.2.11 from lock file
2026-03-10T06:12:30.3199302Z npm error Missing: jest-changed-files@30.3.0 from lock file
2026-03-10T06:12:30.3199792Z npm error Missing: jest-config@30.3.0 from lock file
2026-03-10T06:12:30.3200264Z npm error Missing: jest-haste-map@30.3.0 from lock file
2026-03-10T06:12:30.3200786Z npm error Missing: jest-message-util@30.3.0 from lock file
2026-03-10T06:12:30.3201279Z npm error Missing: jest-regex-util@30.0.1 from lock file
2026-03-10T06:12:30.3201756Z npm error Missing: jest-resolve@30.3.0 from lock file
2026-03-10T06:12:30.3202291Z npm error Missing: jest-resolve-dependencies@30.3.0 from lock file
2026-03-10T06:12:30.3202810Z npm error Missing: jest-runner@30.3.0 from lock file
2026-03-10T06:12:30.3203269Z npm error Missing: jest-runtime@30.3.0 from lock file
2026-03-10T06:12:30.3203741Z npm error Missing: jest-snapshot@30.3.0 from lock file
2026-03-10T06:12:30.3204207Z npm error Missing: jest-util@30.3.0 from lock file
2026-03-10T06:12:30.3204668Z npm error Missing: jest-validate@30.3.0 from lock file
2026-03-10T06:12:30.3205138Z npm error Missing: jest-watcher@30.3.0 from lock file
2026-03-10T06:12:30.3205603Z npm error Missing: pretty-format@30.3.0 from lock file
2026-03-10T06:12:30.3206043Z npm error Missing: slash@3.0.0 from lock file
2026-03-10T06:12:30.3206611Z npm error Missing: @bcoe/v8-coverage@0.2.3 from lock file
2026-03-10T06:12:30.3207146Z npm error Missing: @jridgewell/trace-mapping@0.3.31 from lock file
2026-03-10T06:12:30.3207688Z npm error Missing: collect-v8-coverage@1.0.3 from lock file
2026-03-10T06:12:30.3208329Z npm error Missing: istanbul-lib-coverage@3.2.2 from lock file
2026-03-10T06:12:30.3208871Z npm error Missing: istanbul-lib-instrument@6.0.3 from lock file
2026-03-10T06:12:30.3209401Z npm error Missing: istanbul-lib-report@3.0.1 from lock file
2026-03-10T06:12:30.3209935Z npm error Missing: istanbul-lib-source-maps@5.0.6 from lock file
2026-03-10T06:12:30.3210464Z npm error Missing: istanbul-reports@3.2.0 from lock file
2026-03-10T06:12:30.3210943Z npm error Missing: jest-worker@30.3.0 from lock file
2026-03-10T06:12:30.3211414Z npm error Missing: string-length@4.0.2 from lock file
2026-03-10T06:12:30.3211879Z npm error Missing: v8-to-istanbul@9.3.0 from lock file
2026-03-10T06:12:30.3212409Z npm error Missing: @types/istanbul-lib-coverage@2.0.6 from lock file
2026-03-10T06:12:30.3212924Z npm error Missing: @babel/core@7.29.0 from lock file
2026-03-10T06:12:30.3213421Z npm error Missing: babel-plugin-istanbul@7.0.1 from lock file
2026-03-10T06:12:30.3213945Z npm error Missing: convert-source-map@2.0.0 from lock file
2026-03-10T06:12:30.3214409Z npm error Missing: pirates@4.0.7 from lock file
2026-03-10T06:12:30.3214880Z npm error Missing: write-file-atomic@5.0.1 from lock file
2026-03-10T06:12:30.3215374Z npm error Missing: @babel/code-frame@7.29.0 from lock file
2026-03-10T06:12:30.3215863Z npm error Missing: @babel/generator@7.29.1 from lock file
2026-03-10T06:12:30.3216525Z npm error Missing: @babel/helper-compilation-targets@7.28.6 from lock file
2026-03-10T06:12:30.3217155Z npm error Missing: @babel/helper-module-transforms@7.28.6 from lock file
2026-03-10T06:12:30.3217701Z npm error Missing: @babel/helpers@7.28.6 from lock file
2026-03-10T06:12:30.3218172Z npm error Missing: @babel/parser@7.29.0 from lock file
2026-03-10T06:12:30.3218644Z npm error Missing: @babel/template@7.28.6 from lock file
2026-03-10T06:12:30.3219121Z npm error Missing: @babel/traverse@7.29.0 from lock file
2026-03-10T06:12:30.3219591Z npm error Missing: @babel/types@7.29.0 from lock file
2026-03-10T06:12:30.3220083Z npm error Missing: @jridgewell/remapping@2.3.5 from lock file
2026-03-10T06:12:30.3220578Z npm error Missing: gensync@1.0.0-beta.2 from lock file
2026-03-10T06:12:30.3221022Z npm error Missing: json5@2.2.3 from lock file
2026-03-10T06:12:30.3221443Z npm error Missing: semver@6.3.1 from lock file
2026-03-10T06:12:30.3221980Z npm error Missing: @babel/helper-validator-identifier@7.28.5 from lock file
2026-03-10T06:12:30.3222516Z npm error Missing: js-tokens@4.0.0 from lock file
2026-03-10T06:12:30.3223092Z npm error Missing: picocolors@1.1.1 from lock file
2026-03-10T06:12:30.3223600Z npm error Missing: @jridgewell/gen-mapping@0.3.13 from lock file
2026-03-10T06:12:30.3224088Z npm error Missing: jsesc@3.1.0 from lock file
2026-03-10T06:12:30.3224562Z npm error Missing: @babel/compat-data@7.29.0 from lock file
2026-03-10T06:12:30.3225122Z npm error Missing: @babel/helper-validator-option@7.27.1 from lock file
2026-03-10T06:12:30.3225653Z npm error Missing: browserslist@4.28.1 from lock file
2026-03-10T06:12:30.3226118Z npm error Missing: lru-cache@5.1.1 from lock file
2026-03-10T06:12:30.3226657Z npm error Missing: semver@6.3.1 from lock file
2026-03-10T06:12:30.3227169Z npm error Missing: @babel/helper-module-imports@7.28.6 from lock file
2026-03-10T06:12:30.3227730Z npm error Missing: @babel/helper-globals@7.28.0 from lock file
2026-03-10T06:12:30.3228291Z npm error Missing: @babel/helper-string-parser@7.27.1 from lock file
2026-03-10T06:12:30.3228812Z npm error Missing: @jest/schemas@30.0.5 from lock file
2026-03-10T06:12:30.3229325Z npm error Missing: @types/istanbul-reports@3.0.4 from lock file
2026-03-10T06:12:30.3229823Z npm error Missing: @types/yargs@17.0.35 from lock file
2026-03-10T06:12:30.3230309Z npm error Missing: @sinclair/typebox@0.34.48 from lock file
2026-03-10T06:12:30.3230857Z npm error Missing: @jridgewell/sourcemap-codec@1.5.5 from lock file
2026-03-10T06:12:30.3231412Z npm error Missing: @jridgewell/resolve-uri@3.1.2 from lock file
2026-03-10T06:12:30.3232082Z npm error Missing: @types/istanbul-lib-report@3.0.3 from lock file
2026-03-10T06:12:30.3232637Z npm error Missing: @types/yargs-parser@21.0.3 from lock file
2026-03-10T06:12:30.3233114Z npm error Missing: type-fest@0.21.3 from lock file
2026-03-10T06:12:30.3233633Z npm error Missing: @babel/helper-plugin-utils@7.28.6 from lock file
2026-03-10T06:12:30.3234201Z npm error Missing: @istanbuljs/load-nyc-config@1.1.0 from lock file
2026-03-10T06:12:30.3234738Z npm error Missing: @istanbuljs/schema@0.1.3 from lock file
2026-03-10T06:12:30.3235227Z npm error Missing: test-exclude@6.0.0 from lock file
2026-03-10T06:12:30.3235679Z npm error Missing: camelcase@5.3.1 from lock file
2026-03-10T06:12:30.3236111Z npm error Missing: find-up@4.1.0 from lock file
2026-03-10T06:12:30.3236677Z npm error Missing: get-package-type@0.1.0 from lock file
2026-03-10T06:12:30.3237139Z npm error Missing: js-yaml@3.14.2 from lock file
2026-03-10T06:12:30.3237581Z npm error Missing: resolve-from@5.0.0 from lock file
2026-03-10T06:12:30.3238112Z npm error Missing: baseline-browser-mapping@2.10.0 from lock file
2026-03-10T06:12:30.3238648Z npm error Missing: caniuse-lite@1.0.30001777 from lock file
2026-03-10T06:12:30.3239170Z npm error Missing: electron-to-chromium@1.5.307 from lock file
2026-03-10T06:12:30.3239677Z npm error Missing: node-releases@2.0.36 from lock file
2026-03-10T06:12:30.3240186Z npm error Missing: update-browserslist-db@1.2.3 from lock file
2026-03-10T06:12:30.3240665Z npm error Missing: pkg-dir@4.2.0 from lock file
2026-03-10T06:12:30.3241102Z npm error Missing: resolve-cwd@3.0.0 from lock file
2026-03-10T06:12:30.3241556Z npm error Missing: make-dir@4.0.0 from lock file
2026-03-10T06:12:30.3242005Z npm error Missing: html-escaper@2.0.2 from lock file
2026-03-10T06:12:30.3242460Z npm error Missing: execa@5.1.1 from lock file
2026-03-10T06:12:30.3242894Z npm error Missing: get-stream@6.0.1 from lock file
2026-03-10T06:12:30.3243360Z npm error Missing: human-signals@2.1.0 from lock file
2026-03-10T06:12:30.3243822Z npm error Missing: merge-stream@2.0.0 from lock file
2026-03-10T06:12:30.3244281Z npm error Missing: npm-run-path@4.0.1 from lock file
2026-03-10T06:12:30.3244719Z npm error Missing: onetime@5.1.2 from lock file
2026-03-10T06:12:30.3245157Z npm error Missing: signal-exit@3.0.7 from lock file
2026-03-10T06:12:30.3245650Z npm error Missing: strip-final-newline@2.0.0 from lock file
2026-03-10T06:12:30.3246145Z npm error Missing: @jest/get-type@30.1.0 from lock file
2026-03-10T06:12:30.3246753Z npm error Missing: @jest/test-sequencer@30.3.0 from lock file
2026-03-10T06:12:30.3247368Z npm error Missing: babel-jest@30.3.0 from lock file
2026-03-10T06:12:30.3247837Z npm error Missing: deepmerge@4.3.1 from lock file
2026-03-10T06:12:30.3248294Z npm error Missing: jest-circus@30.3.0 from lock file
2026-03-10T06:12:30.3248758Z npm error Missing: jest-docblock@30.2.0 from lock file
2026-03-10T06:12:30.3249270Z npm error Missing: jest-environment-node@30.3.0 from lock file
2026-03-10T06:12:30.3249776Z npm error Missing: parse-json@5.2.0 from lock file
2026-03-10T06:12:30.3250265Z npm error Missing: @types/babel__core@7.20.5 from lock file
2026-03-10T06:12:30.3250770Z npm error Missing: babel-preset-jest@30.3.0 from lock file
2026-03-10T06:12:30.3251294Z npm error Missing: @types/babel__generator@7.27.0 from lock file
2026-03-10T06:12:30.3251825Z npm error Missing: @types/babel__template@7.4.4 from lock file
2026-03-10T06:12:30.3252354Z npm error Missing: @types/babel__traverse@7.28.0 from lock file
2026-03-10T06:12:30.3252907Z npm error Missing: babel-plugin-jest-hoist@30.3.0 from lock file
2026-03-10T06:12:30.3253511Z npm error Missing: babel-preset-current-node-syntax@1.2.0 from lock file
2026-03-10T06:12:30.3254160Z npm error Missing: @babel/plugin-syntax-async-generators@7.8.4 from lock file
2026-03-10T06:12:30.3254777Z npm error Missing: @babel/plugin-syntax-bigint@7.8.3 from lock file
2026-03-10T06:12:30.3255406Z npm error Missing: @babel/plugin-syntax-class-properties@7.12.13 from lock file
2026-03-10T06:12:30.3256202Z npm error Missing: @babel/plugin-syntax-class-static-block@7.14.5 from lock file
2026-03-10T06:12:30.3256990Z npm error Missing: @babel/plugin-syntax-import-attributes@7.28.6 from lock file
2026-03-10T06:12:30.3257638Z npm error Missing: @babel/plugin-syntax-import-meta@7.10.4 from lock file
2026-03-10T06:12:30.3258256Z npm error Missing: @babel/plugin-syntax-json-strings@7.8.3 from lock file
2026-03-10T06:12:30.3258958Z npm error Missing: @babel/plugin-syntax-logical-assignment-operators@7.10.4 from lock file
2026-03-10T06:12:30.3259727Z npm error Missing: @babel/plugin-syntax-nullish-coalescing-operator@7.8.3 from lock file
2026-03-10T06:12:30.3260445Z npm error Missing: @babel/plugin-syntax-numeric-separator@7.10.4 from lock file
2026-03-10T06:12:30.3261117Z npm error Missing: @babel/plugin-syntax-object-rest-spread@7.8.3 from lock file
2026-03-10T06:12:30.3261807Z npm error Missing: @babel/plugin-syntax-optional-catch-binding@7.8.3 from lock file
2026-03-10T06:12:30.3262493Z npm error Missing: @babel/plugin-syntax-optional-chaining@7.8.3 from lock file
2026-03-10T06:12:30.3263219Z npm error Missing: @babel/plugin-syntax-private-property-in-object@7.14.5 from lock file
2026-03-10T06:12:30.3263926Z npm error Missing: @babel/plugin-syntax-top-level-await@7.14.5 from lock file
2026-03-10T06:12:30.3264500Z npm error Missing: @jest/environment@30.3.0 from lock file
2026-03-10T06:12:30.3264979Z npm error Missing: @jest/expect@30.3.0 from lock file
2026-03-10T06:12:30.3265413Z npm error Missing: co@4.6.0 from lock file
2026-03-10T06:12:30.3265829Z npm error Missing: dedent@1.7.2 from lock file
2026-03-10T06:12:30.3266289Z npm error Missing: is-generator-fn@2.1.0 from lock file
2026-03-10T06:12:30.3266849Z npm error Missing: jest-each@30.3.0 from lock file
2026-03-10T06:12:30.3267330Z npm error Missing: jest-matcher-utils@30.3.0 from lock file
2026-03-10T06:12:30.3267809Z npm error Missing: pure-rand@7.0.1 from lock file
2026-03-10T06:12:30.3268296Z npm error Missing: stack-utils@2.0.6 from lock file
2026-03-10T06:12:30.3268782Z npm error Missing: @jest/fake-timers@30.3.0 from lock file
2026-03-10T06:12:30.3269251Z npm error Missing: jest-mock@30.3.0 from lock file
2026-03-10T06:12:30.3269689Z npm error Missing: expect@30.3.0 from lock file
2026-03-10T06:12:30.3270182Z npm error Missing: @sinonjs/fake-timers@15.1.1 from lock file
2026-03-10T06:12:30.3270689Z npm error Missing: @sinonjs/commons@3.0.1 from lock file
2026-03-10T06:12:30.3271155Z npm error Missing: type-detect@4.0.8 from lock file
2026-03-10T06:12:30.3271638Z npm error Missing: @jest/expect-utils@30.3.0 from lock file
2026-03-10T06:12:30.3272312Z npm error Missing: detect-newline@3.1.0 from lock file
2026-03-10T06:12:30.3272769Z npm error Missing: anymatch@3.1.3 from lock file
2026-03-10T06:12:30.3273211Z npm error Missing: fb-watchman@2.0.2 from lock file
2026-03-10T06:12:30.3273648Z npm error Missing: fsevents@2.3.3 from lock file
2026-03-10T06:12:30.3274072Z npm error Missing: walker@1.0.8 from lock file
2026-03-10T06:12:30.3274526Z npm error Missing: normalize-path@3.0.0 from lock file
2026-03-10T06:12:30.3274992Z npm error Missing: picomatch@2.3.1 from lock file
2026-03-10T06:12:30.3275424Z npm error Missing: bser@2.1.1 from lock file
2026-03-10T06:12:30.3275858Z npm error Missing: node-int64@0.4.0 from lock file
2026-03-10T06:12:30.3276398Z npm error Missing: jest-diff@30.3.0 from lock file
2026-03-10T06:12:30.3276893Z npm error Missing: @jest/diff-sequences@30.3.0 from lock file
2026-03-10T06:12:30.3277405Z npm error Missing: @types/stack-utils@2.0.3 from lock file
2026-03-10T06:12:30.3277912Z npm error Missing: jest-pnp-resolver@1.2.3 from lock file
2026-03-10T06:12:30.3278394Z npm error Missing: unrs-resolver@1.11.1 from lock file
2026-03-10T06:12:30.3278846Z npm error Missing: emittery@0.13.1 from lock file
2026-03-10T06:12:30.3279319Z npm error Missing: jest-leak-detector@30.3.0 from lock file
2026-03-10T06:12:30.3279829Z npm error Missing: source-map-support@0.5.13 from lock file
2026-03-10T06:12:30.3280314Z npm error Missing: @jest/globals@30.3.0 from lock file
2026-03-10T06:12:30.3280918Z npm error Missing: @jest/source-map@30.0.1 from lock file
2026-03-10T06:12:30.3281418Z npm error Missing: cjs-module-lexer@2.2.0 from lock file
2026-03-10T06:12:30.3281877Z npm error Missing: strip-bom@4.0.0 from lock file
2026-03-10T06:12:30.3282387Z npm error Missing: @babel/plugin-syntax-jsx@7.28.6 from lock file
2026-03-10T06:12:30.3282977Z npm error Missing: @babel/plugin-syntax-typescript@7.28.6 from lock file
2026-03-10T06:12:30.3283543Z npm error Missing: @jest/snapshot-utils@30.3.0 from lock file
2026-03-10T06:12:30.3284019Z npm error Missing: synckit@0.11.12 from lock file
2026-03-10T06:12:30.3284452Z npm error Missing: camelcase@6.3.0 from lock file
2026-03-10T06:12:30.3284869Z npm error Missing: leven@3.1.0 from lock file
2026-03-10T06:12:30.3285354Z npm error Missing: @ungap/structured-clone@1.3.0 from lock file
2026-03-10T06:12:30.3285862Z npm error Missing: supports-color@8.1.1 from lock file
2026-03-10T06:12:30.3286410Z npm error Missing: mimic-fn@2.1.0 from lock file
2026-03-10T06:12:30.3286849Z npm error Missing: error-ex@1.3.4 from lock file
2026-03-10T06:12:30.3287371Z npm error Missing: json-parse-even-better-errors@2.3.1 from lock file
2026-03-10T06:12:30.3287921Z npm error Missing: lines-and-columns@1.2.4 from lock file
2026-03-10T06:12:30.3288393Z npm error Missing: is-arrayish@0.2.1 from lock file
2026-03-10T06:12:30.3288831Z npm error Missing: find-up@4.1.0 from lock file
2026-03-10T06:12:30.3289271Z npm error Missing: ansi-styles@5.2.0 from lock file
2026-03-10T06:12:30.3289714Z npm error Missing: react-is@18.3.1 from lock file
2026-03-10T06:12:30.3290157Z npm error Missing: resolve-from@5.0.0 from lock file
2026-03-10T06:12:30.3290617Z npm error Missing: buffer-from@1.1.2 from lock file
2026-03-10T06:12:30.3291059Z npm error Missing: source-map@0.6.1 from lock file
2026-03-10T06:12:30.3291552Z npm error Missing: escape-string-regexp@2.0.0 from lock file
2026-03-10T06:12:30.3292029Z npm error Missing: char-regex@1.0.2 from lock file
2026-03-10T06:12:30.3292474Z npm error Missing: @pkgr/core@0.2.9 from lock file
2026-03-10T06:12:30.3292901Z npm error Missing: glob@7.2.3 from lock file
2026-03-10T06:12:30.3293326Z npm error Missing: minimatch@3.1.5 from lock file
2026-03-10T06:12:30.3293893Z npm error Missing: @unrs/resolver-binding-android-arm-eabi@1.11.1 from lock file
2026-03-10T06:12:30.3294566Z npm error Missing: @unrs/resolver-binding-android-arm64@1.11.1 from lock file
2026-03-10T06:12:30.3295212Z npm error Missing: @unrs/resolver-binding-darwin-arm64@1.11.1 from lock file
2026-03-10T06:12:30.3295964Z npm error Missing: @unrs/resolver-binding-darwin-x64@1.11.1 from lock file
2026-03-10T06:12:30.3296688Z npm error Missing: @unrs/resolver-binding-freebsd-x64@1.11.1 from lock file
2026-03-10T06:12:30.3297357Z npm error Missing: @unrs/resolver-binding-linux-arm-gnueabihf@1.11.1 from lock file
2026-03-10T06:12:30.3298068Z npm error Missing: @unrs/resolver-binding-linux-arm-musleabihf@1.11.1 from lock file
2026-03-10T06:12:30.3298759Z npm error Missing: @unrs/resolver-binding-linux-arm64-gnu@1.11.1 from lock file
2026-03-10T06:12:30.3299430Z npm error Missing: @unrs/resolver-binding-linux-arm64-musl@1.11.1 from lock file
2026-03-10T06:12:30.3300103Z npm error Missing: @unrs/resolver-binding-linux-ppc64-gnu@1.11.1 from lock file
2026-03-10T06:12:30.3300783Z npm error Missing: @unrs/resolver-binding-linux-riscv64-gnu@1.11.1 from lock file
2026-03-10T06:12:30.3301476Z npm error Missing: @unrs/resolver-binding-linux-riscv64-musl@1.11.1 from lock file
2026-03-10T06:12:30.3302149Z npm error Missing: @unrs/resolver-binding-linux-s390x-gnu@1.11.1 from lock file
2026-03-10T06:12:30.3302807Z npm error Missing: @unrs/resolver-binding-linux-x64-gnu@1.11.1 from lock file
2026-03-10T06:12:30.3303457Z npm error Missing: @unrs/resolver-binding-linux-x64-musl@1.11.1 from lock file
2026-03-10T06:12:30.3304100Z npm error Missing: @unrs/resolver-binding-wasm32-wasi@1.11.1 from lock file
2026-03-10T06:12:30.3304749Z npm error Missing: @unrs/resolver-binding-win32-arm64-msvc@1.11.1 from lock file
2026-03-10T06:12:30.3305522Z npm error Missing: @unrs/resolver-binding-win32-ia32-msvc@1.11.1 from lock file
2026-03-10T06:12:30.3306178Z npm error Missing: @unrs/resolver-binding-win32-x64-msvc@1.11.1 from lock file
2026-03-10T06:12:30.3306851Z npm error Missing: napi-postinstall@0.3.4 from lock file
2026-03-10T06:12:30.3307369Z npm error Missing: @napi-rs/wasm-runtime@0.2.12 from lock file
2026-03-10T06:12:30.3307863Z npm error Missing: @emnapi/core@1.8.1 from lock file
2026-03-10T06:12:30.3308336Z npm error Missing: @emnapi/runtime@1.8.1 from lock file
2026-03-10T06:12:30.3308825Z npm error Missing: @tybys/wasm-util@0.10.1 from lock file
2026-03-10T06:12:30.3309329Z npm error Missing: @emnapi/wasi-threads@1.1.0 from lock file
2026-03-10T06:12:30.3309803Z npm error Missing: makeerror@1.0.12 from lock file
2026-03-10T06:12:30.3310230Z npm error Missing: tmpl@1.0.5 from lock file
2026-03-10T06:12:30.3310650Z npm error Missing: yallist@3.1.1 from lock file
2026-03-10T06:12:30.3311121Z npm error Missing: locate-path@5.0.0 from lock file
2026-03-10T06:12:30.3311572Z npm error Missing: argparse@1.0.10 from lock file
2026-03-10T06:12:30.3312004Z npm error Missing: esprima@4.0.1 from lock file
2026-03-10T06:12:30.3312436Z npm error Missing: sprintf-js@1.0.3 from lock file
2026-03-10T06:12:30.3312874Z npm error Missing: p-locate@4.1.0 from lock file
2026-03-10T06:12:30.3313300Z npm error Missing: p-limit@2.3.0 from lock file
2026-03-10T06:12:30.3313716Z npm error Missing: p-try@2.2.0 from lock file
2026-03-10T06:12:30.3314150Z npm error Missing: locate-path@5.0.0 from lock file
2026-03-10T06:12:30.3314596Z npm error Missing: p-locate@4.1.0 from lock file
2026-03-10T06:12:30.3315020Z npm error Missing: p-limit@2.3.0 from lock file
2026-03-10T06:12:30.3315455Z npm error Missing: fs.realpath@1.0.0 from lock file
2026-03-10T06:12:30.3315886Z npm error Missing: inflight@1.0.6 from lock file
2026-03-10T06:12:30.3316443Z npm error Missing: path-is-absolute@1.0.1 from lock file
2026-03-10T06:12:30.3316940Z npm error Missing: brace-expansion@1.1.12 from lock file
2026-03-10T06:12:30.3317420Z npm error Missing: balanced-match@1.0.2 from lock file
2026-03-10T06:12:30.3317782Z npm error
2026-03-10T06:12:30.3318085Z npm error Clean install a project
2026-03-10T06:12:30.3318407Z npm error
2026-03-10T06:12:30.3318658Z npm error Usage:
2026-03-10T06:12:30.3318927Z npm error npm ci
2026-03-10T06:12:30.3319181Z npm error
2026-03-10T06:12:30.3319446Z npm error Options:
2026-03-10T06:12:30.3319952Z npm error [--install-strategy <hoisted|nested|shallow|linked>] [--legacy-bundling]
2026-03-10T06:12:30.3320802Z npm error [--global-style] [--omit <dev|optional|peer> [--omit <dev|optional|peer> ...]]
2026-03-10T06:12:30.3321522Z npm error [--include <prod|dev|optional|peer> [--include <prod|dev|optional|peer> ...]]
2026-03-10T06:12:30.3322241Z npm error [--strict-peer-deps] [--foreground-scripts] [--ignore-scripts] [--no-audit]
2026-03-10T06:12:30.3322816Z npm error [--no-bin-links] [--no-fund] [--dry-run]
2026-03-10T06:12:30.3323401Z npm error [-w|--workspace <workspace-name> [-w|--workspace <workspace-name> ...]]
2026-03-10T06:12:30.3324051Z npm error [-ws|--workspaces] [--include-workspace-root] [--install-links]
2026-03-10T06:12:30.3324487Z npm error
2026-03-10T06:12:30.3324905Z npm error aliases: clean-install, ic, install-clean, isntall-clean
2026-03-10T06:12:30.3325320Z npm error
2026-03-10T06:12:30.3325624Z npm error Run "npm help ci" for more info
2026-03-10T06:12:30.3327134Z npm error A complete log of this run can be found in: /www-data-home/.npm/_logs/2026-03-10T06_11_47_219Z-debug-0.log. For more details see the logs at https://console.cloud.google.com/cloud-build/builds;region=us-central1/18612a3a-5248-41d1-a4d9-0cb39bb693bc?project=350817205989.
2026-03-10T06:12:30.3474405Z [2026-03-10T06:12:30.347Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:12:30.3494221Z [2026-03-10T06:12:30.347Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:12:40.3485561Z [2026-03-10T06:12:40.347Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:12:40.3487397Z [2026-03-10T06:12:40.348Z] No OAuth tokens found
2026-03-10T06:12:40.3489750Z [2026-03-10T06:12:40.348Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:12:40.4405705Z [2026-03-10T06:12:40.440Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:12:40.4425308Z [2026-03-10T06:12:40.440Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:12:50.4418890Z [2026-03-10T06:12:50.441Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:12:50.4420373Z [2026-03-10T06:12:50.441Z] No OAuth tokens found
2026-03-10T06:12:50.4422817Z [2026-03-10T06:12:50.441Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:12:50.7525013Z [2026-03-10T06:12:50.752Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:12:50.7545413Z [2026-03-10T06:12:50.752Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:13:00.7537229Z [2026-03-10T06:13:00.753Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:13:00.7538591Z [2026-03-10T06:13:00.753Z] No OAuth tokens found
2026-03-10T06:13:00.7541541Z [2026-03-10T06:13:00.753Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:13:00.8546452Z [2026-03-10T06:13:00.854Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:13:00.8567099Z [2026-03-10T06:13:00.854Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:13:10.8552677Z [2026-03-10T06:13:10.854Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:13:10.8553834Z [2026-03-10T06:13:10.855Z] No OAuth tokens found
2026-03-10T06:13:10.8556550Z [2026-03-10T06:13:10.855Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:13:11.1831637Z [2026-03-10T06:13:11.182Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:13:11.1853135Z [2026-03-10T06:13:11.182Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:13:21.1844324Z [2026-03-10T06:13:21.183Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:13:21.1845850Z [2026-03-10T06:13:21.184Z] No OAuth tokens found
2026-03-10T06:13:21.1848651Z [2026-03-10T06:13:21.184Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:13:21.5024721Z [2026-03-10T06:13:21.501Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:13:21.5046792Z [2026-03-10T06:13:21.502Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:13:31.5036895Z [2026-03-10T06:13:31.503Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:13:31.5038245Z [2026-03-10T06:13:31.503Z] No OAuth tokens found
2026-03-10T06:13:31.5041107Z [2026-03-10T06:13:31.503Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:13:31.8211965Z [2026-03-10T06:13:31.820Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:13:31.8234164Z [2026-03-10T06:13:31.820Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:13:41.8222010Z [2026-03-10T06:13:41.821Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:13:41.8223538Z [2026-03-10T06:13:41.822Z] No OAuth tokens found
2026-03-10T06:13:41.8226055Z [2026-03-10T06:13:41.822Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:13:42.1080449Z [2026-03-10T06:13:42.107Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:13:42.1113103Z [2026-03-10T06:13:42.107Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:13:52.1082508Z [2026-03-10T06:13:52.107Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:13:52.1083930Z [2026-03-10T06:13:52.108Z] No OAuth tokens found
2026-03-10T06:13:52.1087030Z [2026-03-10T06:13:52.108Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:13:52.2014890Z [2026-03-10T06:13:52.201Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:13:52.2035286Z [2026-03-10T06:13:52.201Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:14:02.2014350Z [2026-03-10T06:14:02.200Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:14:02.2015562Z [2026-03-10T06:14:02.201Z] No OAuth tokens found
2026-03-10T06:14:02.2018269Z [2026-03-10T06:14:02.201Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:14:02.3101468Z [2026-03-10T06:14:02.309Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:14:02.3121354Z [2026-03-10T06:14:02.309Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build in progress","state":"IN_PROGRESS","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","state":"NOT_STARTED"***],"operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:14:12.3110345Z [2026-03-10T06:14:12.310Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:14:12.3112367Z [2026-03-10T06:14:12.310Z] No OAuth tokens found
2026-03-10T06:14:12.3114924Z [2026-03-10T06:14:12.311Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:14:12.6113626Z [2026-03-10T06:14:12.610Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:14:12.6142418Z [2026-03-10T06:14:12.611Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build finished","state":"COMPLETE","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","message":"Updating Cloud Run service","state":"IN_PROGRESS","resource":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","resourceUri":"https://console.cloud.google.com/run/detail/us-central1/ssrportfoliodanilonovai?project=***","stateMessages":[***"severity":"INFO","type":"CloudRunServiceNewRevisionTrafficInfo","message":"A new revision will be deployed serving with 100% traffic."***]***],"sourceToken":"Cldwcm9qZWN0cy8zNTA4MTcyMDU5ODkvbG9jYXRpb25zL3VzLWNlbnRyYWwxL2J1aWxkcy82MWFjZGQ0Mi0wZjkyLTQ5NTktYjA2ZS05ZTFmOWMxYjNkN2USiwF1cy1jZW50cmFsMS1kb2NrZXIucGtnLmRldi9wb3J0Zm9saW8tZGFuaWxvLW5vdmFpcy9nY2YtYXJ0aWZhY3RzL3BvcnRmb2xpby0tZGFuaWxvLS1ub3ZhaXNfX3VzLS1jZW50cmFsMV9fc3NycG9ydGZvbGlvZGFuaWxvbm92YWk6dmVyc2lvbl8xGOX91vKaCiJYcHJvamVjdHMvcG9ydGZvbGlvLWRhbmlsby1ub3ZhaXMvbG9jYXRpb25zL3VzLWNlbnRyYWwxL2Z1bmN0aW9ucy9zc3Jwb3J0Zm9saW9kYW5pbG9ub3ZhaSoMCK7tvs0GENjYmd0CMghub2RlanMyMDp2CiNnY3IuaW8vZ2FlLXJ1bnRpbWVzL25vZGVqczIwOnN0YWJsZRJPdXMtY2VudHJhbDEtZG9ja2VyLnBrZy5kZXYvc2VydmVybGVzcy1ydW50aW1lcy9nb29nbGUtMjItZnVsbC9ydW50aW1lcy9ub2RlanMyMEAB","operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:14:12.6168844Z [2026-03-10T06:14:12.611Z] Got source token Cldwcm9qZWN0cy8zNTA4MTcyMDU5ODkvbG9jYXRpb25zL3VzLWNlbnRyYWwxL2J1aWxkcy82MWFjZGQ0Mi0wZjkyLTQ5NTktYjA2ZS05ZTFmOWMxYjNkN2USiwF1cy1jZW50cmFsMS1kb2NrZXIucGtnLmRldi9wb3J0Zm9saW8tZGFuaWxvLW5vdmFpcy9nY2YtYXJ0aWZhY3RzL3BvcnRmb2xpby0tZGFuaWxvLS1ub3ZhaXNfX3VzLS1jZW50cmFsMV9fc3NycG9ydGZvbGlvZGFuaWxvbm92YWk6dmVyc2lvbl8xGOX91vKaCiJYcHJvamVjdHMvcG9ydGZvbGlvLWRhbmlsby1ub3ZhaXMvbG9jYXRpb25zL3VzLWNlbnRyYWwxL2Z1bmN0aW9ucy9zc3Jwb3J0Zm9saW9kYW5pbG9ub3ZhaSoMCK7tvs0GENjYmd0CMghub2RlanMyMDp2CiNnY3IuaW8vZ2FlLXJ1bnRpbWVzL25vZGVqczIwOnN0YWJsZRJPdXMtY2VudHJhbDEtZG9ja2VyLnBrZy5kZXYvc2VydmVybGVzcy1ydW50aW1lcy9nb29nbGUtMjItZnVsbC9ydW50aW1lcy9ub2RlanMyMEAB for region us-central1
2026-03-10T06:14:22.6124404Z [2026-03-10T06:14:22.611Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:14:22.6128494Z [2026-03-10T06:14:22.612Z] No OAuth tokens found
2026-03-10T06:14:22.6130619Z [2026-03-10T06:14:22.612Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:14:22.9394345Z [2026-03-10T06:14:22.938Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:14:22.9423027Z [2026-03-10T06:14:22.939Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build finished","state":"COMPLETE","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","message":"Updating Cloud Run service","state":"IN_PROGRESS","resource":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","resourceUri":"https://console.cloud.google.com/run/detail/us-central1/ssrportfoliodanilonovai?project=***","stateMessages":[***"severity":"INFO","type":"CloudRunServiceNewRevisionTrafficInfo","message":"A new revision will be deployed serving with 100% traffic."***]***],"sourceToken":"Cldwcm9qZWN0cy8zNTA4MTcyMDU5ODkvbG9jYXRpb25zL3VzLWNlbnRyYWwxL2J1aWxkcy82MWFjZGQ0Mi0wZjkyLTQ5NTktYjA2ZS05ZTFmOWMxYjNkN2USiwF1cy1jZW50cmFsMS1kb2NrZXIucGtnLmRldi9wb3J0Zm9saW8tZGFuaWxvLW5vdmFpcy9nY2YtYXJ0aWZhY3RzL3BvcnRmb2xpby0tZGFuaWxvLS1ub3ZhaXNfX3VzLS1jZW50cmFsMV9fc3NycG9ydGZvbGlvZGFuaWxvbm92YWk6dmVyc2lvbl8xGOX91vKaCiJYcHJvamVjdHMvcG9ydGZvbGlvLWRhbmlsby1ub3ZhaXMvbG9jYXRpb25zL3VzLWNlbnRyYWwxL2Z1bmN0aW9ucy9zc3Jwb3J0Zm9saW9kYW5pbG9ub3ZhaSoMCK7tvs0GENjYmd0CMghub2RlanMyMDp2CiNnY3IuaW8vZ2FlLXJ1bnRpbWVzL25vZGVqczIwOnN0YWJsZRJPdXMtY2VudHJhbDEtZG9ja2VyLnBrZy5kZXYvc2VydmVybGVzcy1ydW50aW1lcy9nb29nbGUtMjItZnVsbC9ydW50aW1lcy9ub2RlanMyMEAB","operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:14:22.9449359Z [2026-03-10T06:14:22.939Z] Got source token Cldwcm9qZWN0cy8zNTA4MTcyMDU5ODkvbG9jYXRpb25zL3VzLWNlbnRyYWwxL2J1aWxkcy82MWFjZGQ0Mi0wZjkyLTQ5NTktYjA2ZS05ZTFmOWMxYjNkN2USiwF1cy1jZW50cmFsMS1kb2NrZXIucGtnLmRldi9wb3J0Zm9saW8tZGFuaWxvLW5vdmFpcy9nY2YtYXJ0aWZhY3RzL3BvcnRmb2xpby0tZGFuaWxvLS1ub3ZhaXNfX3VzLS1jZW50cmFsMV9fc3NycG9ydGZvbGlvZGFuaWxvbm92YWk6dmVyc2lvbl8xGOX91vKaCiJYcHJvamVjdHMvcG9ydGZvbGlvLWRhbmlsby1ub3ZhaXMvbG9jYXRpb25zL3VzLWNlbnRyYWwxL2Z1bmN0aW9ucy9zc3Jwb3J0Zm9saW9kYW5pbG9ub3ZhaSoMCK7tvs0GENjYmd0CMghub2RlanMyMDp2CiNnY3IuaW8vZ2FlLXJ1bnRpbWVzL25vZGVqczIwOnN0YWJsZRJPdXMtY2VudHJhbDEtZG9ja2VyLnBrZy5kZXYvc2VydmVybGVzcy1ydW50aW1lcy9nb29nbGUtMjItZnVsbC9ydW50aW1lcy9ub2RlanMyMEAB for region us-central1
2026-03-10T06:14:32.9397902Z [2026-03-10T06:14:32.939Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:14:32.9405819Z [2026-03-10T06:14:32.939Z] No OAuth tokens found
2026-03-10T06:14:32.9409058Z [2026-03-10T06:14:32.940Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:14:33.0622349Z [2026-03-10T06:14:33.061Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:14:33.0653498Z [2026-03-10T06:14:33.061Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build finished","state":"COMPLETE","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","message":"Updating Cloud Run service","state":"IN_PROGRESS","resource":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","resourceUri":"https://console.cloud.google.com/run/detail/us-central1/ssrportfoliodanilonovai?project=***","stateMessages":[***"severity":"INFO","type":"CloudRunServiceNewRevisionTrafficInfo","message":"A new revision will be deployed serving with 100% traffic."***]***],"sourceToken":"Cldwcm9qZWN0cy8zNTA4MTcyMDU5ODkvbG9jYXRpb25zL3VzLWNlbnRyYWwxL2J1aWxkcy82MWFjZGQ0Mi0wZjkyLTQ5NTktYjA2ZS05ZTFmOWMxYjNkN2USiwF1cy1jZW50cmFsMS1kb2NrZXIucGtnLmRldi9wb3J0Zm9saW8tZGFuaWxvLW5vdmFpcy9nY2YtYXJ0aWZhY3RzL3BvcnRmb2xpby0tZGFuaWxvLS1ub3ZhaXNfX3VzLS1jZW50cmFsMV9fc3NycG9ydGZvbGlvZGFuaWxvbm92YWk6dmVyc2lvbl8xGOX91vKaCiJYcHJvamVjdHMvcG9ydGZvbGlvLWRhbmlsby1ub3ZhaXMvbG9jYXRpb25zL3VzLWNlbnRyYWwxL2Z1bmN0aW9ucy9zc3Jwb3J0Zm9saW9kYW5pbG9ub3ZhaSoMCK7tvs0GENjYmd0CMghub2RlanMyMDp2CiNnY3IuaW8vZ2FlLXJ1bnRpbWVzL25vZGVqczIwOnN0YWJsZRJPdXMtY2VudHJhbDEtZG9ja2VyLnBrZy5kZXYvc2VydmVybGVzcy1ydW50aW1lcy9nb29nbGUtMjItZnVsbC9ydW50aW1lcy9ub2RlanMyMEAB","operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:14:33.0681370Z [2026-03-10T06:14:33.062Z] Got source token Cldwcm9qZWN0cy8zNTA4MTcyMDU5ODkvbG9jYXRpb25zL3VzLWNlbnRyYWwxL2J1aWxkcy82MWFjZGQ0Mi0wZjkyLTQ5NTktYjA2ZS05ZTFmOWMxYjNkN2USiwF1cy1jZW50cmFsMS1kb2NrZXIucGtnLmRldi9wb3J0Zm9saW8tZGFuaWxvLW5vdmFpcy9nY2YtYXJ0aWZhY3RzL3BvcnRmb2xpby0tZGFuaWxvLS1ub3ZhaXNfX3VzLS1jZW50cmFsMV9fc3NycG9ydGZvbGlvZGFuaWxvbm92YWk6dmVyc2lvbl8xGOX91vKaCiJYcHJvamVjdHMvcG9ydGZvbGlvLWRhbmlsby1ub3ZhaXMvbG9jYXRpb25zL3VzLWNlbnRyYWwxL2Z1bmN0aW9ucy9zc3Jwb3J0Zm9saW9kYW5pbG9ub3ZhaSoMCK7tvs0GENjYmd0CMghub2RlanMyMDp2CiNnY3IuaW8vZ2FlLXJ1bnRpbWVzL25vZGVqczIwOnN0YWJsZRJPdXMtY2VudHJhbDEtZG9ja2VyLnBrZy5kZXYvc2VydmVybGVzcy1ydW50aW1lcy9nb29nbGUtMjItZnVsbC9ydW50aW1lcy9ub2RlanMyMEAB for region us-central1
2026-03-10T06:14:43.0631708Z [2026-03-10T06:14:43.062Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:14:43.0633177Z [2026-03-10T06:14:43.063Z] No OAuth tokens found
2026-03-10T06:14:43.0635889Z [2026-03-10T06:14:43.063Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:14:43.3864832Z [2026-03-10T06:14:43.385Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:14:43.3894596Z [2026-03-10T06:14:43.386Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build finished","state":"COMPLETE","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","message":"Updating Cloud Run service","state":"IN_PROGRESS","resource":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","resourceUri":"https://console.cloud.google.com/run/detail/us-central1/ssrportfoliodanilonovai?project=***","stateMessages":[***"severity":"INFO","type":"CloudRunServiceNewRevisionTrafficInfo","message":"A new revision will be deployed serving with 100% traffic."***]***],"sourceToken":"Cldwcm9qZWN0cy8zNTA4MTcyMDU5ODkvbG9jYXRpb25zL3VzLWNlbnRyYWwxL2J1aWxkcy82MWFjZGQ0Mi0wZjkyLTQ5NTktYjA2ZS05ZTFmOWMxYjNkN2USiwF1cy1jZW50cmFsMS1kb2NrZXIucGtnLmRldi9wb3J0Zm9saW8tZGFuaWxvLW5vdmFpcy9nY2YtYXJ0aWZhY3RzL3BvcnRmb2xpby0tZGFuaWxvLS1ub3ZhaXNfX3VzLS1jZW50cmFsMV9fc3NycG9ydGZvbGlvZGFuaWxvbm92YWk6dmVyc2lvbl8xGOX91vKaCiJYcHJvamVjdHMvcG9ydGZvbGlvLWRhbmlsby1ub3ZhaXMvbG9jYXRpb25zL3VzLWNlbnRyYWwxL2Z1bmN0aW9ucy9zc3Jwb3J0Zm9saW9kYW5pbG9ub3ZhaSoMCK7tvs0GENjYmd0CMghub2RlanMyMDp2CiNnY3IuaW8vZ2FlLXJ1bnRpbWVzL25vZGVqczIwOnN0YWJsZRJPdXMtY2VudHJhbDEtZG9ja2VyLnBrZy5kZXYvc2VydmVybGVzcy1ydW50aW1lcy9nb29nbGUtMjItZnVsbC9ydW50aW1lcy9ub2RlanMyMEAB","operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":false***
2026-03-10T06:14:43.3920855Z [2026-03-10T06:14:43.386Z] Got source token Cldwcm9qZWN0cy8zNTA4MTcyMDU5ODkvbG9jYXRpb25zL3VzLWNlbnRyYWwxL2J1aWxkcy82MWFjZGQ0Mi0wZjkyLTQ5NTktYjA2ZS05ZTFmOWMxYjNkN2USiwF1cy1jZW50cmFsMS1kb2NrZXIucGtnLmRldi9wb3J0Zm9saW8tZGFuaWxvLW5vdmFpcy9nY2YtYXJ0aWZhY3RzL3BvcnRmb2xpby0tZGFuaWxvLS1ub3ZhaXNfX3VzLS1jZW50cmFsMV9fc3NycG9ydGZvbGlvZGFuaWxvbm92YWk6dmVyc2lvbl8xGOX91vKaCiJYcHJvamVjdHMvcG9ydGZvbGlvLWRhbmlsby1ub3ZhaXMvbG9jYXRpb25zL3VzLWNlbnRyYWwxL2Z1bmN0aW9ucy9zc3Jwb3J0Zm9saW9kYW5pbG9ub3ZhaSoMCK7tvs0GENjYmd0CMghub2RlanMyMDp2CiNnY3IuaW8vZ2FlLXJ1bnRpbWVzL25vZGVqczIwOnN0YWJsZRJPdXMtY2VudHJhbDEtZG9ja2VyLnBrZy5kZXYvc2VydmVybGVzcy1ydW50aW1lcy9nb29nbGUtMjItZnVsbC9ydW50aW1lcy9ub2RlanMyMEAB for region us-central1
2026-03-10T06:14:53.3875401Z [2026-03-10T06:14:53.387Z] [update-firebase-frameworks-***-us-central1-ssrportfoliodanilonovai] Retrying task index 0
2026-03-10T06:14:53.3877051Z [2026-03-10T06:14:53.387Z] No OAuth tokens found
2026-03-10T06:14:53.3879065Z [2026-03-10T06:14:53.387Z] >>> [apiv2][query] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db [none]
2026-03-10T06:14:53.4917329Z [2026-03-10T06:14:53.491Z] <<< [apiv2][status] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db 200
2026-03-10T06:14:53.4969961Z [2026-03-10T06:14:53.491Z] <<< [apiv2][body] GET https://cloudfunctions.googleapis.com/v2/projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db ***"name":"projects/***/locations/us-central1/operations/operation-1773123061409-64ca56237e58e-f854df43-1e2473db","metadata":***"@type":"type.googleapis.com/google.cloud.functions.v2.OperationMetadata","createTime":"2026-03-10T06:11:02.438555488Z","endTime":"2026-03-10T06:14:45.889573628Z","target":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","verb":"update","cancelRequested":false,"apiVersion":"v2","requestResource":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773063125677388"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00154-veh","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","labels":***"deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***","firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","satisfiesPzi":true***,"stages":[***"name":"BUILD","message":"Build finished","state":"COMPLETE","resource":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","resourceUri":"https://console.cloud.google.com/cloud-build/builds;region=us-central1/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e?project=350817205989"***,***"name":"SERVICE","message":"Updating Cloud Run service","state":"COMPLETE","resource":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","resourceUri":"https://console.cloud.google.com/run/detail/us-central1/ssrportfoliodanilonovai?project=***","stateMessages":[***"severity":"INFO","type":"CloudRunServiceNewRevisionTrafficInfo","message":"A new revision will be deployed serving with 100% traffic."***]***],"sourceToken":"Cldwcm9qZWN0cy8zNTA4MTcyMDU5ODkvbG9jYXRpb25zL3VzLWNlbnRyYWwxL2J1aWxkcy82MWFjZGQ0Mi0wZjkyLTQ5NTktYjA2ZS05ZTFmOWMxYjNkN2USiwF1cy1jZW50cmFsMS1kb2NrZXIucGtnLmRldi9wb3J0Zm9saW8tZGFuaWxvLW5vdmFpcy9nY2YtYXJ0aWZhY3RzL3BvcnRmb2xpby0tZGFuaWxvLS1ub3ZhaXNfX3VzLS1jZW50cmFsMV9fc3NycG9ydGZvbGlvZGFuaWxvbm92YWk6dmVyc2lvbl8xGOX91vKaCiJYcHJvamVjdHMvcG9ydGZvbGlvLWRhbmlsby1ub3ZhaXMvbG9jYXRpb25zL3VzLWNlbnRyYWwxL2Z1bmN0aW9ucy9zc3Jwb3J0Zm9saW9kYW5pbG9ub3ZhaSoMCK7tvs0GENjYmd0CMghub2RlanMyMDp2CiNnY3IuaW8vZ2FlLXJ1bnRpbWVzL25vZGVqczIwOnN0YWJsZRJPdXMtY2VudHJhbDEtZG9ja2VyLnBrZy5kZXYvc2VydmVybGVzcy1ydW50aW1lcy9nb29nbGUtMjItZnVsbC9ydW50aW1lcy9ub2RlanMyMEAB","operationType":"UPDATE_FUNCTION","buildName":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e"***,"done":true,"response":***"@type":"type.googleapis.com/google.cloud.functions.v2.Function","name":"projects/***/locations/us-central1/functions/ssrportfoliodanilonovai","buildConfig":***"build":"projects/350817205989/locations/us-central1/builds/61acdd42-0f92-4959-b06e-9e1f9c1b3d7e","runtime":"nodejs20","entryPoint":"ssrportfoliodanilonovai","source":***"storageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"environmentVariables":***"GOOGLE_NODE_RUN_SCRIPTS":""***,"dockerRepository":"projects/***/locations/us-central1/repositories/gcf-artifacts","sourceProvenance":***"resolvedStorageSource":***"bucket":"gcf-v2-sources-350817205989-us-central1","object":"ssrportfoliodanilonovai/function-source.zip","generation":"1773123062346569"***,"dockerRegistry":"ARTIFACT_REGISTRY","serviceAccount":"projects/***/serviceAccounts/350817205989-compute@developer.gserviceaccount.com","automaticUpdatePolicy":***,"serviceConfig":***"service":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","timeoutSeconds":60,"environmentVariables":***"VERCEL_URL":"***.web.app","__FIREBASE_FRAMEWORKS_ENTRY__":"next.js","__FIREBASE_DEFAULTS__":"***\"config\":***\"projectId\":\"***\",\"appId\":\"1:350817205989:web:f7ae32f12d353ef081de0c\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\",\"apiKey\":\"AIzaSyDTd1kCNXmWXFKqrbEjrtC3t55DfzSJXU4\",\"authDomain\":\"***.firebaseapp.com\",\"messagingSenderId\":\"350817205989\",\"measurementId\":\"G-PM34VYPZZW\",\"projectNumber\":\"350817205989\",\"version\":\"2\"***,\"_authTokenSyncURL\":\"/__session\"***","FIREBASE_CONFIG":"***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***","GCLOUD_PROJECT":"***","EVENTARC_CLOUD_EVENT_SOURCE":"projects/***/locations/us-central1/services/ssrportfoliodanilonovai","FUNCTION_TARGET":"ssrportfoliodanilonovai","LOG_EXECUTION_ID":"true"***,"maxInstanceCount":3,"ingressSettings":"ALLOW_ALL","uri":"https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app","serviceAccountEmail":"350817205989-compute@developer.gserviceaccount.com","availableMemory":"256Mi","allTrafficOnLatestRevision":true,"revision":"ssrportfoliodanilonovai-00156-san","maxInstanceRequestConcurrency":80,"availableCpu":"1"***,"state":"ACTIVE","updateTime":"2026-03-10T06:11:02.440287987Z","labels":***"firebase-functions-hash":"aa22f6ffae430fe08e355f042fd9d7d42abf0408","deployment-tool":"cli-firebase","firebase-functions-codebase":"firebase-frameworks-***"***,"environment":"GEN_2","url":"https://us-central1-***.cloudfunctions.net/ssrportfoliodanilonovai","createTime":"2026-02-15T13:30:47.483217832Z","satisfiesPzi":true***
2026-03-10T06:14:53.5006494Z [2026-03-10T06:14:53.491Z] Got source token Cldwcm9qZWN0cy8zNTA4MTcyMDU5ODkvbG9jYXRpb25zL3VzLWNlbnRyYWwxL2J1aWxkcy82MWFjZGQ0Mi0wZjkyLTQ5NTktYjA2ZS05ZTFmOWMxYjNkN2USiwF1cy1jZW50cmFsMS1kb2NrZXIucGtnLmRldi9wb3J0Zm9saW8tZGFuaWxvLW5vdmFpcy9nY2YtYXJ0aWZhY3RzL3BvcnRmb2xpby0tZGFuaWxvLS1ub3ZhaXNfX3VzLS1jZW50cmFsMV9fc3NycG9ydGZvbGlvZGFuaWxvbm92YWk6dmVyc2lvbl8xGOX91vKaCiJYcHJvamVjdHMvcG9ydGZvbGlvLWRhbmlsby1ub3ZhaXMvbG9jYXRpb25zL3VzLWNlbnRyYWwxL2Z1bmN0aW9ucy9zc3Jwb3J0Zm9saW9kYW5pbG9ub3ZhaSoMCK7tvs0GENjYmd0CMghub2RlanMyMDp2CiNnY3IuaW8vZ2FlLXJ1bnRpbWVzL25vZGVqczIwOnN0YWJsZRJPdXMtY2VudHJhbDEtZG9ja2VyLnBrZy5kZXYvc2VydmVybGVzcy1ydW50aW1lcy9nb29nbGUtMjItZnVsbC9ydW50aW1lcy9ub2RlanMyMEAB for region us-central1
2026-03-10T06:14:53.5013104Z ✔  functions[firebase-frameworks-***:ssrportfoliodanilonovai(us-central1)] Successful update operation. 
2026-03-10T06:14:53.5013859Z [2026-03-10T06:14:53.492Z] Total Function Deployment time: 232185
2026-03-10T06:14:53.5014363Z [2026-03-10T06:14:53.492Z] 2 Functions Deployed
2026-03-10T06:14:53.5014795Z [2026-03-10T06:14:53.492Z] 1 Functions Errored
2026-03-10T06:14:53.5015257Z [2026-03-10T06:14:53.492Z] 0 Function Deployments Aborted
2026-03-10T06:14:53.5015788Z [2026-03-10T06:14:53.493Z] Average Function Deployment time: 160590
2026-03-10T06:14:53.5016091Z 
2026-03-10T06:14:53.5016621Z Functions deploy had errors with the following functions:
2026-03-10T06:14:53.5017062Z 	heartbeat(us-central1)
2026-03-10T06:14:53.5017807Z [2026-03-10T06:14:53.493Z] Not printing URL for HTTPS function. Typically this means it didn't match a filter or we failed deployment
2026-03-10T06:14:53.5019054Z Function URL (firebase-frameworks-***:ssrportfoliodanilonovai(us-central1)): https://ssrportfoliodanilonovai-qc26fkohcq-uc.a.run.app
2026-03-10T06:14:53.5019823Z [2026-03-10T06:14:53.494Z] No OAuth tokens found
2026-03-10T06:14:53.5020867Z [2026-03-10T06:14:53.495Z] >>> [apiv2][query] GET https://artifactregistry.googleapis.com/v1/projects/***/locations/us-central1/repositories/gcf-artifacts [none]
2026-03-10T06:14:53.8412000Z [2026-03-10T06:14:53.840Z] <<< [apiv2][status] GET https://artifactregistry.googleapis.com/v1/projects/***/locations/us-central1/repositories/gcf-artifacts 200
2026-03-10T06:14:53.8419441Z [2026-03-10T06:14:53.840Z] <<< [apiv2][body] GET https://artifactregistry.googleapis.com/v1/projects/***/locations/us-central1/repositories/gcf-artifacts ***"name":"projects/***/locations/us-central1/repositories/gcf-artifacts","format":"DOCKER","description":"This repository is created and used by Cloud Functions for storing function docker images.","labels":***"goog-managed-by":"cloudfunctions"***,"createTime":"2026-01-12T06:16:13.804009Z","updateTime":"2026-03-10T06:14:01.295442Z","mode":"STANDARD_REPOSITORY","cleanupPolicies":***"firebase-functions-cleanup":***"id":"firebase-functions-cleanup","action":"DELETE","condition":***"tagState":"ANY","olderThan":"604800s"***,"sizeBytes":"26110505503","vulnerabilityScanningConfig":***"lastEnableTime":"2026-01-12T06:16:13.330841263Z","enablementState":"SCANNING_DISABLED","enablementStateReason":"API containerscanning.googleapis.com is not enabled."***,"satisfiesPzi":true,"registryUri":"us-central1-docker.pkg.dev/***/gcf-artifacts"***
2026-03-10T06:14:53.8423440Z [2026-03-10T06:14:53.841Z] Functions deploy failed.
2026-03-10T06:14:53.8423856Z [2026-03-10T06:14:53.841Z] ***
2026-03-10T06:14:53.8424178Z   "endpoint": ***
2026-03-10T06:14:53.8424460Z     "id": "heartbeat",
2026-03-10T06:14:53.8424815Z     "project": "***",
2026-03-10T06:14:53.8425364Z     "region": "us-central1",
2026-03-10T06:14:53.8425938Z     "entryPoint": "heartbeat",
2026-03-10T06:14:53.8426623Z     "platform": "gcfv2",
2026-03-10T06:14:53.8427132Z     "runtime": "nodejs20",
2026-03-10T06:14:53.8427657Z     "httpsTrigger": ***,
2026-03-10T06:14:53.8428155Z     "labels": ***
2026-03-10T06:14:53.8428821Z       "deployment-tool": "cli-firebase"
2026-03-10T06:14:53.8429521Z     ***,
2026-03-10T06:14:53.8429952Z     "serviceAccount": null,
2026-03-10T06:14:53.8430470Z     "ingressSettings": null,
2026-03-10T06:14:53.8431038Z     "availableMemoryMb": 256,
2026-03-10T06:14:53.8431609Z     "timeoutSeconds": null,
2026-03-10T06:14:53.8432125Z     "maxInstances": 10,
2026-03-10T06:14:53.8432622Z     "minInstances": null,
2026-03-10T06:14:53.8433123Z     "concurrency": 80,
2026-03-10T06:14:53.8433610Z     "vpc": null,
2026-03-10T06:14:53.8434090Z     "environmentVariables": ***
2026-03-10T06:14:53.8435991Z       "FIREBASE_CONFIG": "***\"projectId\":\"***\",\"databaseURL\":\"https://***-default-rtdb.firebaseio.com\",\"storageBucket\":\"***.firebasestorage.app\"***",
2026-03-10T06:14:53.8437654Z       "GCLOUD_PROJECT": "***",
2026-03-10T06:14:53.8438744Z       "EVENTARC_CLOUD_EVENT_SOURCE": "projects/***/locations/us-central1/services/heartbeat",
2026-03-10T06:14:53.8439699Z       "FUNCTION_TARGET": "heartbeat",
2026-03-10T06:14:53.8440323Z       "LOG_EXECUTION_ID": "true"
2026-03-10T06:14:53.8440857Z     ***,
2026-03-10T06:14:53.8441279Z     "codebase": "default",
2026-03-10T06:14:53.8441802Z     "runServiceId": "heartbeat",
2026-03-10T06:14:53.8442122Z     "cpu": 1,
2026-03-10T06:14:53.8442425Z     "securityLevel": "SECURE_ALWAYS",
2026-03-10T06:14:53.8442769Z     "targetedByOnly": false,
2026-03-10T06:14:53.8443151Z     "hash": "03dad288abdddb3db1ad90b736c8009efc4c3cdc"
2026-03-10T06:14:53.8443748Z   ***,
2026-03-10T06:14:53.8444022Z   "op": "update",
2026-03-10T06:14:53.8444303Z   "original": ***
2026-03-10T06:14:53.8444587Z     "name": "FirebaseError",
2026-03-10T06:14:53.8444895Z     "children": [],
2026-03-10T06:14:53.8445166Z     "exit": 1,
2026-03-10T06:14:53.8504419Z     "message": "Build failed with status: FAILURE and message: npm error code EUSAGE\nnpm error\nnpm error `npm ci` can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock file with `npm install` before continuing.\nnpm error\nnpm error Missing: jest@30.3.0 from lock file\nnpm error Missing: @jest/core@30.3.0 from lock file\nnpm error Missing: @jest/types@30.3.0 from lock file\nnpm error Missing: import-local@3.2.0 from lock file\nnpm error Missing: jest-cli@30.3.0 from lock file\nnpm error Missing: @jest/console@30.3.0 from lock file\nnpm error Missing: @jest/pattern@30.0.1 from lock file\nnpm error Missing: @jest/reporters@30.3.0 from lock file\nnpm error Missing: @jest/test-result@30.3.0 from lock file\nnpm error Missing: @jest/transform@30.3.0 from lock file\nnpm error Missing: ansi-escapes@4.3.2 from lock file\nnpm error Missing: ci-info@4.4.0 from lock file\nnpm error Missing: exit-x@0.2.2 from lock file\nnpm error Missing: graceful-fs@4.2.11 from lock file\nnpm error Missing: jest-changed-files@30.3.0 from lock file\nnpm error Missing: jest-config@30.3.0 from lock file\nnpm error Missing: jest-haste-map@30.3.0 from lock file\nnpm error Missing: jest-message-util@30.3.0 from lock file\nnpm error Missing: jest-regex-util@30.0.1 from lock file\nnpm error Missing: jest-resolve@30.3.0 from lock file\nnpm error Missing: jest-resolve-dependencies@30.3.0 from lock file\nnpm error Missing: jest-runner@30.3.0 from lock file\nnpm error Missing: jest-runtime@30.3.0 from lock file\nnpm error Missing: jest-snapshot@30.3.0 from lock file\nnpm error Missing: jest-util@30.3.0 from lock file\nnpm error Missing: jest-validate@30.3.0 from lock file\nnpm error Missing: jest-watcher@30.3.0 from lock file\nnpm error Missing: pretty-format@30.3.0 from lock file\nnpm error Missing: slash@3.0.0 from lock file\nnpm error Missing: @bcoe/v8-coverage@0.2.3 from lock file\nnpm error Missing: @jridgewell/trace-mapping@0.3.31 from lock file\nnpm error Missing: collect-v8-coverage@1.0.3 from lock file\nnpm error Missing: istanbul-lib-coverage@3.2.2 from lock file\nnpm error Missing: istanbul-lib-instrument@6.0.3 from lock file\nnpm error Missing: istanbul-lib-report@3.0.1 from lock file\nnpm error Missing: istanbul-lib-source-maps@5.0.6 from lock file\nnpm error Missing: istanbul-reports@3.2.0 from lock file\nnpm error Missing: jest-worker@30.3.0 from lock file\nnpm error Missing: string-length@4.0.2 from lock file\nnpm error Missing: v8-to-istanbul@9.3.0 from lock file\nnpm error Missing: @types/istanbul-lib-coverage@2.0.6 from lock file\nnpm error Missing: @babel/core@7.29.0 from lock file\nnpm error Missing: babel-plugin-istanbul@7.0.1 from lock file\nnpm error Missing: convert-source-map@2.0.0 from lock file\nnpm error Missing: pirates@4.0.7 from lock file\nnpm error Missing: write-file-atomic@5.0.1 from lock file\nnpm error Missing: @babel/code-frame@7.29.0 from lock file\nnpm error Missing: @babel/generator@7.29.1 from lock file\nnpm error Missing: @babel/helper-compilation-targets@7.28.6 from lock file\nnpm error Missing: @babel/helper-module-transforms@7.28.6 from lock file\nnpm error Missing: @babel/helpers@7.28.6 from lock file\nnpm error Missing: @babel/parser@7.29.0 from lock file\nnpm error Missing: @babel/template@7.28.6 from lock file\nnpm error Missing: @babel/traverse@7.29.0 from lock file\nnpm error Missing: @babel/types@7.29.0 from lock file\nnpm error Missing: @jridgewell/remapping@2.3.5 from lock file\nnpm error Missing: gensync@1.0.0-beta.2 from lock file\nnpm error Missing: json5@2.2.3 from lock file\nnpm error Missing: semver@6.3.1 from lock file\nnpm error Missing: @babel/helper-validator-identifier@7.28.5 from lock file\nnpm error Missing: js-tokens@4.0.0 from lock file\nnpm error Missing: picocolors@1.1.1 from lock file\nnpm error Missing: @jridgewell/gen-mapping@0.3.13 from lock file\nnpm error Missing: jsesc@3.1.0 from lock file\nnpm error Missing: @babel/compat-data@7.29.0 from lock file\nnpm error Missing: @babel/helper-validator-option@7.27.1 from lock file\nnpm error Missing: browserslist@4.28.1 from lock file\nnpm error Missing: lru-cache@5.1.1 from lock file\nnpm error Missing: semver@6.3.1 from lock file\nnpm error Missing: @babel/helper-module-imports@7.28.6 from lock file\nnpm error Missing: @babel/helper-globals@7.28.0 from lock file\nnpm error Missing: @babel/helper-string-parser@7.27.1 from lock file\nnpm error Missing: @jest/schemas@30.0.5 from lock file\nnpm error Missing: @types/istanbul-reports@3.0.4 from lock file\nnpm error Missing: @types/yargs@17.0.35 from lock file\nnpm error Missing: @sinclair/typebox@0.34.48 from lock file\nnpm error Missing: @jridgewell/sourcemap-codec@1.5.5 from lock file\nnpm error Missing: @jridgewell/resolve-uri@3.1.2 from lock file\nnpm error Missing: @types/istanbul-lib-report@3.0.3 from lock file\nnpm error Missing: @types/yargs-parser@21.0.3 from lock file\nnpm error Missing: type-fest@0.21.3 from lock file\nnpm error Missing: @babel/helper-plugin-utils@7.28.6 from lock file\nnpm error Missing: @istanbuljs/load-nyc-config@1.1.0 from lock file\nnpm error Missing: @istanbuljs/schema@0.1.3 from lock file\nnpm error Missing: test-exclude@6.0.0 from lock file\nnpm error Missing: camelcase@5.3.1 from lock file\nnpm error Missing: find-up@4.1.0 from lock file\nnpm error Missing: get-package-type@0.1.0 from lock file\nnpm error Missing: js-yaml@3.14.2 from lock file\nnpm error Missing: resolve-from@5.0.0 from lock file\nnpm error Missing: baseline-browser-mapping@2.10.0 from lock file\nnpm error Missing: caniuse-lite@1.0.30001777 from lock file\nnpm error Missing: electron-to-chromium@1.5.307 from lock file\nnpm error Missing: node-releases@2.0.36 from lock file\nnpm error Missing: update-browserslist-db@1.2.3 from lock file\nnpm error Missing: pkg-dir@4.2.0 from lock file\nnpm error Missing: resolve-cwd@3.0.0 from lock file\nnpm error Missing: make-dir@4.0.0 from lock file\nnpm error Missing: html-escaper@2.0.2 from lock file\nnpm error Missing: execa@5.1.1 from lock file\nnpm error Missing: get-stream@6.0.1 from lock file\nnpm error Missing: human-signals@2.1.0 from lock file\nnpm error Missing: merge-stream@2.0.0 from lock file\nnpm error Missing: npm-run-path@4.0.1 from lock file\nnpm error Missing: onetime@5.1.2 from lock file\nnpm error Missing: signal-exit@3.0.7 from lock file\nnpm error Missing: strip-final-newline@2.0.0 from lock file\nnpm error Missing: @jest/get-type@30.1.0 from lock file\nnpm error Missing: @jest/test-sequencer@30.3.0 from lock file\nnpm error Missing: babel-jest@30.3.0 from lock file\nnpm error Missing: deepmerge@4.3.1 from lock file\nnpm error Missing: jest-circus@30.3.0 from lock file\nnpm error Missing: jest-docblock@30.2.0 from lock file\nnpm error Missing: jest-environment-node@30.3.0 from lock file\nnpm error Missing: parse-json@5.2.0 from lock file\nnpm error Missing: @types/babel__core@7.20.5 from lock file\nnpm error Missing: babel-preset-jest@30.3.0 from lock file\nnpm error Missing: @types/babel__generator@7.27.0 from lock file\nnpm error Missing: @types/babel__template@7.4.4 from lock file\nnpm error Missing: @types/babel__traverse@7.28.0 from lock file\nnpm error Missing: babel-plugin-jest-hoist@30.3.0 from lock file\nnpm error Missing: babel-preset-current-node-syntax@1.2.0 from lock file\nnpm error Missing: @babel/plugin-syntax-async-generators@7.8.4 from lock file\nnpm error Missing: @babel/plugin-syntax-bigint@7.8.3 from lock file\nnpm error Missing: @babel/plugin-syntax-class-properties@7.12.13 from lock file\nnpm error Missing: @babel/plugin-syntax-class-static-block@7.14.5 from lock file\nnpm error Missing: @babel/plugin-syntax-import-attributes@7.28.6 from lock file\nnpm error Missing: @babel/plugin-syntax-import-meta@7.10.4 from lock file\nnpm error Missing: @babel/plugin-syntax-json-strings@7.8.3 from lock file\nnpm error Missing: @babel/plugin-syntax-logical-assignment-operators@7.10.4 from lock file\nnpm error Missing: @babel/plugin-syntax-nullish-coalescing-operator@7.8.3 from lock file\nnpm error Missing: @babel/plugin-syntax-numeric-separator@7.10.4 from lock file\nnpm error Missing: @babel/plugin-syntax-object-rest-spread@7.8.3 from lock file\nnpm error Missing: @babel/plugin-syntax-optional-catch-binding@7.8.3 from lock file\nnpm error Missing: @babel/plugin-syntax-optional-chaining@7.8.3 from lock file\nnpm error Missing: @babel/plugin-syntax-private-property-in-object@7.14.5 from lock file\nnpm error Missing: @babel/plugin-syntax-top-level-await@7.14.5 from lock file\nnpm error Missing: @jest/environment@30.3.0 from lock file\nnpm error Missing: @jest/expect@30.3.0 from lock file\nnpm error Missing: co@4.6.0 from lock file\nnpm error Missing: dedent@1.7.2 from lock file\nnpm error Missing: is-generator-fn@2.1.0 from lock file\nnpm error Missing: jest-each@30.3.0 from lock file\nnpm error Missing: jest-matcher-utils@30.3.0 from lock file\nnpm error Missing: pure-rand@7.0.1 from lock file\nnpm error Missing: stack-utils@2.0.6 from lock file\nnpm error Missing: @jest/fake-timers@30.3.0 from lock file\nnpm error Missing: jest-mock@30.3.0 from lock file\nnpm error Missing: expect@30.3.0 from lock file\nnpm error Missing: @sinonjs/fake-timers@15.1.1 from lock file\nnpm error Missing: @sinonjs/commons@3.0.1 from lock file\nnpm error Missing: type-detect@4.0.8 from lock file\nnpm error Missing: @jest/expect-utils@30.3.0 from lock file\nnpm error Missing: detect-newline@3.1.0 from lock file\nnpm error Missing: anymatch@3.1.3 from lock file\nnpm error Missing: fb-watchman@2.0.2 from lock file\nnpm error Missing: fsevents@2.3.3 from lock file\nnpm error Missing: walker@1.0.8 from lock file\nnpm error Missing: normalize-path@3.0.0 from lock file\nnpm error Missing: picomatch@2.3.1 from lock file\nnpm error Missing: bser@2.1.1 from lock file\nnpm error Missing: node-int64@0.4.0 from lock file\nnpm error Missing: jest-diff@30.3.0 from lock file\nnpm error Missing: @jest/diff-sequences@30.3.0 from lock file\nnpm error Missing: @types/stack-utils@2.0.3 from lock file\nnpm error Missing: jest-pnp-resolver@1.2.3 from lock file\nnpm error Missing: unrs-resolver@1.11.1 from lock file\nnpm error Missing: emittery@0.13.1 from lock file\nnpm error Missing: jest-leak-detector@30.3.0 from lock file\nnpm error Missing: source-map-support@0.5.13 from lock file\nnpm error Missing: @jest/globals@30.3.0 from lock file\nnpm error Missing: @jest/source-map@30.0.1 from lock file\nnpm error Missing: cjs-module-lexer@2.2.0 from lock file\nnpm error Missing: strip-bom@4.0.0 from lock file\nnpm error Missing: @babel/plugin-syntax-jsx@7.28.6 from lock file\nnpm error Missing: @babel/plugin-syntax-typescript@7.28.6 from lock file\nnpm error Missing: @jest/snapshot-utils@30.3.0 from lock file\nnpm error Missing: synckit@0.11.12 from lock file\nnpm error Missing: camelcase@6.3.0 from lock file\nnpm error Missing: leven@3.1.0 from lock file\nnpm error Missing: @ungap/structured-clone@1.3.0 from lock file\nnpm error Missing: supports-color@8.1.1 from lock file\nnpm error Missing: mimic-fn@2.1.0 from lock file\nnpm error Missing: error-ex@1.3.4 from lock file\nnpm error Missing: json-parse-even-better-errors@2.3.1 from lock file\nnpm error Missing: lines-and-columns@1.2.4 from lock file\nnpm error Missing: is-arrayish@0.2.1 from lock file\nnpm error Missing: find-up@4.1.0 from lock file\nnpm error Missing: ansi-styles@5.2.0 from lock file\nnpm error Missing: react-is@18.3.1 from lock file\nnpm error Missing: resolve-from@5.0.0 from lock file\nnpm error Missing: buffer-from@1.1.2 from lock file\nnpm error Missing: source-map@0.6.1 from lock file\nnpm error Missing: escape-string-regexp@2.0.0 from lock file\nnpm error Missing: char-regex@1.0.2 from lock file\nnpm error Missing: @pkgr/core@0.2.9 from lock file\nnpm error Missing: glob@7.2.3 from lock file\nnpm error Missing: minimatch@3.1.5 from lock file\nnpm error Missing: @unrs/resolver-binding-android-arm-eabi@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-android-arm64@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-darwin-arm64@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-darwin-x64@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-freebsd-x64@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-arm-gnueabihf@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-arm-musleabihf@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-arm64-gnu@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-arm64-musl@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-ppc64-gnu@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-riscv64-gnu@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-riscv64-musl@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-s390x-gnu@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-x64-gnu@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-x64-musl@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-wasm32-wasi@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-win32-arm64-msvc@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-win32-ia32-msvc@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-win32-x64-msvc@1.11.1 from lock file\nnpm error Missing: napi-postinstall@0.3.4 from lock file\nnpm error Missing: @napi-rs/wasm-runtime@0.2.12 from lock file\nnpm error Missing: @emnapi/core@1.8.1 from lock file\nnpm error Missing: @emnapi/runtime@1.8.1 from lock file\nnpm error Missing: @tybys/wasm-util@0.10.1 from lock file\nnpm error Missing: @emnapi/wasi-threads@1.1.0 from lock file\nnpm error Missing: makeerror@1.0.12 from lock file\nnpm error Missing: tmpl@1.0.5 from lock file\nnpm error Missing: yallist@3.1.1 from lock file\nnpm error Missing: locate-path@5.0.0 from lock file\nnpm error Missing: argparse@1.0.10 from lock file\nnpm error Missing: esprima@4.0.1 from lock file\nnpm error Missing: sprintf-js@1.0.3 from lock file\nnpm error Missing: p-locate@4.1.0 from lock file\nnpm error Missing: p-limit@2.3.0 from lock file\nnpm error Missing: p-try@2.2.0 from lock file\nnpm error Missing: locate-path@5.0.0 from lock file\nnpm error Missing: p-locate@4.1.0 from lock file\nnpm error Missing: p-limit@2.3.0 from lock file\nnpm error Missing: fs.realpath@1.0.0 from lock file\nnpm error Missing: inflight@1.0.6 from lock file\nnpm error Missing: path-is-absolute@1.0.1 from lock file\nnpm error Missing: brace-expansion@1.1.12 from lock file\nnpm error Missing: balanced-match@1.0.2 from lock file\nnpm error\nnpm error Clean install a project\nnpm error\nnpm error Usage:\nnpm error npm ci\nnpm error\nnpm error Options:\nnpm error [--install-strategy <hoisted|nested|shallow|linked>] [--legacy-bundling]\nnpm error [--global-style] [--omit <dev|optional|peer> [--omit <dev|optional|peer> ...]]\nnpm error [--include <prod|dev|optional|peer> [--include <prod|dev|optional|peer> ...]]\nnpm error [--strict-peer-deps] [--foreground-scripts] [--ignore-scripts] [--no-audit]\nnpm error [--no-bin-links] [--no-fund] [--dry-run]\nnpm error [-w|--workspace <workspace-name> [-w|--workspace <workspace-name> ...]]\nnpm error [-ws|--workspaces] [--include-workspace-root] [--install-links]\nnpm error\nnpm error aliases: clean-install, ic, install-clean, isntall-clean\nnpm error\nnpm error Run \"npm help ci\" for more info\nnpm error A complete log of this run can be found in: /www-data-home/.npm/_logs/2026-03-10T06_11_47_219Z-debug-0.log. For more details see the logs at https://console.cloud.google.com/cloud-build/builds;region=us-central1/18612a3a-5248-41d1-a4d9-0cb39bb693bc?project=350817205989.",
2026-03-10T06:14:53.8556059Z     "original": ***
2026-03-10T06:14:53.8556430Z       "code": 3,
2026-03-10T06:14:53.8615403Z       "message": "Build failed with status: FAILURE and message: npm error code EUSAGE\nnpm error\nnpm error `npm ci` can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock file with `npm install` before continuing.\nnpm error\nnpm error Missing: jest@30.3.0 from lock file\nnpm error Missing: @jest/core@30.3.0 from lock file\nnpm error Missing: @jest/types@30.3.0 from lock file\nnpm error Missing: import-local@3.2.0 from lock file\nnpm error Missing: jest-cli@30.3.0 from lock file\nnpm error Missing: @jest/console@30.3.0 from lock file\nnpm error Missing: @jest/pattern@30.0.1 from lock file\nnpm error Missing: @jest/reporters@30.3.0 from lock file\nnpm error Missing: @jest/test-result@30.3.0 from lock file\nnpm error Missing: @jest/transform@30.3.0 from lock file\nnpm error Missing: ansi-escapes@4.3.2 from lock file\nnpm error Missing: ci-info@4.4.0 from lock file\nnpm error Missing: exit-x@0.2.2 from lock file\nnpm error Missing: graceful-fs@4.2.11 from lock file\nnpm error Missing: jest-changed-files@30.3.0 from lock file\nnpm error Missing: jest-config@30.3.0 from lock file\nnpm error Missing: jest-haste-map@30.3.0 from lock file\nnpm error Missing: jest-message-util@30.3.0 from lock file\nnpm error Missing: jest-regex-util@30.0.1 from lock file\nnpm error Missing: jest-resolve@30.3.0 from lock file\nnpm error Missing: jest-resolve-dependencies@30.3.0 from lock file\nnpm error Missing: jest-runner@30.3.0 from lock file\nnpm error Missing: jest-runtime@30.3.0 from lock file\nnpm error Missing: jest-snapshot@30.3.0 from lock file\nnpm error Missing: jest-util@30.3.0 from lock file\nnpm error Missing: jest-validate@30.3.0 from lock file\nnpm error Missing: jest-watcher@30.3.0 from lock file\nnpm error Missing: pretty-format@30.3.0 from lock file\nnpm error Missing: slash@3.0.0 from lock file\nnpm error Missing: @bcoe/v8-coverage@0.2.3 from lock file\nnpm error Missing: @jridgewell/trace-mapping@0.3.31 from lock file\nnpm error Missing: collect-v8-coverage@1.0.3 from lock file\nnpm error Missing: istanbul-lib-coverage@3.2.2 from lock file\nnpm error Missing: istanbul-lib-instrument@6.0.3 from lock file\nnpm error Missing: istanbul-lib-report@3.0.1 from lock file\nnpm error Missing: istanbul-lib-source-maps@5.0.6 from lock file\nnpm error Missing: istanbul-reports@3.2.0 from lock file\nnpm error Missing: jest-worker@30.3.0 from lock file\nnpm error Missing: string-length@4.0.2 from lock file\nnpm error Missing: v8-to-istanbul@9.3.0 from lock file\nnpm error Missing: @types/istanbul-lib-coverage@2.0.6 from lock file\nnpm error Missing: @babel/core@7.29.0 from lock file\nnpm error Missing: babel-plugin-istanbul@7.0.1 from lock file\nnpm error Missing: convert-source-map@2.0.0 from lock file\nnpm error Missing: pirates@4.0.7 from lock file\nnpm error Missing: write-file-atomic@5.0.1 from lock file\nnpm error Missing: @babel/code-frame@7.29.0 from lock file\nnpm error Missing: @babel/generator@7.29.1 from lock file\nnpm error Missing: @babel/helper-compilation-targets@7.28.6 from lock file\nnpm error Missing: @babel/helper-module-transforms@7.28.6 from lock file\nnpm error Missing: @babel/helpers@7.28.6 from lock file\nnpm error Missing: @babel/parser@7.29.0 from lock file\nnpm error Missing: @babel/template@7.28.6 from lock file\nnpm error Missing: @babel/traverse@7.29.0 from lock file\nnpm error Missing: @babel/types@7.29.0 from lock file\nnpm error Missing: @jridgewell/remapping@2.3.5 from lock file\nnpm error Missing: gensync@1.0.0-beta.2 from lock file\nnpm error Missing: json5@2.2.3 from lock file\nnpm error Missing: semver@6.3.1 from lock file\nnpm error Missing: @babel/helper-validator-identifier@7.28.5 from lock file\nnpm error Missing: js-tokens@4.0.0 from lock file\nnpm error Missing: picocolors@1.1.1 from lock file\nnpm error Missing: @jridgewell/gen-mapping@0.3.13 from lock file\nnpm error Missing: jsesc@3.1.0 from lock file\nnpm error Missing: @babel/compat-data@7.29.0 from lock file\nnpm error Missing: @babel/helper-validator-option@7.27.1 from lock file\nnpm error Missing: browserslist@4.28.1 from lock file\nnpm error Missing: lru-cache@5.1.1 from lock file\nnpm error Missing: semver@6.3.1 from lock file\nnpm error Missing: @babel/helper-module-imports@7.28.6 from lock file\nnpm error Missing: @babel/helper-globals@7.28.0 from lock file\nnpm error Missing: @babel/helper-string-parser@7.27.1 from lock file\nnpm error Missing: @jest/schemas@30.0.5 from lock file\nnpm error Missing: @types/istanbul-reports@3.0.4 from lock file\nnpm error Missing: @types/yargs@17.0.35 from lock file\nnpm error Missing: @sinclair/typebox@0.34.48 from lock file\nnpm error Missing: @jridgewell/sourcemap-codec@1.5.5 from lock file\nnpm error Missing: @jridgewell/resolve-uri@3.1.2 from lock file\nnpm error Missing: @types/istanbul-lib-report@3.0.3 from lock file\nnpm error Missing: @types/yargs-parser@21.0.3 from lock file\nnpm error Missing: type-fest@0.21.3 from lock file\nnpm error Missing: @babel/helper-plugin-utils@7.28.6 from lock file\nnpm error Missing: @istanbuljs/load-nyc-config@1.1.0 from lock file\nnpm error Missing: @istanbuljs/schema@0.1.3 from lock file\nnpm error Missing: test-exclude@6.0.0 from lock file\nnpm error Missing: camelcase@5.3.1 from lock file\nnpm error Missing: find-up@4.1.0 from lock file\nnpm error Missing: get-package-type@0.1.0 from lock file\nnpm error Missing: js-yaml@3.14.2 from lock file\nnpm error Missing: resolve-from@5.0.0 from lock file\nnpm error Missing: baseline-browser-mapping@2.10.0 from lock file\nnpm error Missing: caniuse-lite@1.0.30001777 from lock file\nnpm error Missing: electron-to-chromium@1.5.307 from lock file\nnpm error Missing: node-releases@2.0.36 from lock file\nnpm error Missing: update-browserslist-db@1.2.3 from lock file\nnpm error Missing: pkg-dir@4.2.0 from lock file\nnpm error Missing: resolve-cwd@3.0.0 from lock file\nnpm error Missing: make-dir@4.0.0 from lock file\nnpm error Missing: html-escaper@2.0.2 from lock file\nnpm error Missing: execa@5.1.1 from lock file\nnpm error Missing: get-stream@6.0.1 from lock file\nnpm error Missing: human-signals@2.1.0 from lock file\nnpm error Missing: merge-stream@2.0.0 from lock file\nnpm error Missing: npm-run-path@4.0.1 from lock file\nnpm error Missing: onetime@5.1.2 from lock file\nnpm error Missing: signal-exit@3.0.7 from lock file\nnpm error Missing: strip-final-newline@2.0.0 from lock file\nnpm error Missing: @jest/get-type@30.1.0 from lock file\nnpm error Missing: @jest/test-sequencer@30.3.0 from lock file\nnpm error Missing: babel-jest@30.3.0 from lock file\nnpm error Missing: deepmerge@4.3.1 from lock file\nnpm error Missing: jest-circus@30.3.0 from lock file\nnpm error Missing: jest-docblock@30.2.0 from lock file\nnpm error Missing: jest-environment-node@30.3.0 from lock file\nnpm error Missing: parse-json@5.2.0 from lock file\nnpm error Missing: @types/babel__core@7.20.5 from lock file\nnpm error Missing: babel-preset-jest@30.3.0 from lock file\nnpm error Missing: @types/babel__generator@7.27.0 from lock file\nnpm error Missing: @types/babel__template@7.4.4 from lock file\nnpm error Missing: @types/babel__traverse@7.28.0 from lock file\nnpm error Missing: babel-plugin-jest-hoist@30.3.0 from lock file\nnpm error Missing: babel-preset-current-node-syntax@1.2.0 from lock file\nnpm error Missing: @babel/plugin-syntax-async-generators@7.8.4 from lock file\nnpm error Missing: @babel/plugin-syntax-bigint@7.8.3 from lock file\nnpm error Missing: @babel/plugin-syntax-class-properties@7.12.13 from lock file\nnpm error Missing: @babel/plugin-syntax-class-static-block@7.14.5 from lock file\nnpm error Missing: @babel/plugin-syntax-import-attributes@7.28.6 from lock file\nnpm error Missing: @babel/plugin-syntax-import-meta@7.10.4 from lock file\nnpm error Missing: @babel/plugin-syntax-json-strings@7.8.3 from lock file\nnpm error Missing: @babel/plugin-syntax-logical-assignment-operators@7.10.4 from lock file\nnpm error Missing: @babel/plugin-syntax-nullish-coalescing-operator@7.8.3 from lock file\nnpm error Missing: @babel/plugin-syntax-numeric-separator@7.10.4 from lock file\nnpm error Missing: @babel/plugin-syntax-object-rest-spread@7.8.3 from lock file\nnpm error Missing: @babel/plugin-syntax-optional-catch-binding@7.8.3 from lock file\nnpm error Missing: @babel/plugin-syntax-optional-chaining@7.8.3 from lock file\nnpm error Missing: @babel/plugin-syntax-private-property-in-object@7.14.5 from lock file\nnpm error Missing: @babel/plugin-syntax-top-level-await@7.14.5 from lock file\nnpm error Missing: @jest/environment@30.3.0 from lock file\nnpm error Missing: @jest/expect@30.3.0 from lock file\nnpm error Missing: co@4.6.0 from lock file\nnpm error Missing: dedent@1.7.2 from lock file\nnpm error Missing: is-generator-fn@2.1.0 from lock file\nnpm error Missing: jest-each@30.3.0 from lock file\nnpm error Missing: jest-matcher-utils@30.3.0 from lock file\nnpm error Missing: pure-rand@7.0.1 from lock file\nnpm error Missing: stack-utils@2.0.6 from lock file\nnpm error Missing: @jest/fake-timers@30.3.0 from lock file\nnpm error Missing: jest-mock@30.3.0 from lock file\nnpm error Missing: expect@30.3.0 from lock file\nnpm error Missing: @sinonjs/fake-timers@15.1.1 from lock file\nnpm error Missing: @sinonjs/commons@3.0.1 from lock file\nnpm error Missing: type-detect@4.0.8 from lock file\nnpm error Missing: @jest/expect-utils@30.3.0 from lock file\nnpm error Missing: detect-newline@3.1.0 from lock file\nnpm error Missing: anymatch@3.1.3 from lock file\nnpm error Missing: fb-watchman@2.0.2 from lock file\nnpm error Missing: fsevents@2.3.3 from lock file\nnpm error Missing: walker@1.0.8 from lock file\nnpm error Missing: normalize-path@3.0.0 from lock file\nnpm error Missing: picomatch@2.3.1 from lock file\nnpm error Missing: bser@2.1.1 from lock file\nnpm error Missing: node-int64@0.4.0 from lock file\nnpm error Missing: jest-diff@30.3.0 from lock file\nnpm error Missing: @jest/diff-sequences@30.3.0 from lock file\nnpm error Missing: @types/stack-utils@2.0.3 from lock file\nnpm error Missing: jest-pnp-resolver@1.2.3 from lock file\nnpm error Missing: unrs-resolver@1.11.1 from lock file\nnpm error Missing: emittery@0.13.1 from lock file\nnpm error Missing: jest-leak-detector@30.3.0 from lock file\nnpm error Missing: source-map-support@0.5.13 from lock file\nnpm error Missing: @jest/globals@30.3.0 from lock file\nnpm error Missing: @jest/source-map@30.0.1 from lock file\nnpm error Missing: cjs-module-lexer@2.2.0 from lock file\nnpm error Missing: strip-bom@4.0.0 from lock file\nnpm error Missing: @babel/plugin-syntax-jsx@7.28.6 from lock file\nnpm error Missing: @babel/plugin-syntax-typescript@7.28.6 from lock file\nnpm error Missing: @jest/snapshot-utils@30.3.0 from lock file\nnpm error Missing: synckit@0.11.12 from lock file\nnpm error Missing: camelcase@6.3.0 from lock file\nnpm error Missing: leven@3.1.0 from lock file\nnpm error Missing: @ungap/structured-clone@1.3.0 from lock file\nnpm error Missing: supports-color@8.1.1 from lock file\nnpm error Missing: mimic-fn@2.1.0 from lock file\nnpm error Missing: error-ex@1.3.4 from lock file\nnpm error Missing: json-parse-even-better-errors@2.3.1 from lock file\nnpm error Missing: lines-and-columns@1.2.4 from lock file\nnpm error Missing: is-arrayish@0.2.1 from lock file\nnpm error Missing: find-up@4.1.0 from lock file\nnpm error Missing: ansi-styles@5.2.0 from lock file\nnpm error Missing: react-is@18.3.1 from lock file\nnpm error Missing: resolve-from@5.0.0 from lock file\nnpm error Missing: buffer-from@1.1.2 from lock file\nnpm error Missing: source-map@0.6.1 from lock file\nnpm error Missing: escape-string-regexp@2.0.0 from lock file\nnpm error Missing: char-regex@1.0.2 from lock file\nnpm error Missing: @pkgr/core@0.2.9 from lock file\nnpm error Missing: glob@7.2.3 from lock file\nnpm error Missing: minimatch@3.1.5 from lock file\nnpm error Missing: @unrs/resolver-binding-android-arm-eabi@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-android-arm64@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-darwin-arm64@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-darwin-x64@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-freebsd-x64@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-arm-gnueabihf@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-arm-musleabihf@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-arm64-gnu@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-arm64-musl@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-ppc64-gnu@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-riscv64-gnu@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-riscv64-musl@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-s390x-gnu@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-x64-gnu@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-linux-x64-musl@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-wasm32-wasi@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-win32-arm64-msvc@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-win32-ia32-msvc@1.11.1 from lock file\nnpm error Missing: @unrs/resolver-binding-win32-x64-msvc@1.11.1 from lock file\nnpm error Missing: napi-postinstall@0.3.4 from lock file\nnpm error Missing: @napi-rs/wasm-runtime@0.2.12 from lock file\nnpm error Missing: @emnapi/core@1.8.1 from lock file\nnpm error Missing: @emnapi/runtime@1.8.1 from lock file\nnpm error Missing: @tybys/wasm-util@0.10.1 from lock file\nnpm error Missing: @emnapi/wasi-threads@1.1.0 from lock file\nnpm error Missing: makeerror@1.0.12 from lock file\nnpm error Missing: tmpl@1.0.5 from lock file\nnpm error Missing: yallist@3.1.1 from lock file\nnpm error Missing: locate-path@5.0.0 from lock file\nnpm error Missing: argparse@1.0.10 from lock file\nnpm error Missing: esprima@4.0.1 from lock file\nnpm error Missing: sprintf-js@1.0.3 from lock file\nnpm error Missing: p-locate@4.1.0 from lock file\nnpm error Missing: p-limit@2.3.0 from lock file\nnpm error Missing: p-try@2.2.0 from lock file\nnpm error Missing: locate-path@5.0.0 from lock file\nnpm error Missing: p-locate@4.1.0 from lock file\nnpm error Missing: p-limit@2.3.0 from lock file\nnpm error Missing: fs.realpath@1.0.0 from lock file\nnpm error Missing: inflight@1.0.6 from lock file\nnpm error Missing: path-is-absolute@1.0.1 from lock file\nnpm error Missing: brace-expansion@1.1.12 from lock file\nnpm error Missing: balanced-match@1.0.2 from lock file\nnpm error\nnpm error Clean install a project\nnpm error\nnpm error Usage:\nnpm error npm ci\nnpm error\nnpm error Options:\nnpm error [--install-strategy <hoisted|nested|shallow|linked>] [--legacy-bundling]\nnpm error [--global-style] [--omit <dev|optional|peer> [--omit <dev|optional|peer> ...]]\nnpm error [--include <prod|dev|optional|peer> [--include <prod|dev|optional|peer> ...]]\nnpm error [--strict-peer-deps] [--foreground-scripts] [--ignore-scripts] [--no-audit]\nnpm error [--no-bin-links] [--no-fund] [--dry-run]\nnpm error [-w|--workspace <workspace-name> [-w|--workspace <workspace-name> ...]]\nnpm error [-ws|--workspaces] [--include-workspace-root] [--install-links]\nnpm error\nnpm error aliases: clean-install, ic, install-clean, isntall-clean\nnpm error\nnpm error Run \"npm help ci\" for more info\nnpm error A complete log of this run can be found in: /www-data-home/.npm/_logs/2026-03-10T06_11_47_219Z-debug-0.log. For more details see the logs at https://console.cloud.google.com/cloud-build/builds;region=us-central1/18612a3a-5248-41d1-a4d9-0cb39bb693bc?project=350817205989."
2026-03-10T06:14:53.8667386Z     ***,
2026-03-10T06:14:53.8667651Z     "status": 3,
2026-03-10T06:14:53.8667915Z     "code": 3
2026-03-10T06:14:53.8668174Z   ***
2026-03-10T06:14:53.8668425Z ***
2026-03-10T06:14:53.8668956Z [2026-03-10T06:14:53.842Z] Error: Failed to update function heartbeat in region us-central1
2026-03-10T06:14:53.8669828Z     at /opt/hostedtoolcache/node/20.20.0/x64/lib/node_modules/firebase-tools/lib/deploy/functions/release/fabricator.js:440:19
2026-03-10T06:14:53.8670661Z     at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
2026-03-10T06:14:53.8671781Z     at async Fabricator.updateV2Function (/opt/hostedtoolcache/node/20.20.0/x64/lib/node_modules/firebase-tools/lib/deploy/functions/release/fabricator.js:424:32)
2026-03-10T06:14:53.8673034Z     at async Fabricator.updateEndpoint (/opt/hostedtoolcache/node/20.20.0/x64/lib/node_modules/firebase-tools/lib/deploy/functions/release/fabricator.js:160:13)
2026-03-10T06:14:53.8674161Z     at async handle (/opt/hostedtoolcache/node/20.20.0/x64/lib/node_modules/firebase-tools/lib/deploy/functions/release/fabricator.js:91:17)
2026-03-10T06:14:53.8674717Z 
2026-03-10T06:14:53.8674925Z Error: There was an error deploying functions
2026-03-10T06:14:54.1767401Z ##[error]Process completed with exit code 2.
2026-03-10T06:14:54.1804140Z ##[group]Run echo "❌ Pipeline de deploy falhou."
2026-03-10T06:14:54.1804610Z [36;1mecho "❌ Pipeline de deploy falhou."[0m
2026-03-10T06:14:54.1805056Z [36;1mecho "### Falha no Pipeline de Deploy ❌" >> $GITHUB_STEP_SUMMARY[0m
2026-03-10T06:14:54.1805634Z [36;1mecho "Verifique os logs do GitHub Actions para detalhes." >> $GITHUB_STEP_SUMMARY[0m
2026-03-10T06:14:54.1855492Z shell: /usr/bin/bash -e ***0***
2026-03-10T06:14:54.1855814Z env:
2026-03-10T06:14:54.1856080Z   NODE_VERSION: 20
2026-03-10T06:14:54.1856480Z   PNPM_VERSION: 10.32.0
2026-03-10T06:14:54.1856917Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-10T06:14:54.1858347Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-10T06:14:54.1858850Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-10T06:14:54.1859398Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-10T06:14:54.1860914Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-10T06:14:54.1870695Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-10T06:14:54.1871116Z   FIREBASE_PROJECT_ID: ***
2026-03-10T06:14:54.1871477Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2026-03-10T06:14:54.1872210Z   CLOUDSDK_AUTH_CREDENTIAL_FILE_OVERRIDE: /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/gha-creds-958d71467c1b9417.json
2026-03-10T06:14:54.1873219Z   GOOGLE_APPLICATION_CREDENTIALS: /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/gha-creds-958d71467c1b9417.json
2026-03-10T06:14:54.1874153Z   GOOGLE_GHA_CREDS_PATH: /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/gha-creds-958d71467c1b9417.json
2026-03-10T06:14:54.1874817Z   CLOUDSDK_CORE_PROJECT: ***
2026-03-10T06:14:54.1875157Z   CLOUDSDK_PROJECT: ***
2026-03-10T06:14:54.1875472Z   GCLOUD_PROJECT: ***
2026-03-10T06:14:54.1875774Z   GCP_PROJECT: ***
2026-03-10T06:14:54.1876475Z   GOOGLE_CLOUD_PROJECT: ***
2026-03-10T06:14:54.1876804Z ##[endgroup]
2026-03-10T06:14:54.1945017Z ❌ Pipeline de deploy falhou.
2026-03-10T06:14:54.2020625Z Post job cleanup.
2026-03-10T06:14:54.2872550Z Removed exported credentials at "/home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/gha-creds-958d71467c1b9417.json".
2026-03-10T06:14:54.2967938Z Post job cleanup.
2026-03-10T06:14:54.3511970Z Pruning is unnecessary.
2026-03-10T06:14:54.3616713Z Post job cleanup.
2026-03-10T06:14:54.4905770Z [command]/usr/bin/git version
2026-03-10T06:14:54.4948381Z git version 2.53.0
2026-03-10T06:14:54.5601366Z Temporarily overriding HOME='/home/runner/work/_temp/2f307ef1-87bd-4364-8d48-ee5ab4ae967f' before making global git config changes
2026-03-10T06:14:54.5602686Z Adding repository directory to the temporary git global config as a safe directory
2026-03-10T06:14:54.5608288Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL
2026-03-10T06:14:54.5650067Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2026-03-10T06:14:54.5684656Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2026-03-10T06:14:54.5977646Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2026-03-10T06:14:54.6010607Z http.https://github.com/.extraheader
2026-03-10T06:14:54.6025843Z [command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
2026-03-10T06:14:54.6064685Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2026-03-10T06:14:54.6377481Z [command]/usr/bin/git config --local --name-only --get-regexp ^includeIf\.gitdir:
2026-03-10T06:14:54.6412255Z [command]/usr/bin/git submodule foreach --recursive git config --local --show-origin --name-only --get-regexp remote.origin.url
2026-03-10T06:14:54.6807171Z Cleaning up orphan processes

---

## Diagnóstico Consolidado

- O erro de `pnpm/action-setup` já estava resolvido neste job; a execução mostra `pnpm 10.32.0` instalado com sucesso.
- A falha real migrou para o Cloud Build do Firebase, que roda `npm ci` nos artefatos da função SSR e da função `heartbeat`.
- A evidência determinante é o `npm error code EUSAGE` com dezenas de dependências ausentes do `package-lock.json`, incluindo `jest@30.3.0`.
- Causa-raiz confirmada: o workflow gerava lockfiles temporários, mas ainda deixava `packageManager: pnpm@...` nos manifests enviados ao Cloud Build. Isso mantinha um estado híbrido `pnpm manifest + npm lockfile`, suficiente para o builder remoto tratar o lock como inconsistente.

## Correção Aplicada

- O workflow `.github/workflows/firebase-deploy.yml` agora remove `packageManager` temporariamente de `package.json` e `functions/package.json` antes de gerar `package-lock.json`.
- O script canônico `scripts/deploy.sh` foi alinhado com a mesma estratégia e passou a gerar também `functions/package-lock.json`.
- `functions/package.json` foi alinhado para `pnpm@10.32.0`, eliminando drift interno de versão.

## Validação Esperada

- O próximo rerun do workflow deve manter `pnpm/action-setup` verde.
- O Cloud Build não deve mais falhar com `npm ci`/`EUSAGE` por lockfile fora de sincronia.
- Os lockfiles npm continuam efêmeros e não devem ser commitados.

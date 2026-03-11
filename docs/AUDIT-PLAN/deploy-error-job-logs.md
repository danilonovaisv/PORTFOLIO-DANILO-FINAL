2026-03-11T02:03:33.0062718Z Current runner version: '2.332.0'
2026-03-11T02:03:33.0089693Z ##[group]Runner Image Provisioner
2026-03-11T02:03:33.0090803Z Hosted Compute Agent
2026-03-11T02:03:33.0091752Z Version: 20260213.493
2026-03-11T02:03:33.0092894Z Commit: 5c115507f6dd24b8de37d8bbe0bb4509d0cc0fa3
2026-03-11T02:03:33.0094014Z Build Date: 2026-02-13T00:28:41Z
2026-03-11T02:03:33.0095152Z Worker ID: ***18605047-abb8-4975-b318-793b3f309800***
2026-03-11T02:03:33.0096212Z Azure Region: westus
2026-03-11T02:03:33.0097124Z ##[endgroup]
2026-03-11T02:03:33.0098886Z ##[group]Operating System
2026-03-11T02:03:33.0099942Z Ubuntu
2026-03-11T02:03:33.0100822Z 24.04.3
2026-03-11T02:03:33.0101539Z LTS
2026-03-11T02:03:33.0102552Z ##[endgroup]
2026-03-11T02:03:33.0103337Z ##[group]Runner Image
2026-03-11T02:03:33.0104263Z Image: ubuntu-24.04
2026-03-11T02:03:33.0105132Z Version: 20260302.42.1
2026-03-11T02:03:33.0106801Z Included Software: https://github.com/actions/runner-images/blob/ubuntu24/20260302.42/images/ubuntu/Ubuntu2404-Readme.md
2026-03-11T02:03:33.0108700Z Image Release: https://github.com/actions/runner-images/releases/tag/ubuntu24%2F20260302.42
2026-03-11T02:03:33.0109968Z ##[endgroup]
2026-03-11T02:03:33.0111627Z ##[group]GITHUB_TOKEN Permissions
2026-03-11T02:03:33.0114199Z Contents: read
2026-03-11T02:03:33.0115215Z Metadata: read
2026-03-11T02:03:33.0116082Z ##[endgroup]
2026-03-11T02:03:33.0118450Z Secret source: Actions
2026-03-11T02:03:33.0119613Z Prepare workflow directory
2026-03-11T02:03:33.0683663Z Prepare all required actions
2026-03-11T02:03:33.0721796Z Getting action download info
2026-03-11T02:03:33.5371878Z Download action repository 'actions/checkout@v4' (SHA:34e114876b0b11c390a56381ad16ebd13914f8d5)
2026-03-11T02:03:33.7125767Z Download action repository 'pnpm/action-setup@v4' (SHA:41ff72655975bd51cab0327fa583b6e92b6d3061)
2026-03-11T02:03:34.3203156Z Download action repository 'actions/setup-node@v4' (SHA:49933ea5288caeca8642d1e84afbd3f7d6820020)
2026-03-11T02:03:34.4578524Z Download action repository 'google-github-actions/auth@v2' (SHA:c200f3691d83b41bf9bbd8638997a462592937ed)
2026-03-11T02:03:35.1306252Z Complete job name: test-and-deploy
2026-03-11T02:03:35.2435522Z ##[group]Run actions/checkout@v4
2026-03-11T02:03:35.2437286Z with:
2026-03-11T02:03:35.2438643Z   repository: danilonovaisv/PORTFOLIO-DANILO-FINAL
2026-03-11T02:03:35.2440587Z   token: ***
2026-03-11T02:03:35.2441756Z   ssh-strict: true
2026-03-11T02:03:35.2443275Z   ssh-user: git
2026-03-11T02:03:35.2444516Z   persist-credentials: true
2026-03-11T02:03:35.2445837Z   clean: true
2026-03-11T02:03:35.2447078Z   sparse-checkout-cone-mode: true
2026-03-11T02:03:35.2448492Z   fetch-depth: 1
2026-03-11T02:03:35.2449684Z   fetch-tags: false
2026-03-11T02:03:35.2450953Z   show-progress: true
2026-03-11T02:03:35.2452411Z   lfs: false
2026-03-11T02:03:35.2453586Z   submodules: false
2026-03-11T02:03:35.2454843Z   set-safe-directory: true
2026-03-11T02:03:35.2456460Z env:
2026-03-11T02:03:35.2457581Z   NODE_VERSION: 20
2026-03-11T02:03:35.2458800Z   PNPM_VERSION: 10.32.0
2026-03-11T02:03:35.2460600Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-11T02:03:35.2466260Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-11T02:03:35.2468305Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-11T02:03:35.2470508Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-11T02:03:35.2476438Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-11T02:03:35.2512031Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-11T02:03:35.2513678Z   FIREBASE_PROJECT_ID: ***
2026-03-11T02:03:35.2514996Z ##[endgroup]
2026-03-11T02:03:35.3678635Z Syncing repository: danilonovaisv/PORTFOLIO-DANILO-FINAL
2026-03-11T02:03:35.3682821Z ##[group]Getting Git version info
2026-03-11T02:03:35.3684970Z Working directory is '/home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL'
2026-03-11T02:03:35.3688017Z [command]/usr/bin/git version
2026-03-11T02:03:35.3758690Z git version 2.53.0
2026-03-11T02:03:35.3787236Z ##[endgroup]
2026-03-11T02:03:35.3802755Z Temporarily overriding HOME='/home/runner/work/_temp/5e84f8ac-c560-4339-a9f2-c8a5f57c9ebe' before making global git config changes
2026-03-11T02:03:35.3806377Z Adding repository directory to the temporary git global config as a safe directory
2026-03-11T02:03:35.3817298Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL
2026-03-11T02:03:35.3861487Z Deleting the contents of '/home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL'
2026-03-11T02:03:35.3865535Z ##[group]Initializing the repository
2026-03-11T02:03:35.3870354Z [command]/usr/bin/git init /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL
2026-03-11T02:03:35.3992999Z hint: Using 'master' as the name for the initial branch. This default branch name
2026-03-11T02:03:35.3998289Z hint: will change to "main" in Git 3.0. To configure the initial branch name
2026-03-11T02:03:35.4001331Z hint: to use in all of your new repositories, which will suppress this warning,
2026-03-11T02:03:35.4004610Z hint: call:
2026-03-11T02:03:35.4005845Z hint:
2026-03-11T02:03:35.4007392Z hint: 	git config --global init.defaultBranch <name>
2026-03-11T02:03:35.4009241Z hint:
2026-03-11T02:03:35.4011144Z hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
2026-03-11T02:03:35.4013683Z hint: 'development'. The just-created branch can be renamed via this command:
2026-03-11T02:03:35.4015624Z hint:
2026-03-11T02:03:35.4016923Z hint: 	git branch -m <name>
2026-03-11T02:03:35.4018223Z hint:
2026-03-11T02:03:35.4019838Z hint: Disable this message with "git config set advice.defaultBranchName false"
2026-03-11T02:03:35.4023128Z Initialized empty Git repository in /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/.git/
2026-03-11T02:03:35.4027855Z [command]/usr/bin/git remote add origin https://github.com/danilonovaisv/PORTFOLIO-DANILO-FINAL
2026-03-11T02:03:35.4053550Z ##[endgroup]
2026-03-11T02:03:35.4055760Z ##[group]Disabling automatic garbage collection
2026-03-11T02:03:35.4058003Z [command]/usr/bin/git config --local gc.auto 0
2026-03-11T02:03:35.4090322Z ##[endgroup]
2026-03-11T02:03:35.4094033Z ##[group]Setting up auth
2026-03-11T02:03:35.4098683Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2026-03-11T02:03:35.4136425Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2026-03-11T02:03:35.4524738Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2026-03-11T02:03:35.4562791Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2026-03-11T02:03:35.4805155Z [command]/usr/bin/git config --local --name-only --get-regexp ^includeIf\.gitdir:
2026-03-11T02:03:35.4850581Z [command]/usr/bin/git submodule foreach --recursive git config --local --show-origin --name-only --get-regexp remote.origin.url
2026-03-11T02:03:35.5097451Z [command]/usr/bin/git config --local http.https://github.com/.extraheader AUTHORIZATION: basic ***
2026-03-11T02:03:35.5136159Z ##[endgroup]
2026-03-11T02:03:35.5138543Z ##[group]Fetching the repository
2026-03-11T02:03:35.5146329Z [command]/usr/bin/git -c protocol.version=2 fetch --no-tags --prune --no-recurse-submodules --depth=1 origin +5f69b566e911404062cacbd498a73fb40ab19546:refs/remotes/origin/main
2026-03-11T02:06:07.5603461Z From https://github.com/danilonovaisv/PORTFOLIO-DANILO-FINAL
2026-03-11T02:06:07.5604682Z  * [new ref]           5f69b566e911404062cacbd498a73fb40ab19546 -> origin/main
2026-03-11T02:06:07.5646619Z ##[endgroup]
2026-03-11T02:06:07.5647627Z ##[group]Determining the checkout info
2026-03-11T02:06:07.5648919Z ##[endgroup]
2026-03-11T02:06:07.5656904Z [command]/usr/bin/git sparse-checkout disable
2026-03-11T02:06:07.5728894Z [command]/usr/bin/git config --local --unset-all extensions.worktreeConfig
2026-03-11T02:06:07.5759624Z ##[group]Checking out the ref
2026-03-11T02:06:07.5765079Z [command]/usr/bin/git checkout --progress --force -B main refs/remotes/origin/main
2026-03-11T02:06:08.7344194Z Updating files:  30% (6143/20118)
2026-03-11T02:06:08.8948236Z Updating files:  31% (6237/20118)
2026-03-11T02:06:09.0342729Z Updating files:  32% (6438/20118)
2026-03-11T02:06:09.1604564Z Updating files:  33% (6639/20118)
2026-03-11T02:06:09.3445855Z Updating files:  34% (6841/20118)
2026-03-11T02:06:09.6291793Z Updating files:  35% (7042/20118)
2026-03-11T02:06:09.6343794Z Updating files:  35% (7233/20118)
2026-03-11T02:06:09.8305976Z Updating files:  36% (7243/20118)
2026-03-11T02:06:10.0449164Z Updating files:  37% (7444/20118)
2026-03-11T02:06:10.1428629Z Updating files:  38% (7645/20118)
2026-03-11T02:06:10.3725049Z Updating files:  39% (7847/20118)
2026-03-11T02:06:10.4591464Z Updating files:  40% (8048/20118)
2026-03-11T02:06:10.6278194Z Updating files:  41% (8249/20118)
2026-03-11T02:06:10.6867554Z Updating files:  41% (8415/20118)
2026-03-11T02:06:10.8752399Z Updating files:  42% (8450/20118)
2026-03-11T02:06:11.0469087Z Updating files:  43% (8651/20118)
2026-03-11T02:06:11.2378627Z Updating files:  44% (8852/20118)
2026-03-11T02:06:11.3688489Z Updating files:  45% (9054/20118)
2026-03-11T02:06:11.4061275Z Updating files:  46% (9255/20118)
2026-03-11T02:06:11.4219994Z Updating files:  47% (9456/20118)
2026-03-11T02:06:11.4363264Z Updating files:  48% (9657/20118)
2026-03-11T02:06:11.4524744Z Updating files:  49% (9858/20118)
2026-03-11T02:06:11.4659452Z Updating files:  50% (10059/20118)
2026-03-11T02:06:11.4870195Z Updating files:  51% (10261/20118)
2026-03-11T02:06:11.5018104Z Updating files:  52% (10462/20118)
2026-03-11T02:06:11.5160545Z Updating files:  53% (10663/20118)
2026-03-11T02:06:11.5294634Z Updating files:  54% (10864/20118)
2026-03-11T02:06:11.5431236Z Updating files:  55% (11065/20118)
2026-03-11T02:06:11.5565763Z Updating files:  56% (11267/20118)
2026-03-11T02:06:11.5699521Z Updating files:  57% (11468/20118)
2026-03-11T02:06:11.5833912Z Updating files:  58% (11669/20118)
2026-03-11T02:06:11.5967985Z Updating files:  59% (11870/20118)
2026-03-11T02:06:11.6102525Z Updating files:  60% (12071/20118)
2026-03-11T02:06:11.6236944Z Updating files:  61% (12272/20118)
2026-03-11T02:06:11.6271404Z Updating files:  62% (12474/20118)
2026-03-11T02:06:11.6373249Z Updating files:  62% (12525/20118)
2026-03-11T02:06:11.6507839Z Updating files:  63% (12675/20118)
2026-03-11T02:06:11.8614031Z Updating files:  64% (12876/20118)
2026-03-11T02:06:12.4637361Z Updating files:  65% (13077/20118)
2026-03-11T02:06:12.6246409Z Updating files:  66% (13278/20118)
2026-03-11T02:06:12.6273586Z Updating files:  67% (13480/20118)
2026-03-11T02:06:12.8562715Z Updating files:  67% (13485/20118)
2026-03-11T02:06:12.9281130Z Updating files:  68% (13681/20118)
2026-03-11T02:06:13.0265983Z Updating files:  69% (13882/20118)
2026-03-11T02:06:13.0922984Z Updating files:  70% (14083/20118)
2026-03-11T02:06:13.2405576Z Updating files:  71% (14284/20118)
2026-03-11T02:06:13.3298989Z Updating files:  72% (14485/20118)
2026-03-11T02:06:13.3689578Z Updating files:  73% (14687/20118)
2026-03-11T02:06:13.3838454Z Updating files:  74% (14888/20118)
2026-03-11T02:06:13.3980057Z Updating files:  75% (15089/20118)
2026-03-11T02:06:13.4115077Z Updating files:  76% (15290/20118)
2026-03-11T02:06:13.4230869Z Updating files:  77% (15491/20118)
2026-03-11T02:06:13.5538275Z Updating files:  78% (15693/20118)
2026-03-11T02:06:13.6378376Z Updating files:  79% (15894/20118)
2026-03-11T02:06:13.7089592Z Updating files:  79% (15985/20118)
2026-03-11T02:06:13.9238465Z Updating files:  80% (16095/20118)
2026-03-11T02:06:14.2131041Z Updating files:  81% (16296/20118)
2026-03-11T02:06:14.3944469Z Updating files:  82% (16497/20118)
2026-03-11T02:06:14.5977411Z Updating files:  83% (16698/20118)
2026-03-11T02:06:14.6272851Z Updating files:  84% (16900/20118)
2026-03-11T02:06:14.7271541Z Updating files:  84% (16947/20118)
2026-03-11T02:06:14.7884289Z Updating files:  85% (17101/20118)
2026-03-11T02:06:14.8392511Z Updating files:  86% (17302/20118)
2026-03-11T02:06:14.8533302Z Updating files:  87% (17503/20118)
2026-03-11T02:06:14.8678058Z Updating files:  88% (17704/20118)
2026-03-11T02:06:14.8852727Z Updating files:  89% (17906/20118)
2026-03-11T02:06:14.8974178Z Updating files:  90% (18107/20118)
2026-03-11T02:06:14.9121712Z Updating files:  91% (18308/20118)
2026-03-11T02:06:14.9269875Z Updating files:  92% (18509/20118)
2026-03-11T02:06:15.1315970Z Updating files:  93% (18710/20118)
2026-03-11T02:06:15.2332812Z Updating files:  94% (18911/20118)
2026-03-11T02:06:15.2393870Z Updating files:  95% (19113/20118)
2026-03-11T02:06:15.2671845Z Updating files:  96% (19314/20118)
2026-03-11T02:06:15.2791246Z Updating files:  97% (19515/20118)
2026-03-11T02:06:15.2911152Z Updating files:  98% (19716/20118)
2026-03-11T02:06:15.3014430Z Updating files:  99% (19917/20118)
2026-03-11T02:06:15.3015193Z Updating files: 100% (20118/20118)
2026-03-11T02:06:15.3015821Z Updating files: 100% (20118/20118), done.
2026-03-11T02:06:15.3405591Z Switched to a new branch 'main'
2026-03-11T02:06:15.3406355Z branch 'main' set up to track 'origin/main'.
2026-03-11T02:06:15.3741837Z ##[endgroup]
2026-03-11T02:06:15.3785123Z [command]/usr/bin/git log -1 --format=%H
2026-03-11T02:06:15.3811149Z 5f69b566e911404062cacbd498a73fb40ab19546
2026-03-11T02:06:15.4006778Z ##[group]Run pnpm/action-setup@v4
2026-03-11T02:06:15.4007153Z with:
2026-03-11T02:06:15.4007412Z   version: 10.32.0
2026-03-11T02:06:15.4007697Z   dest: ~/setup-pnpm
2026-03-11T02:06:15.4007990Z   run_install: null
2026-03-11T02:06:15.4008306Z   package_json_file: package.json
2026-03-11T02:06:15.4008630Z   standalone: false
2026-03-11T02:06:15.4008905Z env:
2026-03-11T02:06:15.4009169Z   NODE_VERSION: 20
2026-03-11T02:06:15.4009450Z   PNPM_VERSION: 10.32.0
2026-03-11T02:06:15.4009919Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-11T02:06:15.4011370Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-11T02:06:15.4011880Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-11T02:06:15.4012629Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-11T02:06:15.4014162Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-11T02:06:15.4024073Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-11T02:06:15.4024485Z   FIREBASE_PROJECT_ID: ***
2026-03-11T02:06:15.4024791Z ##[endgroup]
2026-03-11T02:06:15.4585870Z ##[group]Running self-installer...
2026-03-11T02:06:15.4631471Z Error: Multiple versions of pnpm specified:
2026-03-11T02:06:15.4632326Z   - version 10.32.0 in the GitHub Action config with the key "version"
2026-03-11T02:06:15.4633029Z   - version pnpm@10.32.1 in the package.json with the key "packageManager"
2026-03-11T02:06:15.4633867Z Remove one of these versions to avoid version mismatch errors like ERR_PNPM_BAD_PM_VERSION
2026-03-11T02:06:15.4634763Z     at readTarget (/home/runner/work/_actions/pnpm/action-setup/v4/dist/index.js:1:4977)
2026-03-11T02:06:15.4635944Z     at runSelfInstaller (/home/runner/work/_actions/pnpm/action-setup/v4/dist/index.js:1:4142)
2026-03-11T02:06:15.4636994Z     at async install (/home/runner/work/_actions/pnpm/action-setup/v4/dist/index.js:1:3154)
2026-03-11T02:06:15.4637798Z     at async main (/home/runner/work/_actions/pnpm/action-setup/v4/dist/index.js:1:445)
2026-03-11T02:06:15.4663006Z ##[error]Error: Multiple versions of pnpm specified:
  - version 10.32.0 in the GitHub Action config with the key "version"
  - version pnpm@10.32.1 in the package.json with the key "packageManager"
Remove one of these versions to avoid version mismatch errors like ERR_PNPM_BAD_PM_VERSION
2026-03-11T02:06:15.4813532Z ##[group]Run echo "❌ Pipeline de deploy falhou."
2026-03-11T02:06:15.4814058Z [36;1mecho "❌ Pipeline de deploy falhou."[0m
2026-03-11T02:06:15.4814535Z [36;1mecho "### Falha no Pipeline de Deploy ❌" >> $GITHUB_STEP_SUMMARY[0m
2026-03-11T02:06:15.4815139Z [36;1mecho "Verifique os logs do GitHub Actions para detalhes." >> $GITHUB_STEP_SUMMARY[0m
2026-03-11T02:06:15.4871538Z shell: /usr/bin/bash -e ***0***
2026-03-11T02:06:15.4872064Z env:
2026-03-11T02:06:15.4872592Z   NODE_VERSION: 20
2026-03-11T02:06:15.4872906Z   PNPM_VERSION: 10.32.0
2026-03-11T02:06:15.4873460Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-11T02:06:15.4875050Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-11T02:06:15.4875602Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-11T02:06:15.4876185Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-11T02:06:15.4877848Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-11T02:06:15.4887859Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-11T02:06:15.4888306Z   FIREBASE_PROJECT_ID: ***
2026-03-11T02:06:15.4888605Z ##[endgroup]
2026-03-11T02:06:15.4987410Z ❌ Pipeline de deploy falhou.
2026-03-11T02:06:15.5053790Z Post job cleanup.
2026-03-11T02:06:15.5632309Z Pruning is unnecessary.
2026-03-11T02:06:15.5781582Z Post job cleanup.
2026-03-11T02:06:15.6759905Z [command]/usr/bin/git version
2026-03-11T02:06:15.6800448Z git version 2.53.0
2026-03-11T02:06:15.6855300Z Temporarily overriding HOME='/home/runner/work/_temp/d0c1720a-08bb-49ce-abee-75201f12642e' before making global git config changes
2026-03-11T02:06:15.6856834Z Adding repository directory to the temporary git global config as a safe directory
2026-03-11T02:06:15.6871840Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL
2026-03-11T02:06:15.6910785Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2026-03-11T02:06:15.6946843Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2026-03-11T02:06:15.7232805Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2026-03-11T02:06:15.7258341Z http.https://github.com/.extraheader
2026-03-11T02:06:15.7271517Z [command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
2026-03-11T02:06:15.7305604Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2026-03-11T02:06:15.7594970Z [command]/usr/bin/git config --local --name-only --get-regexp ^includeIf\.gitdir:
2026-03-11T02:06:15.7629842Z [command]/usr/bin/git submodule foreach --recursive git config --local --show-origin --name-only --get-regexp remote.origin.url
2026-03-11T02:06:15.8030902Z Cleaning up orphan processes
2026-03-11T02:06:15.8330100Z ##[warning]Node.js 20 actions are deprecated. The following actions are running on Node.js 20 and may not work as expected: actions/checkout@v4, pnpm/action-setup@v4. Actions will be forced to run with Node.js 24 by default starting June 2nd, 2026. Please check if updated versions of these actions are available that support Node.js 24. To opt into Node.js 24 now, set the FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true environment variable on the runner or in your workflow file. Once Node.js 24 becomes the default, you can temporarily opt out by setting ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION=true. For more information see: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/

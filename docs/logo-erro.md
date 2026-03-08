2026-03-08T06:22:47.5897003Z ##[debug]Starting: test-and-deploy
2026-03-08T06:22:47.5922538Z ##[debug]Cleaning runner temp folder: /home/runner/work/_temp
2026-03-08T06:22:47.6029824Z ##[debug]Starting: Set up job
2026-03-08T06:22:47.6031310Z Current runner version: '2.332.0'
2026-03-08T06:22:47.6053172Z ##[group]Runner Image Provisioner
2026-03-08T06:22:47.6054322Z Hosted Compute Agent
2026-03-08T06:22:47.6055204Z Version: 20260213.493
2026-03-08T06:22:47.6056206Z Commit: 5c115507f6dd24b8de37d8bbe0bb4509d0cc0fa3
2026-03-08T06:22:47.6057234Z Build Date: 2026-02-13T00:28:41Z
2026-03-08T06:22:47.6058652Z Worker ID: ***af1eb24f-792b-439a-b160-4261d56cb4e2***
2026-03-08T06:22:47.6059787Z Azure Region: westcentralus
2026-03-08T06:22:47.6060660Z ##[endgroup]
2026-03-08T06:22:47.6062384Z ##[group]Operating System
2026-03-08T06:22:47.6063261Z Ubuntu
2026-03-08T06:22:47.6064126Z 24.04.3
2026-03-08T06:22:47.6064956Z LTS
2026-03-08T06:22:47.6065671Z ##[endgroup]
2026-03-08T06:22:47.6066541Z ##[group]Runner Image
2026-03-08T06:22:47.6067373Z Image: ubuntu-24.04
2026-03-08T06:22:47.6068863Z Version: 20260302.42.1
2026-03-08T06:22:47.6070372Z Included Software: https://github.com/actions/runner-images/blob/ubuntu24/20260302.42/images/ubuntu/Ubuntu2404-Readme.md
2026-03-08T06:22:47.6072297Z Image Release: https://github.com/actions/runner-images/releases/tag/ubuntu24%2F20260302.42
2026-03-08T06:22:47.6073549Z ##[endgroup]
2026-03-08T06:22:47.6075164Z ##[group]GITHUB_TOKEN Permissions
2026-03-08T06:22:47.6077342Z Contents: read
2026-03-08T06:22:47.6078365Z Metadata: read
2026-03-08T06:22:47.6079300Z ##[endgroup]
2026-03-08T06:22:47.6081685Z Secret source: Actions
2026-03-08T06:22:47.6082821Z ##[debug]Primary repository: danilonovaisv/PORTFOLIO-DANILO-FINAL
2026-03-08T06:22:47.6084044Z Prepare workflow directory
2026-03-08T06:22:47.6155181Z ##[debug]Creating pipeline directory: '/home/runner/work/PORTFOLIO-DANILO-FINAL'
2026-03-08T06:22:47.6160008Z ##[debug]Creating workspace directory: '/home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL'
2026-03-08T06:22:47.6162244Z ##[debug]Update context data
2026-03-08T06:22:47.6166634Z ##[debug]Evaluating job-level environment variables
2026-03-08T06:22:47.6531723Z ##[debug]Evaluating: secrets.NEXT_PUBLIC_SUPABASE_URL
2026-03-08T06:22:47.6537176Z ##[debug]Evaluating Index:
2026-03-08T06:22:47.6540257Z ##[debug]..Evaluating secrets:
2026-03-08T06:22:47.6551350Z ##[debug]..=> Object
2026-03-08T06:22:47.6560190Z ##[debug]..Evaluating String:
2026-03-08T06:22:47.6561657Z ##[debug]..=> 'NEXT_PUBLIC_SUPABASE_URL'
2026-03-08T06:22:47.6566367Z ##[debug]=> '***'
2026-03-08T06:22:47.6570325Z ##[debug]Result: '***'
2026-03-08T06:22:47.6589124Z ##[debug]Evaluating: (secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY || secrets.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
2026-03-08T06:22:47.6590691Z ##[debug]Evaluating Or:
2026-03-08T06:22:47.6593235Z ##[debug]..Evaluating Index:
2026-03-08T06:22:47.6594331Z ##[debug]....Evaluating secrets:
2026-03-08T06:22:47.6595385Z ##[debug]....=> Object
2026-03-08T06:22:47.6596288Z ##[debug]....Evaluating String:
2026-03-08T06:22:47.6597373Z ##[debug]....=> 'NEXT_PUBLIC_SUPABASE_ANON_KEY'
2026-03-08T06:22:47.6600540Z ##[debug]..=> '***'
2026-03-08T06:22:47.6604915Z ##[debug]=> '***'
2026-03-08T06:22:47.6610968Z ##[debug]Expanded: ('***' || secrets['NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'])
2026-03-08T06:22:47.6613748Z ##[debug]Result: '***'
2026-03-08T06:22:47.6615762Z ##[debug]Evaluating: (secrets.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY)
2026-03-08T06:22:47.6617170Z ##[debug]Evaluating Or:
2026-03-08T06:22:47.6618027Z ##[debug]..Evaluating Index:
2026-03-08T06:22:47.6619158Z ##[debug]....Evaluating secrets:
2026-03-08T06:22:47.6620126Z ##[debug]....=> Object
2026-03-08T06:22:47.6621011Z ##[debug]....Evaluating String:
2026-03-08T06:22:47.6622037Z ##[debug]....=> 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'
2026-03-08T06:22:47.6623317Z ##[debug]..=> '***'
2026-03-08T06:22:47.6624356Z ##[debug]=> '***'
2026-03-08T06:22:47.6625802Z ##[debug]Expanded: ('***' || secrets['NEXT_PUBLIC_SUPABASE_ANON_KEY'])
2026-03-08T06:22:47.6627394Z ##[debug]Result: '***'
2026-03-08T06:22:47.6629799Z ##[debug]Evaluating: (secrets.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY)
2026-03-08T06:22:47.6631265Z ##[debug]Evaluating Or:
2026-03-08T06:22:47.6632116Z ##[debug]..Evaluating Index:
2026-03-08T06:22:47.6633075Z ##[debug]....Evaluating secrets:
2026-03-08T06:22:47.6633958Z ##[debug]....=> Object
2026-03-08T06:22:47.6634896Z ##[debug]....Evaluating String:
2026-03-08T06:22:47.6635918Z ##[debug]....=> 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'
2026-03-08T06:22:47.6637107Z ##[debug]..=> '***'
2026-03-08T06:22:47.6638363Z ##[debug]=> '***'
2026-03-08T06:22:47.6639781Z ##[debug]Expanded: ('***' || secrets['NEXT_PUBLIC_SUPABASE_ANON_KEY'])
2026-03-08T06:22:47.6641040Z ##[debug]Result: '***'
2026-03-08T06:22:47.6642471Z ##[debug]Evaluating: secrets.SUPABASE_SERVICE_ROLE_KEY
2026-03-08T06:22:47.6643471Z ##[debug]Evaluating Index:
2026-03-08T06:22:47.6644418Z ##[debug]..Evaluating secrets:
2026-03-08T06:22:47.6645399Z ##[debug]..=> Object
2026-03-08T06:22:47.6646255Z ##[debug]..Evaluating String:
2026-03-08T06:22:47.6647212Z ##[debug]..=> 'SUPABASE_SERVICE_ROLE_KEY'
2026-03-08T06:22:47.6650330Z ##[debug]=> '***'
2026-03-08T06:22:47.6652968Z ##[debug]Result: '***'
2026-03-08T06:22:47.6655129Z ##[debug]Evaluating: (secrets.FIREBASE_SERVICE_ACCOUNT_PORTFOLIO_DANILO_NOVAIS || secrets.FIREBASE_SERVICE_ACCOUNT_JSON || secrets.FIREBASE_SERVICE_ACCOUNT)
2026-03-08T06:22:47.6656818Z ##[debug]Evaluating Or:
2026-03-08T06:22:47.6657684Z ##[debug]..Evaluating Index:
2026-03-08T06:22:47.6658788Z ##[debug]....Evaluating secrets:
2026-03-08T06:22:47.6659818Z ##[debug]....=> Object
2026-03-08T06:22:47.6660806Z ##[debug]....Evaluating String:
2026-03-08T06:22:47.6661821Z ##[debug]....=> 'FIREBASE_SERVICE_ACCOUNT_PORTFOLIO_DANILO_NOVAIS'
2026-03-08T06:22:47.6663186Z ##[debug]..=> '***
2026-03-08T06:22:47.6664042Z ##[debug]  ***
2026-03-08T06:22:47.6664978Z ##[debug]  ***
2026-03-08T06:22:47.6665957Z ##[debug]  ***
2026-03-08T06:22:47.6679231Z ##[debug]  ***
2026-03-08T06:22:47.6680536Z ##[debug]  ***
2026-03-08T06:22:47.6681422Z ##[debug]  ***
2026-03-08T06:22:47.6682496Z ##[debug]  ***
2026-03-08T06:22:47.6683459Z ##[debug]  ***
2026-03-08T06:22:47.6684589Z ##[debug]  ***
2026-03-08T06:22:47.6686177Z ##[debug]  ***
2026-03-08T06:22:47.6686997Z ##[debug]  ***
2026-03-08T06:22:47.6687841Z ##[debug]***'
2026-03-08T06:22:47.6689311Z ##[debug]=> '***
2026-03-08T06:22:47.6690234Z ##[debug]  ***
2026-03-08T06:22:47.6691165Z ##[debug]  ***
2026-03-08T06:22:47.6692185Z ##[debug]  ***
2026-03-08T06:22:47.6704822Z ##[debug]  ***
2026-03-08T06:22:47.6706136Z ##[debug]  ***
2026-03-08T06:22:47.6707020Z ##[debug]  ***
2026-03-08T06:22:47.6707954Z ##[debug]  ***
2026-03-08T06:22:47.6709369Z ##[debug]  ***
2026-03-08T06:22:47.6710469Z ##[debug]  ***
2026-03-08T06:22:47.6712002Z ##[debug]  ***
2026-03-08T06:22:47.6712886Z ##[debug]  ***
2026-03-08T06:22:47.6713641Z ##[debug]***'
2026-03-08T06:22:47.6714761Z ##[debug]Expanded: ('***
2026-03-08T06:22:47.6715793Z ##[debug]  ***
2026-03-08T06:22:47.6716705Z ##[debug]  ***
2026-03-08T06:22:47.6717673Z ##[debug]  ***
2026-03-08T06:22:47.6730665Z ##[debug]  ***
2026-03-08T06:22:47.6731898Z ##[debug]  ***
2026-03-08T06:22:47.6732744Z ##[debug]  ***
2026-03-08T06:22:47.6733747Z ##[debug]  ***
2026-03-08T06:22:47.6734683Z ##[debug]  ***
2026-03-08T06:22:47.6735737Z ##[debug]  ***
2026-03-08T06:22:47.6737277Z ##[debug]  ***
2026-03-08T06:22:47.6738301Z ##[debug]  ***
2026-03-08T06:22:47.6739502Z ##[debug]***' || secrets['FIREBASE_SERVICE_ACCOUNT_JSON'] || secrets['FIREBASE_SERVICE_ACCOUNT'])
2026-03-08T06:22:47.6740896Z ##[debug]Result: '***
2026-03-08T06:22:47.6741729Z ##[debug]  ***
2026-03-08T06:22:47.6742635Z ##[debug]  ***
2026-03-08T06:22:47.6743653Z ##[debug]  ***
2026-03-08T06:22:47.6756429Z ##[debug]  ***
2026-03-08T06:22:47.6757791Z ##[debug]  ***
2026-03-08T06:22:47.6758919Z ##[debug]  ***
2026-03-08T06:22:47.6760200Z ##[debug]  ***
2026-03-08T06:22:47.6826379Z ##[debug]  ***
2026-03-08T06:22:47.6827666Z ##[debug]  ***
2026-03-08T06:22:47.6829432Z ##[debug]  ***
2026-03-08T06:22:47.6830274Z ##[debug]  ***
2026-03-08T06:22:47.6830877Z ##[debug]***'
2026-03-08T06:22:47.6832365Z ##[debug]Evaluating: (secrets.FIREBASE_PROJECT || secrets.GOOGLE_CLOUD_PROJECT)
2026-03-08T06:22:47.6833362Z ##[debug]Evaluating Or:
2026-03-08T06:22:47.6834036Z ##[debug]..Evaluating Index:
2026-03-08T06:22:47.6834722Z ##[debug]....Evaluating secrets:
2026-03-08T06:22:47.6835464Z ##[debug]....=> Object
2026-03-08T06:22:47.6836119Z ##[debug]....Evaluating String:
2026-03-08T06:22:47.6836822Z ##[debug]....=> 'FIREBASE_PROJECT'
2026-03-08T06:22:47.6837612Z ##[debug]..=> '***'
2026-03-08T06:22:47.6838693Z ##[debug]=> '***'
2026-03-08T06:22:47.6839631Z ##[debug]Expanded: ('***' || secrets['GOOGLE_CLOUD_PROJECT'])
2026-03-08T06:22:47.6840517Z ##[debug]Result: '***'
2026-03-08T06:22:47.6852803Z ##[debug]Evaluating job container
2026-03-08T06:22:47.6855507Z ##[debug]Evaluating job service containers
2026-03-08T06:22:47.6857940Z ##[debug]Evaluating job defaults
2026-03-08T06:22:47.6883852Z Prepare all required actions
2026-03-08T06:22:47.6922575Z Getting action download info
2026-03-08T06:22:48.1110054Z Download action repository 'actions/checkout@v4' (SHA:34e114876b0b11c390a56381ad16ebd13914f8d5)
2026-03-08T06:22:48.1279301Z ##[debug]Copied action archive '/opt/actionarchivecache/actions_checkout/34e114876b0b11c390a56381ad16ebd13914f8d5.tar.gz' to '/home/runner/work/_actions/_temp_a9d68fe1-8b63-46e4-94e6-909abdf836ea/910c68ea-7730-4fe8-a5cb-4a1d181906b9.tar.gz'
2026-03-08T06:22:48.6623394Z ##[debug]Unwrap 'actions-checkout-34e1148' to '/home/runner/work/_actions/actions/checkout/v4'
2026-03-08T06:22:48.6762671Z ##[debug]Archive '/home/runner/work/_actions/_temp_a9d68fe1-8b63-46e4-94e6-909abdf836ea/910c68ea-7730-4fe8-a5cb-4a1d181906b9.tar.gz' has been unzipped into '/home/runner/work/_actions/actions/checkout/v4'.
2026-03-08T06:22:48.6863372Z Download action repository 'pnpm/action-setup@v4' (SHA:41ff72655975bd51cab0327fa583b6e92b6d3061)
2026-03-08T06:22:49.3059159Z ##[debug]Download 'https://api.github.com/repos/pnpm/action-setup/tarball/41ff72655975bd51cab0327fa583b6e92b6d3061' to '/home/runner/work/_actions/_temp_988b1254-a3bc-4c92-9f3b-1a35086651f2/8737f84a-5183-49ed-82b6-d61053481b5d.tar.gz'
2026-03-08T06:22:49.3644074Z ##[debug]Unwrap 'pnpm-action-setup-41ff726' to '/home/runner/work/_actions/pnpm/action-setup/v4'
2026-03-08T06:22:49.3762062Z ##[debug]Archive '/home/runner/work/_actions/_temp_988b1254-a3bc-4c92-9f3b-1a35086651f2/8737f84a-5183-49ed-82b6-d61053481b5d.tar.gz' has been unzipped into '/home/runner/work/_actions/pnpm/action-setup/v4'.
2026-03-08T06:22:49.3796742Z Download action repository 'actions/setup-node@v4' (SHA:49933ea5288caeca8642d1e84afbd3f7d6820020)
2026-03-08T06:22:49.4229909Z ##[debug]Copied action archive '/opt/actionarchivecache/actions_setup-node/49933ea5288caeca8642d1e84afbd3f7d6820020.tar.gz' to '/home/runner/work/_actions/_temp_d1a3a0ae-8f5c-47c0-99cf-7c9fb0c4312c/bce61624-e7df-436b-97fd-1a3472544e6a.tar.gz'
2026-03-08T06:22:49.4810550Z ##[debug]Unwrap 'actions-setup-node-49933ea' to '/home/runner/work/_actions/actions/setup-node/v4'
2026-03-08T06:22:49.5054991Z ##[debug]Archive '/home/runner/work/_actions/_temp_d1a3a0ae-8f5c-47c0-99cf-7c9fb0c4312c/bce61624-e7df-436b-97fd-1a3472544e6a.tar.gz' has been unzipped into '/home/runner/work/_actions/actions/setup-node/v4'.
2026-03-08T06:22:49.5111585Z Download action repository 'google-github-actions/auth@v2' (SHA:c200f3691d83b41bf9bbd8638997a462592937ed)
2026-03-08T06:22:50.0286319Z ##[debug]Download 'https://api.github.com/repos/google-github-actions/auth/tarball/c200f3691d83b41bf9bbd8638997a462592937ed' to '/home/runner/work/_actions/_temp_83234bb9-5c46-40ce-881a-fd0af13226f5/52f8ad1b-aae6-41b8-a0f3-7505117a8442.tar.gz'
2026-03-08T06:22:50.0489636Z ##[debug]Unwrap 'google-github-actions-auth-c200f36' to '/home/runner/work/_actions/google-github-actions/auth/v2'
2026-03-08T06:22:50.0551520Z ##[debug]Archive '/home/runner/work/_actions/_temp_83234bb9-5c46-40ce-881a-fd0af13226f5/52f8ad1b-aae6-41b8-a0f3-7505117a8442.tar.gz' has been unzipped into '/home/runner/work/_actions/google-github-actions/auth/v2'.
2026-03-08T06:22:50.0581012Z ##[debug]action.yml for action: '/home/runner/work/_actions/actions/checkout/v4/action.yml'.
2026-03-08T06:22:50.1361833Z ##[debug]action.yml for action: '/home/runner/work/_actions/pnpm/action-setup/v4/action.yml'.
2026-03-08T06:22:50.1394668Z ##[debug]action.yml for action: '/home/runner/work/_actions/actions/setup-node/v4/action.yml'.
2026-03-08T06:22:50.1449783Z ##[debug]action.yml for action: '/home/runner/work/_actions/google-github-actions/auth/v2/action.yml'.
2026-03-08T06:22:50.1576774Z ##[debug]Set step '__actions_checkout' display name to: 'Checkout code'
2026-03-08T06:22:50.1641624Z ##[debug]Set step '__pnpm_action-setup' display name to: 'Setup pnpm'
2026-03-08T06:22:50.1643793Z ##[debug]Set step '__actions_setup-node' display name to: 'Setup Node.js'
2026-03-08T06:22:50.1645535Z ##[debug]Set step '__run' display name to: 'Install dependencies'
2026-03-08T06:22:50.1647183Z ##[debug]Set step '__run_2' display name to: 'Validate Supabase env vars'
2026-03-08T06:22:50.1649020Z ##[debug]Set step '__run_3' display name to: 'Run linter'
2026-03-08T06:22:50.1650661Z ##[debug]Set step '__run_4' display name to: 'Run type check'
2026-03-08T06:22:50.1652245Z ##[debug]Set step '__run_5' display name to: 'Validate and Install functions'
2026-03-08T06:22:50.1653815Z ##[debug]Set step '__run_6' display name to: 'Build Cloud Functions'
2026-03-08T06:22:50.1655461Z ##[debug]Set step '__run_7' display name to: 'Generate .env.production for deployment'
2026-03-08T06:22:50.1657122Z ##[debug]Set step '__run_8' display name to: 'Build Next.js application'
2026-03-08T06:22:50.1658875Z ##[debug]Set step '__run_9' display name to: 'Prepare hosting files'
2026-03-08T06:22:50.1660533Z ##[debug]Set step '__run_10' display name to: 'Validate Firebase Auth Secret'
2026-03-08T06:22:50.1662167Z ##[debug]Set step 'auth' display name to: 'Authenticate to Google Cloud'
2026-03-08T06:22:50.1663847Z ##[debug]Set step 'firebase_project' display name to: 'Resolve Firebase project id'
2026-03-08T06:22:50.1665464Z ##[debug]Set step '__run_11' display name to: 'Install Firebase CLI'
2026-03-08T06:22:50.1667060Z ##[debug]Set step '__run_12' display name to: 'Validate Firebase project access'
2026-03-08T06:22:50.1668831Z ##[debug]Set step '__run_13' display name to: 'Deploy to Firebase'
2026-03-08T06:22:50.1670447Z ##[debug]Set step '__run_14' display name to: 'Notify success'
2026-03-08T06:22:50.1671942Z ##[debug]Set step '__run_15' display name to: 'Notify failure'
2026-03-08T06:22:50.1672808Z Complete job name: test-and-deploy
2026-03-08T06:22:50.1743035Z ##[debug]Collect running processes for tracking orphan processes.
2026-03-08T06:22:50.1978597Z ##[debug]Finishing: Set up job
2026-03-08T06:22:50.2097748Z ##[debug]Evaluating condition for step: 'Checkout code'
2026-03-08T06:22:50.2118680Z ##[debug]Evaluating: success()
2026-03-08T06:22:50.2119890Z ##[debug]Evaluating success:
2026-03-08T06:22:50.2126805Z ##[debug]=> true
2026-03-08T06:22:50.2129969Z ##[debug]Result: true
2026-03-08T06:22:50.2142396Z ##[debug]Starting: Checkout code
2026-03-08T06:22:50.2211355Z ##[debug]Register post job cleanup for action: actions/checkout@v4
2026-03-08T06:22:50.2285271Z ##[debug]Loading inputs
2026-03-08T06:22:50.2293571Z ##[debug]Evaluating: github.repository
2026-03-08T06:22:50.2294081Z ##[debug]Evaluating Index:
2026-03-08T06:22:50.2294493Z ##[debug]..Evaluating github:
2026-03-08T06:22:50.2294919Z ##[debug]..=> Object
2026-03-08T06:22:50.2295304Z ##[debug]..Evaluating String:
2026-03-08T06:22:50.2295717Z ##[debug]..=> 'repository'
2026-03-08T06:22:50.2296259Z ##[debug]=> 'danilonovaisv/PORTFOLIO-DANILO-FINAL'
2026-03-08T06:22:50.2296815Z ##[debug]Result: 'danilonovaisv/PORTFOLIO-DANILO-FINAL'
2026-03-08T06:22:50.2301396Z ##[debug]Evaluating: github.token
2026-03-08T06:22:50.2301866Z ##[debug]Evaluating Index:
2026-03-08T06:22:50.2302262Z ##[debug]..Evaluating github:
2026-03-08T06:22:50.2302922Z ##[debug]..=> Object
2026-03-08T06:22:50.2303319Z ##[debug]..Evaluating String:
2026-03-08T06:22:50.2303712Z ##[debug]..=> 'token'
2026-03-08T06:22:50.2304340Z ##[debug]=> '***'
2026-03-08T06:22:50.2304834Z ##[debug]Result: '***'
2026-03-08T06:22:50.2323802Z ##[debug]Loading env
2026-03-08T06:22:50.2388985Z ##[group]Run actions/checkout@v4
2026-03-08T06:22:50.2389603Z with:
2026-03-08T06:22:50.2390012Z   repository: danilonovaisv/PORTFOLIO-DANILO-FINAL
2026-03-08T06:22:50.2390635Z   token: ***
2026-03-08T06:22:50.2390968Z   ssh-strict: true
2026-03-08T06:22:50.2391313Z   ssh-user: git
2026-03-08T06:22:50.2391664Z   persist-credentials: true
2026-03-08T06:22:50.2392041Z   clean: true
2026-03-08T06:22:50.2392387Z   sparse-checkout-cone-mode: true
2026-03-08T06:22:50.2392799Z   fetch-depth: 1
2026-03-08T06:22:50.2393162Z   fetch-tags: false
2026-03-08T06:22:50.2393513Z   show-progress: true
2026-03-08T06:22:50.2393856Z   lfs: false
2026-03-08T06:22:50.2394174Z   submodules: false
2026-03-08T06:22:50.2394528Z   set-safe-directory: true
2026-03-08T06:22:50.2395092Z env:
2026-03-08T06:22:50.2395417Z   NODE_VERSION: 20
2026-03-08T06:22:50.2395771Z   PNPM_VERSION: 10.31.0
2026-03-08T06:22:50.2396300Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-08T06:22:50.2397826Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-08T06:22:50.2398584Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-08T06:22:50.2399227Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-08T06:22:50.2400854Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-08T06:22:50.2410839Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-08T06:22:50.2411312Z   FIREBASE_PROJECT_ID: ***
2026-03-08T06:22:50.2411675Z ##[endgroup]
2026-03-08T06:22:50.3394161Z ##[debug]GITHUB_WORKSPACE = '/home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL'
2026-03-08T06:22:50.3396321Z ##[debug]qualified repository = 'danilonovaisv/PORTFOLIO-DANILO-FINAL'
2026-03-08T06:22:50.3397157Z ##[debug]ref = 'refs/heads/main'
2026-03-08T06:22:50.3398035Z ##[debug]commit = 'a58dc4451b4c23d959e90cc8825e6388777a8a80'
2026-03-08T06:22:50.3399451Z ##[debug]clean = true
2026-03-08T06:22:50.3400323Z ##[debug]filter = undefined
2026-03-08T06:22:50.3400940Z ##[debug]fetch depth = 1
2026-03-08T06:22:50.3401547Z ##[debug]fetch tags = false
2026-03-08T06:22:50.3402151Z ##[debug]show progress = true
2026-03-08T06:22:50.3425759Z ##[debug]lfs = false
2026-03-08T06:22:50.3426407Z ##[debug]submodules = false
2026-03-08T06:22:50.3427050Z ##[debug]recursive submodules = false
2026-03-08T06:22:50.3427723Z ##[debug]GitHub Host URL = 
2026-03-08T06:22:50.3429164Z ::add-matcher::/home/runner/work/_actions/actions/checkout/v4/dist/problem-matcher.json
2026-03-08T06:22:50.3509983Z ##[debug]Added matchers: 'checkout-git'. Problem matchers scan action output for known warning or error strings and report these inline.
2026-03-08T06:22:50.3515386Z Syncing repository: danilonovaisv/PORTFOLIO-DANILO-FINAL
2026-03-08T06:22:50.3516670Z ::group::Getting Git version info
2026-03-08T06:22:50.3517771Z ##[group]Getting Git version info
2026-03-08T06:22:50.3518677Z Working directory is '/home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL'
2026-03-08T06:22:50.3519596Z ##[debug]Getting git version
2026-03-08T06:22:50.3520002Z [command]/usr/bin/git version
2026-03-08T06:22:50.4535309Z git version 2.53.0
2026-03-08T06:22:50.4559564Z ##[debug]0
2026-03-08T06:22:50.4560453Z ##[debug]git version 2.53.0
2026-03-08T06:22:50.4560896Z ##[debug]
2026-03-08T06:22:50.4562159Z ##[debug]Set git useragent to: git/2.53.0 (github-actions-checkout)
2026-03-08T06:22:50.4563483Z ::endgroup::
2026-03-08T06:22:50.4564078Z ##[endgroup]
2026-03-08T06:22:50.4568258Z ::add-mask::***
2026-03-08T06:22:50.4585383Z Temporarily overriding HOME='/home/runner/work/_temp/319aecb8-81a6-499c-a383-77846ae7b6f1' before making global git config changes
2026-03-08T06:22:50.4586476Z Adding repository directory to the temporary git global config as a safe directory
2026-03-08T06:22:50.4591284Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL
2026-03-08T06:22:50.4672898Z ##[debug]0
2026-03-08T06:22:50.4673702Z ##[debug]
2026-03-08T06:22:50.4678305Z Deleting the contents of '/home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL'
2026-03-08T06:22:50.4681956Z ::group::Initializing the repository
2026-03-08T06:22:50.4682630Z ##[group]Initializing the repository
2026-03-08T06:22:50.4686076Z [command]/usr/bin/git init /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL
2026-03-08T06:22:50.5258937Z hint: Using 'master' as the name for the initial branch. This default branch name
2026-03-08T06:22:50.5260224Z hint: will change to "main" in Git 3.0. To configure the initial branch name
2026-03-08T06:22:50.5260947Z hint: to use in all of your new repositories, which will suppress this warning,
2026-03-08T06:22:50.5261516Z hint: call:
2026-03-08T06:22:50.5261855Z hint:
2026-03-08T06:22:50.5262294Z hint: 	git config --global init.defaultBranch <name>
2026-03-08T06:22:50.5262765Z hint:
2026-03-08T06:22:50.5263235Z hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
2026-03-08T06:22:50.5263908Z hint: 'development'. The just-created branch can be renamed via this command:
2026-03-08T06:22:50.5264437Z hint:
2026-03-08T06:22:50.5264765Z hint: 	git branch -m <name>
2026-03-08T06:22:50.5265134Z hint:
2026-03-08T06:22:50.5265603Z hint: Disable this message with "git config set advice.defaultBranchName false"
2026-03-08T06:22:50.5297323Z Initialized empty Git repository in /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/.git/
2026-03-08T06:22:50.5302535Z ##[debug]0
2026-03-08T06:22:50.5303476Z ##[debug]Initialized empty Git repository in /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/.git/
2026-03-08T06:22:50.5304201Z ##[debug]
2026-03-08T06:22:50.5307814Z [command]/usr/bin/git remote add origin https://github.com/danilonovaisv/PORTFOLIO-DANILO-FINAL
2026-03-08T06:22:50.5386287Z ##[debug]0
2026-03-08T06:22:50.5387306Z ##[debug]
2026-03-08T06:22:50.5388813Z ::endgroup::
2026-03-08T06:22:50.5389394Z ##[endgroup]
2026-03-08T06:22:50.5390568Z ::group::Disabling automatic garbage collection
2026-03-08T06:22:50.5391507Z ##[group]Disabling automatic garbage collection
2026-03-08T06:22:50.5392613Z [command]/usr/bin/git config --local gc.auto 0
2026-03-08T06:22:50.5422042Z ##[debug]0
2026-03-08T06:22:50.5423200Z ##[debug]
2026-03-08T06:22:50.5424259Z ::endgroup::
2026-03-08T06:22:50.5424895Z ##[endgroup]
2026-03-08T06:22:50.5425978Z ::group::Setting up auth
2026-03-08T06:22:50.5426651Z ##[group]Setting up auth
2026-03-08T06:22:50.5431807Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2026-03-08T06:22:50.5457498Z ##[debug]1
2026-03-08T06:22:50.5458795Z ##[debug]
2026-03-08T06:22:50.5464785Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2026-03-08T06:22:50.7375746Z ##[debug]0
2026-03-08T06:22:50.7376535Z ##[debug]
2026-03-08T06:22:50.7383082Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2026-03-08T06:22:50.7409099Z ##[debug]1
2026-03-08T06:22:50.7410053Z ##[debug]
2026-03-08T06:22:50.7414046Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2026-03-08T06:22:50.7643407Z ##[debug]0
2026-03-08T06:22:50.7644197Z ##[debug]
2026-03-08T06:22:50.7650560Z [command]/usr/bin/git config --local --name-only --get-regexp ^includeIf\.gitdir:
2026-03-08T06:22:50.7687241Z ##[debug]1
2026-03-08T06:22:50.7688410Z ##[debug]
2026-03-08T06:22:50.7692675Z [command]/usr/bin/git submodule foreach --recursive git config --local --show-origin --name-only --get-regexp remote.origin.url
2026-03-08T06:22:50.7919233Z ##[debug]0
2026-03-08T06:22:50.7919838Z ##[debug]
2026-03-08T06:22:50.7926920Z [command]/usr/bin/git config --local http.https://github.com/.extraheader AUTHORIZATION: basic ***
2026-03-08T06:22:50.7954521Z ##[debug]0
2026-03-08T06:22:50.7955665Z ##[debug]
2026-03-08T06:22:50.7963299Z ::endgroup::
2026-03-08T06:22:50.7963950Z ##[endgroup]
2026-03-08T06:22:50.7965090Z ::group::Fetching the repository
2026-03-08T06:22:50.7965884Z ##[group]Fetching the repository
2026-03-08T06:22:50.7973807Z [command]/usr/bin/git -c protocol.version=2 fetch --no-tags --prune --no-recurse-submodules --depth=1 origin +a58dc4451b4c23d959e90cc8825e6388777a8a80:refs/remotes/origin/main
2026-03-08T06:23:15.1889849Z From https://github.com/danilonovaisv/PORTFOLIO-DANILO-FINAL
2026-03-08T06:23:15.1891267Z  * [new ref]           a58dc4451b4c23d959e90cc8825e6388777a8a80 -> origin/main
2026-03-08T06:23:15.1924090Z ##[debug]0
2026-03-08T06:23:15.1924738Z ##[debug]
2026-03-08T06:23:15.1925201Z ::endgroup::
2026-03-08T06:23:15.1925484Z ##[endgroup]
2026-03-08T06:23:15.1926192Z ::group::Determining the checkout info
2026-03-08T06:23:15.1926603Z ##[group]Determining the checkout info
2026-03-08T06:23:15.1927205Z ::endgroup::
2026-03-08T06:23:15.1927479Z ##[endgroup]
2026-03-08T06:23:15.1934112Z [command]/usr/bin/git sparse-checkout disable
2026-03-08T06:23:15.2031056Z ##[debug]0
2026-03-08T06:23:15.2031934Z ##[debug]
2026-03-08T06:23:15.2036642Z [command]/usr/bin/git config --local --unset-all extensions.worktreeConfig
2026-03-08T06:23:15.2064417Z ##[debug]0
2026-03-08T06:23:15.2065328Z ##[debug]
2026-03-08T06:23:15.2066197Z ::group::Checking out the ref
2026-03-08T06:23:15.2066824Z ##[group]Checking out the ref
2026-03-08T06:23:15.2071217Z [command]/usr/bin/git checkout --progress --force -B main refs/remotes/origin/main
2026-03-08T06:23:16.3269396Z Updating files:  30% (6176/20114)
2026-03-08T06:23:16.4952173Z Updating files:  31% (6236/20114)
2026-03-08T06:23:16.6451594Z Updating files:  32% (6437/20114)
2026-03-08T06:23:16.7800822Z Updating files:  33% (6638/20114)
2026-03-08T06:23:16.9302325Z Updating files:  34% (6839/20114)
2026-03-08T06:23:17.2013755Z Updating files:  35% (7040/20114)
2026-03-08T06:23:17.2623169Z Updating files:  36% (7242/20114)
2026-03-08T06:23:17.3821940Z Updating files:  36% (7290/20114)
2026-03-08T06:23:17.6016342Z Updating files:  37% (7443/20114)
2026-03-08T06:23:17.7389125Z Updating files:  38% (7644/20114)
2026-03-08T06:23:17.9314492Z Updating files:  39% (7845/20114)
2026-03-08T06:23:18.0372060Z Updating files:  40% (8046/20114)
2026-03-08T06:23:18.2250677Z Updating files:  41% (8247/20114)
2026-03-08T06:23:18.2764048Z Updating files:  42% (8448/20114)
2026-03-08T06:23:18.4650163Z Updating files:  42% (8476/20114)
2026-03-08T06:23:18.6089740Z Updating files:  43% (8650/20114)
2026-03-08T06:23:18.8089940Z Updating files:  44% (8851/20114)
2026-03-08T06:23:18.9477336Z Updating files:  45% (9052/20114)
2026-03-08T06:23:18.9924662Z Updating files:  46% (9253/20114)
2026-03-08T06:23:19.0071956Z Updating files:  47% (9454/20114)
2026-03-08T06:23:19.0205566Z Updating files:  48% (9655/20114)
2026-03-08T06:23:19.0338569Z Updating files:  49% (9856/20114)
2026-03-08T06:23:19.0476958Z Updating files:  50% (10057/20114)
2026-03-08T06:23:19.0613614Z Updating files:  51% (10259/20114)
2026-03-08T06:23:19.0746402Z Updating files:  52% (10460/20114)
2026-03-08T06:23:19.1471588Z Updating files:  53% (10661/20114)
2026-03-08T06:23:19.1607286Z Updating files:  54% (10862/20114)
2026-03-08T06:23:19.1741407Z Updating files:  55% (11063/20114)
2026-03-08T06:23:19.1873071Z Updating files:  56% (11264/20114)
2026-03-08T06:23:19.2005457Z Updating files:  57% (11465/20114)
2026-03-08T06:23:19.2146881Z Updating files:  58% (11667/20114)
2026-03-08T06:23:19.2281771Z Updating files:  59% (11868/20114)
2026-03-08T06:23:19.2414054Z Updating files:  60% (12069/20114)
2026-03-08T06:23:19.2554736Z Updating files:  61% (12270/20114)
2026-03-08T06:23:19.2612991Z Updating files:  62% (12471/20114)
2026-03-08T06:23:19.2692348Z Updating files:  62% (12553/20114)
2026-03-08T06:23:19.2825982Z Updating files:  63% (12672/20114)
2026-03-08T06:23:19.4172438Z Updating files:  64% (12873/20114)
2026-03-08T06:23:20.0559112Z Updating files:  65% (13075/20114)
2026-03-08T06:23:20.2611737Z Updating files:  66% (13276/20114)
2026-03-08T06:23:20.2620785Z Updating files:  67% (13477/20114)
2026-03-08T06:23:20.5059021Z Updating files:  67% (13478/20114)
2026-03-08T06:23:20.5662855Z Updating files:  68% (13678/20114)
2026-03-08T06:23:20.6875441Z Updating files:  69% (13879/20114)
2026-03-08T06:23:20.7479222Z Updating files:  70% (14080/20114)
2026-03-08T06:23:20.8894565Z Updating files:  71% (14281/20114)
2026-03-08T06:23:20.9839155Z Updating files:  72% (14483/20114)
2026-03-08T06:23:21.0183644Z Updating files:  73% (14684/20114)
2026-03-08T06:23:21.0397029Z Updating files:  74% (14885/20114)
2026-03-08T06:23:21.0552189Z Updating files:  75% (15086/20114)
2026-03-08T06:23:21.0677515Z Updating files:  76% (15287/20114)
2026-03-08T06:23:21.0802741Z Updating files:  77% (15488/20114)
2026-03-08T06:23:21.1503972Z Updating files:  78% (15689/20114)
2026-03-08T06:23:21.2654658Z Updating files:  79% (15891/20114)
2026-03-08T06:23:21.3282681Z Updating files:  79% (16022/20114)
2026-03-08T06:23:21.4654161Z Updating files:  80% (16092/20114)
2026-03-08T06:23:21.7216032Z Updating files:  81% (16293/20114)
2026-03-08T06:23:22.0041094Z Updating files:  82% (16494/20114)
2026-03-08T06:23:22.1803558Z Updating files:  83% (16695/20114)
2026-03-08T06:23:22.2623204Z Updating files:  84% (16896/20114)
2026-03-08T06:23:22.3180791Z Updating files:  84% (16988/20114)
2026-03-08T06:23:22.4088607Z Updating files:  85% (17097/20114)
2026-03-08T06:23:22.4658935Z Updating files:  86% (17299/20114)
2026-03-08T06:23:22.4801457Z Updating files:  87% (17500/20114)
2026-03-08T06:23:22.4942387Z Updating files:  88% (17701/20114)
2026-03-08T06:23:22.5086181Z Updating files:  89% (17902/20114)
2026-03-08T06:23:22.5226514Z Updating files:  90% (18103/20114)
2026-03-08T06:23:22.5374067Z Updating files:  91% (18304/20114)
2026-03-08T06:23:22.5522573Z Updating files:  92% (18505/20114)
2026-03-08T06:23:22.7428428Z Updating files:  93% (18707/20114)
2026-03-08T06:23:22.8824782Z Updating files:  94% (18908/20114)
2026-03-08T06:23:22.8883985Z Updating files:  95% (19109/20114)
2026-03-08T06:23:22.9157022Z Updating files:  96% (19310/20114)
2026-03-08T06:23:22.9273014Z Updating files:  97% (19511/20114)
2026-03-08T06:23:22.9367535Z Updating files:  98% (19712/20114)
2026-03-08T06:23:22.9464992Z Updating files:  99% (19913/20114)
2026-03-08T06:23:22.9465719Z Updating files: 100% (20114/20114)
2026-03-08T06:23:22.9466455Z Updating files: 100% (20114/20114), done.
2026-03-08T06:23:22.9842989Z Switched to a new branch 'main'
2026-03-08T06:23:22.9846465Z branch 'main' set up to track 'origin/main'.
2026-03-08T06:23:23.0171043Z ##[debug]0
2026-03-08T06:23:23.0171955Z ##[debug]branch 'main' set up to track 'origin/main'.
2026-03-08T06:23:23.0172690Z ##[debug]
2026-03-08T06:23:23.0173201Z ::endgroup::
2026-03-08T06:23:23.0173490Z ##[endgroup]
2026-03-08T06:23:23.0210071Z ##[debug]0
2026-03-08T06:23:23.0211018Z ##[debug]commit a58dc4451b4c23d959e90cc8825e6388777a8a80
2026-03-08T06:23:23.0211815Z ##[debug]Author: danilonovaisv <danilo_novais@yahoo.com.br>
2026-03-08T06:23:23.0212599Z ##[debug]Date:   Sun Mar 8 03:12:39 2026 -0300
2026-03-08T06:23:23.0213191Z ##[debug]
2026-03-08T06:23:23.0213668Z ##[debug]    Corrigir engine Markdown e fontes
2026-03-08T06:23:23.0214273Z ##[debug]
2026-03-08T06:23:23.0214774Z [command]/usr/bin/git log -1 --format=%H
2026-03-08T06:23:23.0237016Z a58dc4451b4c23d959e90cc8825e6388777a8a80
2026-03-08T06:23:23.0242091Z ##[debug]0
2026-03-08T06:23:23.0242884Z ##[debug]a58dc4451b4c23d959e90cc8825e6388777a8a80
2026-03-08T06:23:23.0243265Z ##[debug]
2026-03-08T06:23:23.0248025Z ##[debug]Unsetting HOME override
2026-03-08T06:23:23.0257279Z ::remove-matcher owner=checkout-git::
2026-03-08T06:23:23.0269379Z ##[debug]Removed matchers: 'checkout-git'
2026-03-08T06:23:23.0315912Z ##[debug]Node Action run completed with exit code 0
2026-03-08T06:23:23.0350122Z ##[debug]Save intra-action state isPost = true
2026-03-08T06:23:23.0350933Z ##[debug]Save intra-action state setSafeDirectory = true
2026-03-08T06:23:23.0351657Z ##[debug]Save intra-action state repositoryPath = /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL
2026-03-08T06:23:23.0355164Z ##[debug]Set output commit = a58dc4451b4c23d959e90cc8825e6388777a8a80
2026-03-08T06:23:23.0356041Z ##[debug]Set output ref = refs/heads/main
2026-03-08T06:23:23.0362766Z ##[debug]Finishing: Checkout code
2026-03-08T06:23:23.0376085Z ##[debug]Evaluating condition for step: 'Setup pnpm'
2026-03-08T06:23:23.0379821Z ##[debug]Evaluating: success()
2026-03-08T06:23:23.0380525Z ##[debug]Evaluating success:
2026-03-08T06:23:23.0381228Z ##[debug]=> true
2026-03-08T06:23:23.0381808Z ##[debug]Result: true
2026-03-08T06:23:23.0382834Z ##[debug]Starting: Setup pnpm
2026-03-08T06:23:23.0402933Z ##[debug]Register post job cleanup for action: pnpm/action-setup@v4
2026-03-08T06:23:23.0416794Z ##[debug]Loading inputs
2026-03-08T06:23:23.0418993Z ##[debug]Evaluating: env.PNPM_VERSION
2026-03-08T06:23:23.0419463Z ##[debug]Evaluating Index:
2026-03-08T06:23:23.0419864Z ##[debug]..Evaluating env:
2026-03-08T06:23:23.0420229Z ##[debug]..=> Object
2026-03-08T06:23:23.0420576Z ##[debug]..Evaluating String:
2026-03-08T06:23:23.0420944Z ##[debug]..=> 'PNPM_VERSION'
2026-03-08T06:23:23.0422879Z ##[debug]=> '10.31.0'
2026-03-08T06:23:23.0423258Z ##[debug]Result: '10.31.0'
2026-03-08T06:23:23.0431137Z ##[debug]Loading env
2026-03-08T06:23:23.0437424Z ##[group]Run pnpm/action-setup@v4
2026-03-08T06:23:23.0437847Z with:
2026-03-08T06:23:23.0438261Z   version: 10.31.0
2026-03-08T06:23:23.0438581Z   dest: ~/setup-pnpm
2026-03-08T06:23:23.0438890Z   run_install: null
2026-03-08T06:23:23.0439211Z   package_json_file: package.json
2026-03-08T06:23:23.0439556Z   standalone: false
2026-03-08T06:23:23.0439854Z env:
2026-03-08T06:23:23.0440130Z   NODE_VERSION: 20
2026-03-08T06:23:23.0440439Z   PNPM_VERSION: 10.31.0
2026-03-08T06:23:23.0440927Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-08T06:23:23.0442421Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-08T06:23:23.0442977Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-08T06:23:23.0443564Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-08T06:23:23.0445139Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-08T06:23:23.0454916Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-08T06:23:23.0455341Z   FIREBASE_PROJECT_ID: ***
2026-03-08T06:23:23.0455672Z ##[endgroup]
2026-03-08T06:23:23.0998882Z ::group::Running self-installer...
2026-03-08T06:23:23.0999374Z ##[group]Running self-installer...
2026-03-08T06:23:23.8420234Z Progress: resolved 1, reused 0, downloaded 0, added 0
2026-03-08T06:23:23.8546116Z Packages: +1
2026-03-08T06:23:23.8547406Z +
2026-03-08T06:23:24.3088647Z Progress: resolved 1, reused 0, downloaded 1, added 1, done
2026-03-08T06:23:24.3348723Z 
2026-03-08T06:23:24.3349095Z dependencies:
2026-03-08T06:23:24.3349487Z + pnpm 10.31.0
2026-03-08T06:23:24.3349680Z 
2026-03-08T06:23:24.3379479Z Done in 1s
2026-03-08T06:23:24.3559739Z ::endgroup::
2026-03-08T06:23:24.3560298Z ##[endgroup]
2026-03-08T06:23:24.3564357Z Installation Completed!
2026-03-08T06:23:24.3623670Z ##[debug]Node Action run completed with exit code 0
2026-03-08T06:23:24.3627818Z ##[debug]PNPM_HOME='/home/runner/setup-pnpm/node_modules/.bin'
2026-03-08T06:23:24.3629795Z ##[debug]Save intra-action state is_post = true
2026-03-08T06:23:24.3630503Z ##[debug]Set output dest = /home/runner/setup-pnpm
2026-03-08T06:23:24.3631017Z ##[debug]Set output bin_dest = /home/runner/setup-pnpm/node_modules/.bin
2026-03-08T06:23:24.3631889Z ##[debug]Finishing: Setup pnpm
2026-03-08T06:23:24.3640914Z ##[debug]Evaluating condition for step: 'Setup Node.js'
2026-03-08T06:23:24.3642871Z ##[debug]Evaluating: success()
2026-03-08T06:23:24.3643375Z ##[debug]Evaluating success:
2026-03-08T06:23:24.3643980Z ##[debug]=> true
2026-03-08T06:23:24.3644450Z ##[debug]Result: true
2026-03-08T06:23:24.3645117Z ##[debug]Starting: Setup Node.js
2026-03-08T06:23:24.3679662Z ##[debug]Register post job cleanup for action: actions/setup-node@v4
2026-03-08T06:23:24.3691535Z ##[debug]Loading inputs
2026-03-08T06:23:24.3692902Z ##[debug]Evaluating: env.NODE_VERSION
2026-03-08T06:23:24.3693328Z ##[debug]Evaluating Index:
2026-03-08T06:23:24.3693664Z ##[debug]..Evaluating env:
2026-03-08T06:23:24.3693988Z ##[debug]..=> Object
2026-03-08T06:23:24.3694314Z ##[debug]..Evaluating String:
2026-03-08T06:23:24.3694657Z ##[debug]..=> 'NODE_VERSION'
2026-03-08T06:23:24.3695099Z ##[debug]=> '20'
2026-03-08T06:23:24.3695393Z ##[debug]Result: '20'
2026-03-08T06:23:24.3704116Z ##[debug]Evaluating: (((github.server_url == 'https://github.com') && github.token) || '')
2026-03-08T06:23:24.3704726Z ##[debug]Evaluating Or:
2026-03-08T06:23:24.3705087Z ##[debug]..Evaluating And:
2026-03-08T06:23:24.3707425Z ##[debug]....Evaluating Equal:
2026-03-08T06:23:24.3708751Z ##[debug]......Evaluating Index:
2026-03-08T06:23:24.3709122Z ##[debug]........Evaluating github:
2026-03-08T06:23:24.3709514Z ##[debug]........=> Object
2026-03-08T06:23:24.3709867Z ##[debug]........Evaluating String:
2026-03-08T06:23:24.3710233Z ##[debug]........=> 'server_url'
2026-03-08T06:23:24.3710622Z ##[debug]......=> 'https://github.com'
2026-03-08T06:23:24.3710992Z ##[debug]......Evaluating String:
2026-03-08T06:23:24.3711335Z ##[debug]......=> 'https://github.com'
2026-03-08T06:23:24.3714330Z ##[debug]....=> true
2026-03-08T06:23:24.3714846Z ##[debug]....Evaluating Index:
2026-03-08T06:23:24.3715200Z ##[debug]......Evaluating github:
2026-03-08T06:23:24.3715552Z ##[debug]......=> Object
2026-03-08T06:23:24.3715881Z ##[debug]......Evaluating String:
2026-03-08T06:23:24.3716245Z ##[debug]......=> 'token'
2026-03-08T06:23:24.3716737Z ##[debug]....=> '***'
2026-03-08T06:23:24.3717182Z ##[debug]..=> '***'
2026-03-08T06:23:24.3717749Z ##[debug]=> '***'
2026-03-08T06:23:24.3720817Z ##[debug]Expanded: ((('https://github.com' == 'https://github.com') && '***') || '')
2026-03-08T06:23:24.3721467Z ##[debug]Result: '***'
2026-03-08T06:23:24.3723731Z ##[debug]Loading env
2026-03-08T06:23:24.3729148Z ##[group]Run actions/setup-node@v4
2026-03-08T06:23:24.3729470Z with:
2026-03-08T06:23:24.3729725Z   node-version: 20
2026-03-08T06:23:24.3729993Z   cache: pnpm
2026-03-08T06:23:24.3730283Z   cache-dependency-path: pnpm-lock.yaml
2026-03-08T06:23:24.3730623Z   always-auth: false
2026-03-08T06:23:24.3730901Z   check-latest: false
2026-03-08T06:23:24.3731275Z   token: ***
2026-03-08T06:23:24.3731529Z env:
2026-03-08T06:23:24.3731769Z   NODE_VERSION: 20
2026-03-08T06:23:24.3732035Z   PNPM_VERSION: 10.31.0
2026-03-08T06:23:24.3732453Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-08T06:23:24.3733888Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-08T06:23:24.3734391Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-08T06:23:24.3734947Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-08T06:23:24.3736530Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-08T06:23:24.3746297Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-08T06:23:24.3746693Z   FIREBASE_PROJECT_ID: ***
2026-03-08T06:23:24.3747051Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2026-03-08T06:23:24.3747432Z ##[endgroup]
2026-03-08T06:23:24.5441448Z ##[debug]isExplicit: 
2026-03-08T06:23:24.5442616Z ##[debug]explicit? false
2026-03-08T06:23:24.5526737Z ##[debug]isExplicit: 20.20.0
2026-03-08T06:23:24.5527639Z ##[debug]explicit? true
2026-03-08T06:23:24.5707650Z ##[debug]isExplicit: 22.22.0
2026-03-08T06:23:24.5708991Z ##[debug]explicit? true
2026-03-08T06:23:24.5748829Z ##[debug]isExplicit: 24.14.0
2026-03-08T06:23:24.5749936Z ##[debug]explicit? true
2026-03-08T06:23:24.5796910Z ##[debug]evaluating 3 versions
2026-03-08T06:23:24.5834337Z ##[debug]matched: 20.20.0
2026-03-08T06:23:24.5835350Z ##[debug]checking cache: /opt/hostedtoolcache/node/20.20.0/x64
2026-03-08T06:23:24.5845910Z ##[debug]Found tool in cache node 20.20.0 x64
2026-03-08T06:23:24.5846649Z Found in cache @ /opt/hostedtoolcache/node/20.20.0/x64
2026-03-08T06:23:24.5847787Z ::group::Environment details
2026-03-08T06:23:24.5848563Z ##[group]Environment details
2026-03-08T06:23:26.8613827Z node: v20.20.0
2026-03-08T06:23:26.8614362Z npm: 10.8.2
2026-03-08T06:23:26.8614783Z yarn: 1.22.22
2026-03-08T06:23:26.8616404Z ::endgroup::
2026-03-08T06:23:26.8616867Z ##[endgroup]
2026-03-08T06:23:26.8641774Z [command]/home/runner/setup-pnpm/node_modules/.bin/pnpm store path --silent
2026-03-08T06:23:27.3640961Z /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/.pnpm-store/v10
2026-03-08T06:23:27.3710434Z ##[debug]pnpm's cache folder "/home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/.pnpm-store/v10" configured for the root directory
2026-03-08T06:23:27.3715085Z ##[debug]followSymbolicLinks 'true'
2026-03-08T06:23:27.3742678Z ##[debug]followSymbolicLinks 'true'
2026-03-08T06:23:27.3743705Z ##[debug]implicitDescendants 'true'
2026-03-08T06:23:27.3744817Z ##[debug]matchDirectories 'true'
2026-03-08T06:23:27.3745846Z ##[debug]omitBrokenSymbolicLinks 'true'
2026-03-08T06:23:27.3746844Z ##[debug]excludeHiddenFiles 'false'
2026-03-08T06:23:27.3751131Z ##[debug]Search path '/home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/pnpm-lock.yaml'
2026-03-08T06:23:27.3759112Z ##[debug]/home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/pnpm-lock.yaml
2026-03-08T06:23:27.3822333Z ##[debug]Found 1 files to hash.
2026-03-08T06:23:27.3823946Z ##[debug]primary key is node-cache-Linux-x64-pnpm-e0caf8460ecaf19368a9ff9e55dfdb8f27712d523913b71c7729e0d87824f535
2026-03-08T06:23:27.3826224Z ##[debug]Cache service version: v2
2026-03-08T06:23:27.3829690Z ##[debug]Resolved Keys:
2026-03-08T06:23:27.3831170Z ##[debug]["node-cache-Linux-x64-pnpm-e0caf8460ecaf19368a9ff9e55dfdb8f27712d523913b71c7729e0d87824f535"]
2026-03-08T06:23:27.3834914Z ##[debug]Checking zstd --quiet --version
2026-03-08T06:23:27.4110967Z ##[debug]1.5.7
2026-03-08T06:23:27.4113481Z ##[debug]zstd version: 1.5.7
2026-03-08T06:23:27.4121864Z ##[debug][Request] GetCacheEntryDownloadURL https://results-receiver.actions.githubusercontent.com/twirp/github.actions.results.api.v1.CacheService/GetCacheEntryDownloadURL
2026-03-08T06:23:27.5893283Z ##[debug][Response] - 200
2026-03-08T06:23:27.5895272Z ##[debug]Headers: ***
2026-03-08T06:23:27.5895822Z ##[debug]  "content-length": "56",
2026-03-08T06:23:27.5896507Z ##[debug]  "content-type": "application/json",
2026-03-08T06:23:27.5897142Z ##[debug]  "date": "Sun, 08 Mar 2026 06:23:27 GMT",
2026-03-08T06:23:27.5897621Z ##[debug]  "x-github-backend": "Kubernetes",
2026-03-08T06:23:27.5898446Z ##[debug]  "x-github-request-id": "8412:43FB7:41F7D8:5652AE:69AD15DF"
2026-03-08T06:23:27.5899067Z ##[debug]***
2026-03-08T06:23:27.5899639Z ##[debug]Body: ***
2026-03-08T06:23:27.5899979Z ##[debug]  "ok": false,
2026-03-08T06:23:27.5900339Z ##[debug]  "signed_download_url": "",
2026-03-08T06:23:27.5900750Z ##[debug]  "matched_key": ""
2026-03-08T06:23:27.5901112Z ##[debug]***
2026-03-08T06:23:27.5903429Z ##[debug]Cache not found for version 0641630a525767172d854a286e06e59932e54bc6757f2212bc334150f7228163 of keys: node-cache-Linux-x64-pnpm-e0caf8460ecaf19368a9ff9e55dfdb8f27712d523913b71c7729e0d87824f535
2026-03-08T06:23:27.5905168Z pnpm cache is not found
2026-03-08T06:23:27.5911179Z ##[add-matcher]/home/runner/work/_actions/actions/setup-node/v4/.github/tsc.json
2026-03-08T06:23:27.5930627Z ##[debug]Added matchers: 'tsc'. Problem matchers scan action output for known warning or error strings and report these inline.
2026-03-08T06:23:27.5931829Z ##[add-matcher]/home/runner/work/_actions/actions/setup-node/v4/.github/eslint-stylish.json
2026-03-08T06:23:27.5941893Z ##[debug]Added matchers: 'eslint-stylish'. Problem matchers scan action output for known warning or error strings and report these inline.
2026-03-08T06:23:27.5943084Z ##[add-matcher]/home/runner/work/_actions/actions/setup-node/v4/.github/eslint-compact.json
2026-03-08T06:23:27.5946219Z ##[debug]Added matchers: 'eslint-compact'. Problem matchers scan action output for known warning or error strings and report these inline.
2026-03-08T06:23:27.5973763Z ##[debug]Node Action run completed with exit code 0
2026-03-08T06:23:27.5976395Z ##[debug]Save intra-action state SETUP_NODE_CACHE_PACKAGE_MANAGER = pnpm
2026-03-08T06:23:27.5977200Z ##[debug]Save intra-action state CACHE_PATHS = ["/home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL/.pnpm-store/v10"]
2026-03-08T06:23:27.5978552Z ##[debug]Save intra-action state CACHE_KEY = node-cache-Linux-x64-pnpm-e0caf8460ecaf19368a9ff9e55dfdb8f27712d523913b71c7729e0d87824f535
2026-03-08T06:23:27.5979573Z ##[debug]Set output node-version = v20.20.0
2026-03-08T06:23:27.5979973Z ##[debug]Set output cache-hit = false
2026-03-08T06:23:27.5980587Z ##[debug]Finishing: Setup Node.js
2026-03-08T06:23:27.5989076Z ##[debug]Evaluating condition for step: 'Install dependencies'
2026-03-08T06:23:27.5991234Z ##[debug]Evaluating: success()
2026-03-08T06:23:27.5991806Z ##[debug]Evaluating success:
2026-03-08T06:23:27.5992338Z ##[debug]=> true
2026-03-08T06:23:27.5992806Z ##[debug]Result: true
2026-03-08T06:23:27.5993467Z ##[debug]Starting: Install dependencies
2026-03-08T06:23:27.6002930Z ##[debug]Loading inputs
2026-03-08T06:23:27.6004111Z ##[debug]Loading env
2026-03-08T06:23:27.6021489Z ##[group]Run pnpm install --frozen-lockfile --ignore-scripts
2026-03-08T06:23:27.6022063Z [36;1mpnpm install --frozen-lockfile --ignore-scripts[0m
2026-03-08T06:23:27.6078607Z shell: /usr/bin/bash -e ***0***
2026-03-08T06:23:27.6078966Z env:
2026-03-08T06:23:27.6079222Z   NODE_VERSION: 20
2026-03-08T06:23:27.6079511Z   PNPM_VERSION: 10.31.0
2026-03-08T06:23:27.6079966Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-08T06:23:27.6081415Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-08T06:23:27.6081970Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-08T06:23:27.6082511Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-08T06:23:27.6084057Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-08T06:23:27.6093904Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-08T06:23:27.6094306Z   FIREBASE_PROJECT_ID: ***
2026-03-08T06:23:27.6094670Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2026-03-08T06:23:27.6095050Z ##[endgroup]
2026-03-08T06:23:27.6164233Z ##[debug]/usr/bin/bash -e /home/runner/work/_temp/1dd9848c-a3df-4362-a1c4-9dc114afda92.sh
2026-03-08T06:23:28.0064975Z Scope: all 2 workspace projects
2026-03-08T06:23:28.1366516Z Lockfile is up to date, resolution step is skipped
2026-03-08T06:23:28.2793720Z Progress: resolved 1, reused 0, downloaded 0, added 0
2026-03-08T06:23:28.4831566Z Packages: +2024
2026-03-08T06:23:28.4833850Z ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
2026-03-08T06:23:29.2801252Z Progress: resolved 2024, reused 3, downloaded 19, added 4
2026-03-08T06:23:30.2812018Z Progress: resolved 2024, reused 3, downloaded 92, added 28
2026-03-08T06:23:31.2830790Z Progress: resolved 2024, reused 3, downloaded 254, added 258
2026-03-08T06:23:32.2840545Z Progress: resolved 2024, reused 3, downloaded 489, added 496
2026-03-08T06:23:33.2850399Z Progress: resolved 2024, reused 3, downloaded 618, added 587
2026-03-08T06:23:34.2859300Z Progress: resolved 2024, reused 3, downloaded 752, added 760
2026-03-08T06:23:35.2880467Z Progress: resolved 2024, reused 3, downloaded 867, added 841
2026-03-08T06:23:36.2864028Z Progress: resolved 2024, reused 3, downloaded 1041, added 1035
2026-03-08T06:23:37.2863530Z Progress: resolved 2024, reused 3, downloaded 1139, added 1127
2026-03-08T06:23:38.2871016Z Progress: resolved 2024, reused 3, downloaded 1205, added 1178
2026-03-08T06:23:39.2881551Z Progress: resolved 2024, reused 3, downloaded 1375, added 1339
2026-03-08T06:23:40.2885031Z Progress: resolved 2024, reused 3, downloaded 1555, added 1561
2026-03-08T06:23:41.2889627Z Progress: resolved 2024, reused 3, downloaded 1744, added 1743
2026-03-08T06:23:42.1116620Z  ERR_PNPM_FETCH_404  GET https://registry.npmjs.org/motion-studio-mcp/-/motion-studio-mcp-5.4.1.tgz: Not Found - 404
2026-03-08T06:23:42.1117769Z 
2026-03-08T06:23:42.1119063Z No authorization header was set for the request.
2026-03-08T06:23:42.2064379Z ##[error]Process completed with exit code 1.
2026-03-08T06:23:42.2079085Z ##[debug]Finishing: Install dependencies
2026-03-08T06:23:42.2098385Z ##[debug]Evaluating condition for step: 'Validate Supabase env vars'
2026-03-08T06:23:42.2100202Z ##[debug]Evaluating: success()
2026-03-08T06:23:42.2115994Z ##[debug]Evaluating success:
2026-03-08T06:23:42.2116737Z ##[debug]=> false
2026-03-08T06:23:42.2117295Z ##[debug]Result: false
2026-03-08T06:23:42.2123974Z ##[debug]Evaluating condition for step: 'Run linter'
2026-03-08T06:23:42.2125421Z ##[debug]Evaluating: success()
2026-03-08T06:23:42.2125903Z ##[debug]Evaluating success:
2026-03-08T06:23:42.2126384Z ##[debug]=> false
2026-03-08T06:23:42.2126841Z ##[debug]Result: false
2026-03-08T06:23:42.2132462Z ##[debug]Evaluating condition for step: 'Run type check'
2026-03-08T06:23:42.2133794Z ##[debug]Evaluating: success()
2026-03-08T06:23:42.2134273Z ##[debug]Evaluating success:
2026-03-08T06:23:42.2134750Z ##[debug]=> false
2026-03-08T06:23:42.2135200Z ##[debug]Result: false
2026-03-08T06:23:42.2141277Z ##[debug]Evaluating condition for step: 'Validate and Install functions'
2026-03-08T06:23:42.2142571Z ##[debug]Evaluating: success()
2026-03-08T06:23:42.2143077Z ##[debug]Evaluating success:
2026-03-08T06:23:42.2143583Z ##[debug]=> false
2026-03-08T06:23:42.2144037Z ##[debug]Result: false
2026-03-08T06:23:42.2149839Z ##[debug]Evaluating condition for step: 'Build Cloud Functions'
2026-03-08T06:23:42.2151139Z ##[debug]Evaluating: success()
2026-03-08T06:23:42.2151608Z ##[debug]Evaluating success:
2026-03-08T06:23:42.2152089Z ##[debug]=> false
2026-03-08T06:23:42.2152538Z ##[debug]Result: false
2026-03-08T06:23:42.2157789Z ##[debug]Evaluating condition for step: 'Generate .env.production for deployment'
2026-03-08T06:23:42.2159481Z ##[debug]Evaluating: success()
2026-03-08T06:23:42.2159952Z ##[debug]Evaluating success:
2026-03-08T06:23:42.2160419Z ##[debug]=> false
2026-03-08T06:23:42.2160864Z ##[debug]Result: false
2026-03-08T06:23:42.2166848Z ##[debug]Evaluating condition for step: 'Build Next.js application'
2026-03-08T06:23:42.2168482Z ##[debug]Evaluating: success()
2026-03-08T06:23:42.2169063Z ##[debug]Evaluating success:
2026-03-08T06:23:42.2169546Z ##[debug]=> false
2026-03-08T06:23:42.2170072Z ##[debug]Result: false
2026-03-08T06:23:42.2175407Z ##[debug]Evaluating condition for step: 'Prepare hosting files'
2026-03-08T06:23:42.2176657Z ##[debug]Evaluating: success()
2026-03-08T06:23:42.2177118Z ##[debug]Evaluating success:
2026-03-08T06:23:42.2177573Z ##[debug]=> false
2026-03-08T06:23:42.2178009Z ##[debug]Result: false
2026-03-08T06:23:42.2183627Z ##[debug]Evaluating condition for step: 'Validate Firebase Auth Secret'
2026-03-08T06:23:42.2184910Z ##[debug]Evaluating: success()
2026-03-08T06:23:42.2185384Z ##[debug]Evaluating success:
2026-03-08T06:23:42.2185856Z ##[debug]=> false
2026-03-08T06:23:42.2186311Z ##[debug]Result: false
2026-03-08T06:23:42.2192032Z ##[debug]Evaluating condition for step: 'Authenticate to Google Cloud'
2026-03-08T06:23:42.2193276Z ##[debug]Evaluating: success()
2026-03-08T06:23:42.2193729Z ##[debug]Evaluating success:
2026-03-08T06:23:42.2194192Z ##[debug]=> false
2026-03-08T06:23:42.2194628Z ##[debug]Result: false
2026-03-08T06:23:42.2203135Z ##[debug]Evaluating: env.FIREBASE_PROJECT_ID
2026-03-08T06:23:42.2203643Z ##[debug]Evaluating Index:
2026-03-08T06:23:42.2203965Z ##[debug]..Evaluating env:
2026-03-08T06:23:42.2204286Z ##[debug]..=> Object
2026-03-08T06:23:42.2204593Z ##[debug]..Evaluating String:
2026-03-08T06:23:42.2204942Z ##[debug]..=> 'FIREBASE_PROJECT_ID'
2026-03-08T06:23:42.2205401Z ##[debug]=> '***'
2026-03-08T06:23:42.2205735Z ##[debug]Result: '***'
2026-03-08T06:23:42.2206342Z ##[debug]Evaluating condition for step: 'Resolve Firebase project id'
2026-03-08T06:23:42.2207559Z ##[debug]Evaluating: success()
2026-03-08T06:23:42.2208022Z ##[debug]Evaluating success:
2026-03-08T06:23:42.2208886Z ##[debug]=> false
2026-03-08T06:23:42.2209376Z ##[debug]Result: false
2026-03-08T06:23:42.2215399Z ##[debug]Evaluating condition for step: 'Install Firebase CLI'
2026-03-08T06:23:42.2216905Z ##[debug]Evaluating: success()
2026-03-08T06:23:42.2217543Z ##[debug]Evaluating success:
2026-03-08T06:23:42.2218731Z ##[debug]=> false
2026-03-08T06:23:42.2219275Z ##[debug]Result: false
2026-03-08T06:23:42.2225576Z ##[debug]Evaluating condition for step: 'Validate Firebase project access'
2026-03-08T06:23:42.2226835Z ##[debug]Evaluating: success()
2026-03-08T06:23:42.2227300Z ##[debug]Evaluating success:
2026-03-08T06:23:42.2228306Z ##[debug]=> false
2026-03-08T06:23:42.2228929Z ##[debug]Result: false
2026-03-08T06:23:42.2234793Z ##[debug]Evaluating: steps.auth.outputs.credentials_file_path
2026-03-08T06:23:42.2235275Z ##[debug]Evaluating Index:
2026-03-08T06:23:42.2235596Z ##[debug]..Evaluating Index:
2026-03-08T06:23:42.2235907Z ##[debug]....Evaluating Index:
2026-03-08T06:23:42.2236228Z ##[debug]......Evaluating steps:
2026-03-08T06:23:42.2236583Z ##[debug]......=> Object
2026-03-08T06:23:42.2236897Z ##[debug]......Evaluating String:
2026-03-08T06:23:42.2237212Z ##[debug]......=> 'auth'
2026-03-08T06:23:42.2237532Z ##[debug]....=> Object
2026-03-08T06:23:42.2237835Z ##[debug]....Evaluating String:
2026-03-08T06:23:42.2238312Z ##[debug]....=> 'outputs'
2026-03-08T06:23:42.2238631Z ##[debug]..=> Object
2026-03-08T06:23:42.2238927Z ##[debug]..Evaluating String:
2026-03-08T06:23:42.2239256Z ##[debug]..=> 'credentials_file_path'
2026-03-08T06:23:42.2239599Z ##[debug]=> null
2026-03-08T06:23:42.2239886Z ##[debug]Result: null
2026-03-08T06:23:42.2241235Z ##[debug]Evaluating condition for step: 'Deploy to Firebase'
2026-03-08T06:23:42.2242493Z ##[debug]Evaluating: success()
2026-03-08T06:23:42.2242969Z ##[debug]Evaluating success:
2026-03-08T06:23:42.2243423Z ##[debug]=> false
2026-03-08T06:23:42.2243857Z ##[debug]Result: false
2026-03-08T06:23:42.2249457Z ##[debug]Evaluating condition for step: 'Notify success'
2026-03-08T06:23:42.2250693Z ##[debug]Evaluating: success()
2026-03-08T06:23:42.2251178Z ##[debug]Evaluating success:
2026-03-08T06:23:42.2251661Z ##[debug]=> false
2026-03-08T06:23:42.2252111Z ##[debug]Result: false
2026-03-08T06:23:42.2257225Z ##[debug]Evaluating condition for step: 'Notify failure'
2026-03-08T06:23:42.2259333Z ##[debug]Evaluating: failure()
2026-03-08T06:23:42.2259814Z ##[debug]Evaluating failure:
2026-03-08T06:23:42.2261749Z ##[debug]=> true
2026-03-08T06:23:42.2262247Z ##[debug]Result: true
2026-03-08T06:23:42.2262830Z ##[debug]Starting: Notify failure
2026-03-08T06:23:42.2271388Z ##[debug]Loading inputs
2026-03-08T06:23:42.2272492Z ##[debug]Loading env
2026-03-08T06:23:42.2277397Z ##[group]Run echo "❌ Pipeline de deploy falhou."
2026-03-08T06:23:42.2277839Z [36;1mecho "❌ Pipeline de deploy falhou."[0m
2026-03-08T06:23:42.2278473Z [36;1mecho "### Falha no Pipeline de Deploy ❌" >> $GITHUB_STEP_SUMMARY[0m
2026-03-08T06:23:42.2279099Z [36;1mecho "Verifique os logs do GitHub Actions para detalhes." >> $GITHUB_STEP_SUMMARY[0m
2026-03-08T06:23:42.2327827Z shell: /usr/bin/bash -e ***0***
2026-03-08T06:23:42.2328295Z env:
2026-03-08T06:23:42.2328556Z   NODE_VERSION: 20
2026-03-08T06:23:42.2328872Z   PNPM_VERSION: 10.31.0
2026-03-08T06:23:42.2329342Z   NEXT_PUBLIC_SUPABASE_URL: ***
2026-03-08T06:23:42.2330826Z   NEXT_PUBLIC_SUPABASE_ANON_KEY: ***
2026-03-08T06:23:42.2331347Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ***
2026-03-08T06:23:42.2331905Z   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: ***
2026-03-08T06:23:42.2333471Z   SUPABASE_SERVICE_ROLE_KEY: ***
2026-03-08T06:23:42.2343328Z   FIREBASE_SERVICE_ACCOUNT_JSON: ***
2026-03-08T06:23:42.2343725Z   FIREBASE_PROJECT_ID: ***
2026-03-08T06:23:42.2344086Z   PNPM_HOME: /home/runner/setup-pnpm/node_modules/.bin
2026-03-08T06:23:42.2344469Z ##[endgroup]
2026-03-08T06:23:42.2395271Z ##[debug]/usr/bin/bash -e /home/runner/work/_temp/6beb1c39-3977-4b89-ba77-3855eb4031e3.sh
2026-03-08T06:23:42.2418032Z ❌ Pipeline de deploy falhou.
2026-03-08T06:23:42.2431801Z ##[debug]Finishing: Notify failure
2026-03-08T06:23:42.2439126Z ##[debug]Evaluating condition for step: 'Post Setup Node.js'
2026-03-08T06:23:42.2440460Z ##[debug]Evaluating: success()
2026-03-08T06:23:42.2440927Z ##[debug]Evaluating success:
2026-03-08T06:23:42.2441548Z ##[debug]=> false
2026-03-08T06:23:42.2441991Z ##[debug]Result: false
2026-03-08T06:23:42.2447099Z ##[debug]Evaluating condition for step: 'Post Setup pnpm'
2026-03-08T06:23:42.2449222Z ##[debug]Evaluating: always()
2026-03-08T06:23:42.2449712Z ##[debug]Evaluating always:
2026-03-08T06:23:42.2450583Z ##[debug]=> true
2026-03-08T06:23:42.2451065Z ##[debug]Result: true
2026-03-08T06:23:42.2451659Z ##[debug]Starting: Post Setup pnpm
2026-03-08T06:23:42.2470987Z ##[debug]Loading inputs
2026-03-08T06:23:42.2472286Z ##[debug]Evaluating: env.PNPM_VERSION
2026-03-08T06:23:42.2472680Z ##[debug]Evaluating Index:
2026-03-08T06:23:42.2473004Z ##[debug]..Evaluating env:
2026-03-08T06:23:42.2473331Z ##[debug]..=> Object
2026-03-08T06:23:42.2473644Z ##[debug]..Evaluating String:
2026-03-08T06:23:42.2473975Z ##[debug]..=> 'PNPM_VERSION'
2026-03-08T06:23:42.2474318Z ##[debug]=> '10.31.0'
2026-03-08T06:23:42.2474621Z ##[debug]Result: '10.31.0'
2026-03-08T06:23:42.2478287Z ##[debug]Loading env
2026-03-08T06:23:42.2483319Z Post job cleanup.
2026-03-08T06:23:42.3040388Z Pruning is unnecessary.
2026-03-08T06:23:42.3080360Z ##[debug]Node Action run completed with exit code 0
2026-03-08T06:23:42.3082805Z ##[debug]Finishing: Post Setup pnpm
2026-03-08T06:23:42.3101509Z ##[debug]Evaluating condition for step: 'Post Checkout code'
2026-03-08T06:23:42.3103332Z ##[debug]Evaluating: always()
2026-03-08T06:23:42.3103802Z ##[debug]Evaluating always:
2026-03-08T06:23:42.3104243Z ##[debug]=> true
2026-03-08T06:23:42.3104691Z ##[debug]Result: true
2026-03-08T06:23:42.3105321Z ##[debug]Starting: Post Checkout code
2026-03-08T06:23:42.3139961Z ##[debug]Loading inputs
2026-03-08T06:23:42.3141323Z ##[debug]Evaluating: github.repository
2026-03-08T06:23:42.3141724Z ##[debug]Evaluating Index:
2026-03-08T06:23:42.3142051Z ##[debug]..Evaluating github:
2026-03-08T06:23:42.3142386Z ##[debug]..=> Object
2026-03-08T06:23:42.3142703Z ##[debug]..Evaluating String:
2026-03-08T06:23:42.3143017Z ##[debug]..=> 'repository'
2026-03-08T06:23:42.3143453Z ##[debug]=> 'danilonovaisv/PORTFOLIO-DANILO-FINAL'
2026-03-08T06:23:42.3143914Z ##[debug]Result: 'danilonovaisv/PORTFOLIO-DANILO-FINAL'
2026-03-08T06:23:42.3145952Z ##[debug]Evaluating: github.token
2026-03-08T06:23:42.3146330Z ##[debug]Evaluating Index:
2026-03-08T06:23:42.3146653Z ##[debug]..Evaluating github:
2026-03-08T06:23:42.3146975Z ##[debug]..=> Object
2026-03-08T06:23:42.3147285Z ##[debug]..Evaluating String:
2026-03-08T06:23:42.3147611Z ##[debug]..=> 'token'
2026-03-08T06:23:42.3148337Z ##[debug]=> '***'
2026-03-08T06:23:42.3148791Z ##[debug]Result: '***'
2026-03-08T06:23:42.3163709Z ##[debug]Loading env
2026-03-08T06:23:42.3168962Z Post job cleanup.
2026-03-08T06:23:42.4102662Z ##[debug]Getting git version
2026-03-08T06:23:42.4117918Z [command]/usr/bin/git version
2026-03-08T06:23:42.4160791Z git version 2.53.0
2026-03-08T06:23:42.4184374Z ##[debug]0
2026-03-08T06:23:42.4186578Z ##[debug]git version 2.53.0
2026-03-08T06:23:42.4187147Z ##[debug]
2026-03-08T06:23:42.4189791Z ##[debug]Set git useragent to: git/2.53.0 (github-actions-checkout)
2026-03-08T06:23:42.4192774Z ::add-mask::***
2026-03-08T06:23:42.4207287Z Temporarily overriding HOME='/home/runner/work/_temp/4589563d-4250-4fbb-aa87-2492af1098e9' before making global git config changes
2026-03-08T06:23:42.4210162Z Adding repository directory to the temporary git global config as a safe directory
2026-03-08T06:23:42.4222104Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/PORTFOLIO-DANILO-FINAL/PORTFOLIO-DANILO-FINAL
2026-03-08T06:23:42.4253726Z ##[debug]0
2026-03-08T06:23:42.4255373Z ##[debug]
2026-03-08T06:23:42.4262530Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2026-03-08T06:23:42.4293108Z ##[debug]1
2026-03-08T06:23:42.4294590Z ##[debug]
2026-03-08T06:23:42.4300149Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2026-03-08T06:23:42.4597550Z ##[debug]0
2026-03-08T06:23:42.4599581Z ##[debug]
2026-03-08T06:23:42.4606561Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2026-03-08T06:23:42.4633012Z http.https://github.com/.extraheader
2026-03-08T06:23:42.4640060Z ##[debug]0
2026-03-08T06:23:42.4642161Z ##[debug]http.https://github.com/.extraheader
2026-03-08T06:23:42.4642855Z ##[debug]
2026-03-08T06:23:42.4646925Z [command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
2026-03-08T06:23:42.4678416Z ##[debug]0
2026-03-08T06:23:42.4679991Z ##[debug]
2026-03-08T06:23:42.4684641Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2026-03-08T06:23:42.4974205Z ##[debug]0
2026-03-08T06:23:42.4975038Z ##[debug]
2026-03-08T06:23:42.4981773Z [command]/usr/bin/git config --local --name-only --get-regexp ^includeIf\.gitdir:
2026-03-08T06:23:42.5010278Z ##[debug]1
2026-03-08T06:23:42.5011107Z ##[debug]
2026-03-08T06:23:42.5017594Z [command]/usr/bin/git submodule foreach --recursive git config --local --show-origin --name-only --get-regexp remote.origin.url
2026-03-08T06:23:42.5309186Z ##[debug]0
2026-03-08T06:23:42.5309958Z ##[debug]
2026-03-08T06:23:42.5311226Z ##[debug]Unsetting HOME override
2026-03-08T06:23:42.5382684Z ##[debug]Node Action run completed with exit code 0
2026-03-08T06:23:42.5385197Z ##[debug]Finishing: Post Checkout code
2026-03-08T06:23:42.5425888Z ##[debug]Starting: Complete job
2026-03-08T06:23:42.5428392Z Uploading runner diagnostic logs
2026-03-08T06:23:42.5439419Z ##[debug]Starting diagnostic file upload.
2026-03-08T06:23:42.5439880Z ##[debug]Setting up diagnostic log folders.
2026-03-08T06:23:42.5441972Z ##[debug]Creating diagnostic log files folder.
2026-03-08T06:23:42.5450087Z ##[debug]Copying 1 worker diagnostic logs.
2026-03-08T06:23:42.5458673Z ##[debug]Copying 1 runner diagnostic logs.
2026-03-08T06:23:42.5459925Z ##[debug]Zipping diagnostic files.
2026-03-08T06:23:42.5540560Z ##[debug]Uploading diagnostic metadata file.
2026-03-08T06:23:42.5563296Z ##[debug]Diagnostic file upload complete.
2026-03-08T06:23:42.5563999Z Completed runner diagnostic log upload
2026-03-08T06:23:42.5564398Z Cleaning up orphan processes
2026-03-08T06:23:42.5845002Z ##[debug]Finishing: Complete job
2026-03-08T06:23:42.5873727Z ##[debug]Finishing: test-and-deploy

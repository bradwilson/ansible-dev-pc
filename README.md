# Linux Dev Machine Setup

This repository contains useful scripts to set up a Linux development machine. They assume Ubuntu 18.04 or later, and have been tested with the following OSes:

- Ubuntu ([download](https://www.ubuntu.com/download/desktop))
  - 18.04 (bionic)
  - 18.10 (cosmic)
  - 19.04 (disco)
- Pop!_OS ([download](https://system76.com/pop))
  - 18.04
  - 18.10
  - 19.04

Other Ubuntu variants may work (like Mint) but they have not been tested. Non-Ubuntu variants are unsupported (with no
intention of supporting them). Similarly, shell for customization work is `bash`; other shells are left as an exercise
to the reader.

## Please fork this and customize it

The purpose here is to document what I use for my personal Linux-based development. You will likely want to make changes
to my customizations, including adding/removing software, choosing different defaults, etc. While you can make those changes
locally, if you plan to use these scripts long-term, it will likely be more beneficial for you if you fork this project so
you can preserve your changes and easily merge newer versions of these scripts.

## Getting Microsoft Teams working in Chrome

You can get Teams to be fully functional inside of Chrome (and only Chrome, not Chromium) by installing these two extensions.
The Ansible scripts do not install these extensions because Google has prohibited extension installation through any
mechanism other than the interactive UI (to help prevent malware attacks against Chrome that install extensions).

- [Microsoft Teams Screen sharing](https://chrome.google.com/webstore/detail/microsoft-teams-screen-sh/dhheiegalgcabbcobinipgmhepkkeidk)
- [Enable Teams Calling](https://chrome.google.com/webstore/detail/enable-teams-calling/ifgnnjhhfdpjpjokajkolhioakajhidc)

Once these two extensions are installed, you should have full functionality inside Teams, including audio calls, video
calls, and screen sharing. Note that unlike on Windows, screen sharing cannot be limited to a single monitor; you only get
"all screens" or "single application" sharing. This appears to be a limitation of the functionality exposed by Chrome on
Linux for screen capture.

# Pre-Requisites

1. Make sure you're up to date:

   ```bash
   $ sudo apt update
   $ sudo apt -y upgrade
   ```

2. Install Ansible:

   ```bash
   $ sudo apt -y install ansible
   ```

3. If you want to clone this Git repo, you should also install Git (`sudo apt -y install git`). These scripts will install it for you if you brought these files along in some other way.

# Running

Before running the scripts, please review `_all.yaml` and comment out software you don't want installed. In particular,
you should examine every `customization.yaml` file as these contain my personal opinionated customizations; feel free to
comment out sections of those files, or ignore them entirely.

To run the setup:

```bash
$ ansible-playbook -K _all.yaml
```

You can also run individual files if you'd prefer to take more control over what's executed.

You will be prompted for your sudo password. Most of the operations performed by these scripts require root access.

_**Since core OS packages are upgraded, it is safest to reboot the PC/VM after running these scripts. At a bare minimum,
many customizations done here will require you to log out and log back in.**_

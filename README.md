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

Other Ubuntu variants may work (like Mint) but they have not been tested. Non-Ubuntu variants are unsupported (with no intention of supporting them).

Supported shell for customization work is `bash`; other shells are left as an exercise to the reader.

# Pre-Requisites

You need to install Ansible:

```bash
$ sudo apt -y install ansible
```

If you want to close this Git repo, you should also install Git (`sudo apt -y install git`). These scripts will install it for you if you brought these files along in some other way.

# Running

Before running the scripts, please review `_all.yaml` and comment out software you don't want installed. In particular, you should examine every `*-customization.yaml` file as these contain my personal opinionated customizations; feel free to comment out sections of those files, or ignore them entirely.

To run the setup:

```bash
$ ansible-playbook -K _all.yaml
```

You will be prompted for your sudo password.

_**After installation is complete, you must reboot the computer/VM.**_

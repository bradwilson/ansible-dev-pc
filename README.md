# Unix-y Developer Machine Setup

This repository contains useful scripts to set up a Unix-y development machine. They have been tested with the following OSes:

| Distro                                                          | SKU     | Version(s)          |
| --------------------------------------------------------------- | ------- | ------------------- |
| [Pop!_OS](https://system76.com/pop)                             | Desktop | 18.04, 19.10, 20.04 |
| [Ubuntu](https://www.ubuntu.com/download/desktop)               | Desktop | 18.04, 19.10, 20.04 |
| [Ubuntu](https://www.microsoft.com/en-us/p/ubuntu/9nblggh4msv6) | WSL 2   | 18.04, 20.04        |
| [Debian](https://www.debian.org/distrib/netinst)                | Desktop | 9, 10               |
| [Debian](https://www.microsoft.com/en-us/p/debian/9msvkqc78pk6) | WSL 2   | 10                  |
| [macOS](https://www.apple.com/macos/)                           | Desktop | 10.15               |

Text shell customization assumes you're using bash (macOS in particular now ships with zsh as the default shell). GUI shell customization assumes you're using Gnome on Linux. Alternate distros and/or shells are left as an exercise for the reader.

## Please fork this and customize it

The purpose here is to document what I use for my personal Linux-based development. You will likely want to make changes to my customizations, including adding/removing software, choosing different defaults, etc. While you can make those changes locally, if you plan to use these scripts long-term, it will likely be more beneficial for you if you fork this project so you can preserve your changes and easily merge newer versions of these scripts.

# Pre-Requisites

## macOS

1. Install [Homebrew](https://docs.brew.sh/Installation)

2. Change the default shell from zsh to bash:

   ```bash
   $ chsh -s /bin/bash
   $ echo "export BASH_SILENCE_DEPRECATION_WARNING=1" >> ~/.bashrc
   $ chmod 700 ~/.bashrc
   $ ln -s ~/.bashrc ~/.bash_profile
   ```

3. Set up Python 3 as the default version of Python:

   ```bash
   $ echo "alias python='python3'" >> ~/.bashrc
   $ echo "export PATH=$HOME/Library/Python/3.7/bin:$PATH" >> ~/.bashrc
   ```

4. Install [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#installing-ansible-on-macos)

## Linux

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

### Additional pre-requisites for Ubuntu/Pop!_OS desktop 19.10 users

You need to install a Python3 package before running the Ansible playbook:

```bash
$ sudo apt -y install python3-distutils
```

If you forget this step, running the playbook will yield several messages like `[WARNING]: Skipping plugin (/.../filename) as it seems to be invalid: No module named 'distutils.spawn'`.

### Additional pre-requisites for Debian desktop 9 users

The version of Ansible that ships with Debian 9 is not new enough for these scripts. You can find [installation instructions here](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#installing-ansible-on-debian) to get a current version installed.

### Additional pre-requisites for WSL 2 users

Follow [these instructions](https://forum.snapcraft.io/t/running-snaps-on-wsl2-insiders-only-for-now/13033/1) to enable support for snap before running the Ansible playbook. Alternately, comment out the features that use snap (search for "snap" in the YAML files).

# Running

Before running the scripts, please review `_all.yaml` and `_all_no_customization.yaml`, and comment out software you don't want installed. In particular, most folders contain `customization.yaml` files which tend to contain my personal opinions on customizations; feel free to comment out sections of those files, or ignore them entirely.

To run the setup:

```bash
$ ansible-playbook -K _all.yaml
```

You will be prompted for your password, so that administrative-level software can be installed. _**You must be a sudoer to run these scripts, otherwise the installation process will fail.**_ You can also run individual files if you'd prefer to take more control over what's executed.

Since core OS packages are upgraded, it is safest to reboot the PC/VM after running these scripts. At a bare minimum, many UI shell customizations done here will require you to log out and log back in.

# Notes on differences between Linux distros

In general, these scripts are optimized around the experience of users of Ubuntu desktop distributions. These scripts install GUI-based applications, and manipulate the GUI shell for development purposes. They will probably most work on a server-based distribution if that's what you use for development, though they will require significant reworking.

## Desktop vs. WSL 2 distributions

Special affordances are made to enable support for WSL 2. Most of the GUI customization is not done, though some GUI applications are installed. Users will need to install an X server on their machine to run those GUI applications. I use (and strongly recommend) X410, which can be found in the [Microsoft Store](https://www.microsoft.com/en-us/p/x410/9nlp712zmn9q?activetab=pivot:overviewtab).

## Debian (all versions)

* Alacritty is not available on Debian.
* Insync is not available on Debian.
* Microsoft TTF fonts are not available on Debian.

## Debian 9

* Flameshot is not available on Debian 9.
* Gnome Tweaks tool is not available on Debian 9.

## Debian 10

* PowerShell Core is not (yet) supported on Debian 10. You can [download a v7 preview build manually](https://github.com/powershell/powershell#get-powershell) in the meantime.

## Pop!_OS desktop 19.10 / Ubuntu desktop 19.10

* The "Dash to Panel" Gnome extension appears to be broken.

## macOS

Most software does work on macOS, with a few exceptions noted below:

* QEMU/KVM is replaced with VirtualBox (note that installing VirtualBox might fail the first time because of required permissions)
* Gnome-specific tweaks and applications are not supported

# Unix-y Developer Machine Setup

This repository contains useful scripts to set up a Unix-y development machine. They have been tested with the following OSes:

| Distro                                                          | SKU     | Version(s)   |
| --------------------------------------------------------------- | ------- | ------------ |
| [Pop!_OS](https://system76.com/pop)                             | Desktop | 18.04, 20.04 |
| [Ubuntu](https://www.ubuntu.com/download/desktop)               | Desktop | 18.04, 20.04 |
| [Ubuntu](https://www.microsoft.com/en-us/p/ubuntu/9nblggh4msv6) | WSL 2   | 18.04, 20.04 |
| [Debian](https://www.debian.org/distrib/netinst)                | Desktop | 9, 10        |
| [Debian](https://www.microsoft.com/en-us/p/debian/9msvkqc78pk6) | WSL 2   | 10           |
| [macOS](https://www.apple.com/macos/)                           | Desktop | 10.15        |

Text shell customization assumes you're using bash (macOS in particular now ships with zsh as the default shell). GUI shell customization assumes you're using Gnome on Linux. Alternate distros and/or shells are left as an exercise for the reader.

## Please fork this and customize it

The purpose here is to document what I use for my personal Linux-based development. You will likely want to make changes to my customizations, including adding/removing software, choosing different defaults, etc. While you can make those changes locally, if you plan to use these scripts long-term, it will likely be more beneficial for you if you fork this project so you can preserve your changes and easily merge newer versions of these scripts.

## Third party notices

Portions copyright (c) Microsoft Corporation, licensed [under the MIT license](https://github.com/microsoft/vscode/blob/afd102cbd2e17305a510701d7fd963ec2528e4ea/LICENSE.txt).

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

### Additional pre-requisites for Debian desktop 9 users

The version of Ansible that ships with Debian 9 is not new enough for these scripts. You can find [installation instructions here](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#installing-ansible-on-debian) to get a current version installed.

### Additional pre-requisites for Debian 10 users (including WSL 2)

Docker requires iptables-legacy for networking support. Some Debian installations may be using iptables-nft by default. Ensure that the iptables alternative is set correctly before running `docker/core.yaml`:

```
$ sudo update-alternatives --set iptables /usr/sbin/iptables-legacy
update-alternatives: using /usr/sbin/iptables-legacy to provide /usr/sbin/iptables (iptables) in manual mode
```

After running this command, it's strongly recommended that you reboot before running the Ansible playbooks.

### Additional pre-requisites for WSL 2 users

Follow [these instructions](https://forum.snapcraft.io/t/running-snaps-on-wsl2-insiders-only-for-now/13033/1) to enable support for snap before running the Ansible playbook. Alternately, comment out the features that use snap (search for "snap" in the YAML files).

<strong>Important note:</strong> The instructions above were written for Ubuntu 18.04. They may need some modification for other OSes (for example, the path to `daemonize` has moved from `/usr/sbin` in 18.04 to `/usr/bin` in 20.04, and failure to use the correct path when creating your startup files will render your WSL shell un-runnable). I <strong>strongly</strong> recommend that you do not exit your functional WSL terminal prompt that you use to make these changes until you've verified with a <em>new</em> terminal prompt that those changes were successful.

You'll be able to tell it was successful because your terminal prompt should now include the standard systemd welcome banner, like the one shown here:

```
Welcome to Ubuntu 20.04.2 LTS (GNU/Linux 5.4.72-microsoft-standard-WSL2 x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Sat Mar 20 12:52:47 PDT 2021

  System load:  2.09               Processes:               50
  Usage of /:   2.4% of 250.98GB   Users logged in:         0
  Memory usage: 24%                IPv4 address for eth0:   172.19.25.197
  Swap usage:   0%                 IPv4 address for virbr0: 192.168.122.1
```

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

## macOS

Most software does work on macOS, with a few exceptions noted below:

* Insync is replaced with the native Google Backup and Sync
* QEMU/KVM is replaced with VirtualBox (note that installing VirtualBox might fail the first time because of required permissions)
* Remmina is not available, and [Microsoft Remote Desktop Client](https://docs.microsoft.com/en-us/windows-server/remote/remote-desktop-services/clients/remote-desktop-mac) must be installed from the App Store
* Gnome-specific tweaks and applications are not supported

# Linux Developer Machine Setup

This repository contains useful scripts to set up a Linux development machine running Fedora. They have been tested with:

Distro  | Version(s) | CPU             | SKU
------- | ---------- | --------------- | ---
Fedora  | 44         | x86_64, aarch64 | [KDE Plasma Desktop](https://fedoraproject.org/kde/download/), WSL 2 (e.g., `wsl --install FedoraLinux-44`)

Text shell customization assumes you're using bash. GUI shell customization assumes you're using KDE (Plasma). Alternate distros and/or shells are left as an exercise for the reader.

## Please fork this and customize it

The purpose here is to document what I use for my personal Linux-based development. You will likely want to make changes to my customizations, including adding/removing software, choosing different defaults, etc. While you can make those changes locally, if you plan to use these scripts long-term, it will likely be more beneficial for you if you fork this project so you can preserve your changes and easily merge newer versions of these scripts.

## Third party notices

Portions copyright (c) Microsoft Corporation, licensed [under the MIT license](https://github.com/microsoft/vscode/blob/afd102cbd2e17305a510701d7fd963ec2528e4ea/LICENSE.txt).

# Pre-Requisites

1. Make sure you're up to date:

   ```shell
   $ sudo dnf -y update
   ```

2. Install Ansible:

   ```shell
   $ sudo dnf -y install ansible
   ```

3. If you want to clone this Git repo, you should also install Git (`sudo dnf -y install git`). These scripts will install it for you if you brought these files along in some other way.

## WSL Pre-Requisites

Because of the way Visual Studio Code is architected to work on WSL, you must have Visual Studio Code installed _on the Windows side_ before running any of the VS Code-related Ansible scripts. Extension installation will install the extensions into Windows VS Code, and then you're expected to "copy" them over to WSL as appropriate.

## Desktop Pre-Requisites

Testing was done with Third Party Repositories enabled. It's an exercise for the user if things are broken with Third Party Repositories disabled (though I don't anticipate any issues).

If you want the OneDrive customizations, use a tool like [OneDrive Client for Linux](https://github.com/abraunegg/onedrive) and have it mounted to `~/OneDrive`.

# Running

Before running the scripts, please review `_all.yaml` and `_all_no_customization.yaml`, and comment out software you don't want installed. In particular, most folders contain `customization.yaml` files which tend to contain my personal opinions on customizations; feel free to comment out sections of those files, or ignore them entirely.

To run the setup:

```shell
$ ansible-playbook -K _all.yaml
```

You will be prompted for your password, so that administrative-level software can be installed. _**You must be a sudoer to run these scripts, otherwise the installation process will fail.**_ You can also run individual files if you'd prefer to take more control over what's executed.

Since core OS packages are upgraded, it is safest to reboot the PC/VM after running these scripts. At a bare minimum, many UI shell customizations done here will require you to log out and log back in, and shell customizations will require you to restart your shell.

# Notes on differences between Linux distros

In general, these scripts are optimized around the experience of users of Fedora Workstation distributions. These scripts install GUI-based applications, and manipulate the GUI shell for development purposes. They will probably most work on a server-based distribution if that's what you use for development, though they may require reworking.

## Desktop vs. WSL 2 distributions

Special affordances are made to enable support for WSL 2. Most of the GUI customization is not done, though some GUI applications are installed. Users will need to use Windows 11 (for WSLg) or install an X server on their machine to run those GUI applications. Instructions for enabling WSLg are available on [the WSLg GitHub project README](https://github.com/microsoft/wslg/blob/HEAD/README.md).

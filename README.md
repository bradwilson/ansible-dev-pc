# Unix-y Developer Machine Setup

This repository contains useful scripts to set up a Unix-y development machine. They have been tested with the following OSes:

Distro  | Version(s)   | CPU            | SKU
------- | ------------ | -------------- | ---
Ubuntu  | 22.04, 24.04 | Intel (64-bit) | [Desktop](https://www.ubuntu.com/download/desktop), [WSL 2](https://www.microsoft.com/en-us/p/ubuntu/9nblggh4msv6)
Pop!_OS | 22.04        | Intel (64-bit) | [Desktop](https://system76.com/pop)

Text shell customization assumes you're using bash. GUI shell customization assumes you're using Gnome on desktop Linux. Alternate distros and/or shells are left as an exercise for the reader.

## Please fork this and customize it

The purpose here is to document what I use for my personal Linux-based development. You will likely want to make changes to my customizations, including adding/removing software, choosing different defaults, etc. While you can make those changes locally, if you plan to use these scripts long-term, it will likely be more beneficial for you if you fork this project so you can preserve your changes and easily merge newer versions of these scripts.

## Third party notices

Portions copyright (c) Microsoft Corporation, licensed [under the MIT license](https://github.com/microsoft/vscode/blob/afd102cbd2e17305a510701d7fd963ec2528e4ea/LICENSE.txt).

# Pre-Requisites

1. Make sure you're up to date:

   ```shell
   $ sudo apt update
   $ sudo apt -y upgrade
   ```

2. Install Ansible:

   ```shell
   $ sudo apt -y install ansible
   ```

3. If you want to clone this Git repo, you should also install Git (`sudo apt -y install git`). These scripts will install it for you if you brought these files along in some other way.

# Running

Before running the scripts, please review `_all.yaml` and `_all_no_customization.yaml`, and comment out software you don't want installed. In particular, most folders contain `customization.yaml` files which tend to contain my personal opinions on customizations; feel free to comment out sections of those files, or ignore them entirely.

To run the setup:

```shell
$ ansible-playbook -K _all.yaml
```

You will be prompted for your password, so that administrative-level software can be installed. _**You must be a sudoer to run these scripts, otherwise the installation process will fail.**_ You can also run individual files if you'd prefer to take more control over what's executed.

Since core OS packages are upgraded, it is safest to reboot the PC/VM after running these scripts. At a bare minimum, many UI shell customizations done here will require you to log out and log back in.

# Notes on differences between Linux distros

In general, these scripts are optimized around the experience of users of Ubuntu desktop distributions. These scripts install GUI-based applications, and manipulate the GUI shell for development purposes. They will probably most work on a server-based distribution if that's what you use for development, though they will require significant reworking.

## Desktop vs. WSL 2 distributions

Special affordances are made to enable support for WSL 2. Most of the GUI customization is not done, though some GUI applications are installed. Users will need to use Windows 11 (for WSLg) or install an X server on their machine to run those GUI applications. Instructions for enabling WSLg are available on [the WSLg GitHub project README](https://github.com/microsoft/wslg/blob/HEAD/README.md).

## Having issues with Docker not starting on Linux (including WSL 2)?

If you're noticing that Docker isn't running:

```shell
$ sudo service docker start

* Starting Docker: docker

$ docker ps

Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
```

Check the Docker logs with `tail /var/log/docker.log`. If you see a line like this:

```shell
failed to start daemon: Error initializing network controller: error obtaining controller instance: unable to add return rule in DOCKER-ISOLATION-STAGE-1 chain:  (iptables failed: iptables --wait -A DOCKER-ISOLATION-STAGE-1 -j RETURN: iptables v1.8.7 (nf_tables):  RULE_APPEND failed (No such file or directory): rule in chain DOCKER-ISOLATION-STAGE-1 (exit status 4))
```

That means you need to enable `iptables-legacy` for Docker networking to function properly (your distro is likely using something else, like `iptables-nft` as indicated in the error message above). I've noticed this the most with Ubuntu 22.04+. Run these command:

```shell
$ sudo update-alternatives --set iptables /usr/sbin/iptables-legacy

update-alternatives: using /usr/sbin/iptables-legacy to provide /usr/sbin/iptables (iptables) in manual mode

$ sudo service docker start

* Starting Docker: docker

$ docker ps

CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

It is strongly recommended that you reboot after making this change, so that it filters throughout the entire networking stack.

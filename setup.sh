#!/bin/bash
sudo apt-get install python-software-properties 
wait
sudo add-apt-repository ppa:chris-lea/node.js 
wait
sudo apt-get update 
wait
sudo apt-get install nodejs
wait
sudo apt-get install npm
wait
curl https://install.meteor.com | /bin/sh
wait
sudo apt-get install mongodb
wait
curl -sL https://deb.nodesource.com/setup_0.10 | sudo -E bash
wait
sudo apt-get install -y nodejs
wait
sudo apt-get install git
wait
echo "Finish"

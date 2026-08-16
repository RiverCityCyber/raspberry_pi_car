# raspberry_pi_car
Using a raspberry pi as a dash cam and CAM bus reader
## How To Deploy This Yourself
```bash
npm create vite@latest pi-dashboard -- --template react-ts
cd pi-dashboard
npm install
npm install lucide-react
npm run dev
#You should now be able to reach localhost on whatever port Vite shows
#Gotta add steps for copying code in from GitHub
```

## Project Status
Currently under development - like many of my projects. Currently using react and Vite to build out a dashboard for diagnostics, testing out react-carplay and building custom overlay of OBDII inputs. 
The below diagram needs to be updated, sorry:
```text
┌─────────────────────────────────────────────────────┐
│               Native (Mac Mini Dev)                 │
│                                                     │
│   ┌────────────────────────────────────────────┐    │
│   │        Chromium — Vite Dev Server          │    │
│   │                                            │    │
│   │   React Dashboard UI                       │    │
│   │   (Web Serial API) ───────┐                │    │
│   │                           │                │    │
│   │     Dashcam View  ────────┤                │    │
│   │     (dev toggle)          │                │    │
│   └────────────────────────┬──┼────────────────┘    │
│                            │  │                     │
│                            │  └──▶ USB ELM327       │
│                            │       (emulated)       │
│                    batched │                        │
│                    POST    ▼                        │
│         ┌─────────────────────┐                     │
│         │  Local Write API    │                     │
│         │  (Node, minimal)    │───▶ SQLite (dev.db) │
│         └─────────────────────┘                     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│              Bare Metal (Pi 5 Production)           │
│                                                     │
│   ┌───────────────────────────────────────────┐     │
│   │        Chromium Kiosk — Vite Build        │     │
│   │                                           │     │
│   │   React Dashboard UI                      │     │
│   │   (Web Serial API) ────────┐              │     │
│   │                            │              │     │
│   │   Dashcam View   ──────────┤              │     │
│   │  (USB camera input)        │              │     │
│   └────────────────────────┬───┼──────────────┘     │
│                            │   │                    │
│                            │   └──▶ USB ELM327      │
│                            │        (K-line data)   │
│                    batched │                        │
│                    POST    ▼                        │
│               ┌─────────────────────┐               │
│               │  Local Write API    │               │
│               │  (Node, minimal)    │───▶ SQLite    │
│               └─────────────────────┘               │
│                                                     │
│   ┌─────────────────────────────────────────────┐   │
│   │   react-carplay (Node/native process)       │   │
│   │   ──▶ CarPlay USB dongle                    │   │
│   └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```
## To Dos
- Build a SQL database for storing performance data, maintenance schedule, and diagnostics alarms/data
- Clean up CSS, make it look pretty
- Optimize for Raspberry Pi 5 8Gb RAM
- Get gauges working and reading K-Line data
- Include ability for others to do OBD2 (document the crap out of the build on my webpage)
- Test and Deploy!

## Other notes
This project is teaching me the following:
- Node.js & TypeScript
- Python
- Soldering
- Electrical Engineering
- CAD and Blender for 3D modeling
- K-Line protocol
- Raspberry Pi OS
- Overall project experience and mimicing a dev -> prod flow
- Documentation and markdown syntax
- And overall just having fun!

## How to Create the Dashcam
```bash
sudo apt update && upgrade
sudo lsblk -o NAME,SIZE,TYPE,MOUNTPOINT
sudo mkfs.ext4 -L ssd_data /dev/sda1
sudo mkdir -p /mnt/ssd
sudo mount /dev/sda1 /mnt/ssd
df -h | grep ssd
sudo nano /etc/fstab
  LABEL=ssd_data   /mnt/ssd   ext4   defaults,noatime   0   2
sudo umount /mnt/ssd
sudo mount -a
sudo chown -R pi:pi /mnt/ssd 
```
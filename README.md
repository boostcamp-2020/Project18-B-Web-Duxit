# 웹 기반 스토리텔링 보드게임 DUXIT 🃏

<p align="center">
<img src="https://i.imgur.com/RNtI3ZD.jpg" width=500>
</p>

[![GitHub stars](https://img.shields.io/github/stars/boostcamp-2020/Project18-B-Web-Duxit.svg?style=social&label=Star)](https://github.com/boostcamp-2020/Project18-B-Web-Duxit) *DUXIT은 여러분의 ⭐️ 스타⭐️ 를 먹고 삽니다.*


## 공개 주소 ✨

데모를 보고 싶다면? [DuXit.ga](http://duxit.ga/)

## Team. YAHTZEE 🎲

> [WIKI link!](https://github.com/boostcamp-2020/Project18-B-Web-Duxit/wiki)

|<img src="https://avatars1.githubusercontent.com/u/67293994?s=460&v=4" width=300/>|<img src="https://avatars1.githubusercontent.com/u/48747221?s=460&u=dc79c2f93cc7fdc2c75696b59433bf429963ca29&v=4" width=300/>|<img src="https://avatars0.githubusercontent.com/u/43198553?s=460&u=ed005162bf29e3c9b4b633d1ae9b1018a971fbb3&v=4" width=300/>|<img src="https://avatars2.githubusercontent.com/u/46101366?s=460&u=f0a5173d2be366e80452962fbfaf7864cc80ab0f&v=4" width=300/>|
|:-:|:-:|:-:|:-:|
|J035 김민성|J060 김해람|J109 안샛별|J208 최진혁|
| [@Front-line-dev](https://github.com/Front-line-dev) | [@ramram1048](https://github.com/ramram1048) | [@sbyeol3](https://github.com/sbyeol3) | [@jinhyukoo](https://github.com/jinhyukoo)

> 🙌 든든한 멘토님인 [크롱](https://github.com/crongro)과 함께 합니다 🦖

## Development Stack ⚙️

| division        | stack                             |
| --------------- | --------------------------------- |
| Web             | babel, webpack                    |
| Front-end       | Vanilla JS, TypeScript, socket-io, Scss |
| Back-end        | Node.js, winston , socket-io      |
| Production      | forever, nginx, NCP               |
| Code Management | Git, GitHub                       |
| Formatting      | eslint, stylelint, prettier       |

## DUXIT은 어떤 게임인가요? 🐥
- DUXIT은 스토리텔링 보드게임 DIXIT을 웹으로 옮긴 온라인 게임입니다.
- 번갈아가면서 각 플레이어는 스토리텔러가 되고, 자신이 가지고 있는 6장의 카드 중 하나를 고릅니다. 고른 카드에 대한 주제도 함께 정합니다.
- 스토리텔러를 제외한 플레이어들은 자신이 갖고 있는 6장의 카드 중 주제와 가장 유사한 카드 한 장을 고릅니다. 모든 플레이어가 선택한 카드가 한번에 공개되면, 스토리텔러를 제외한 플레이어는 `스토리텔러가 어떤 카드를 냈을까?`를 추측하며 한 장의 카드를 고릅니다.
- 이후 각 플레이어가 선택한 카드의 주인이 공개되며 정해진 점수산출 방식에 의해 말을 움직입니다. 가장 먼저 결승점에 도달하거나, 카드가 소진되었을 때 가장 멀리 말을 움직인 사람이 승리하는 게임입니다.
- DUXIT은 최소 3인, 최대 6인까지 참여 가능합니다.
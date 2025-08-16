// 初始化关卡配置
        oS.Init({
            // 可用植物列表
            PName: [oPeashooter,o5GatlingPea,oPineTree,oWaterShooter, oMagneticmuShroom,oCherryBomb, oWallNut,o3GatlingPea, oMixChomperPea, oTorchwood, oSunFlower, o4Sunflower, oSunflowerPea, oChomper, oChomperPea, oCherryBomb],
            // 僵尸列表
            ZName: [oBigFootballZombie,oWJY, oTrashZombie, oScreenDoorZombie,oLionDanceZombie,oCZomboni,oEmperor,othugZombie,oEunZombie,oZZ, oCPoleVaultingZombie, oConeheadZombie],
            // 背景图片资源
            PicArr: function() {
                var a = oWallNut.prototype,
                    b = a.PicArr;
                return ["images/interface/background1unsodded2.jpg", b[a.CardGif], b[a.NormalGif]];
            }(),
            // 设置关卡背景图片
            backgroundImage: "images/interface/background1unsodded2.jpg",
            // 草坪阵型，1表示有草坪，0表示无草坪
            LF: [0, 0, 1, 1, 1, 0],
            // 是否可以选择卡片，0表示不可选
            CanSelectCard: 1,
            // 关卡名称
            LevelName: "关卡 1-3",
            // 关卡编号
            LvlEName: 3,
            // 大波僵尸的标志
            LargeWaveFlag: {
                8: $("imgFlag1") // 第8波时显示旗帜
            },
            // 初始化割草机
            InitLawnMower: function() {
                var a = 5;
                while (--a > 1) {
                    // 在每行草坪上放置割草机
                    CustomSpecial(oLawnCleaner, a, -1);
                }
            },
            // 开始游戏的逻辑
            StartGame: function() {
                StopMusic(); // 停止当前音乐
                PlayMusic(oS.LoadMusic = oS.StartGameMusic); // 播放关卡开始音乐
                SetVisible($("dFlagMeter"), $("dTop")); // 显示旗帜进度条和顶部UI
                oS.InitLawnMower(); // 初始化割草机
                PrepareGrowPlants(function() {
                    oP.Monitor(); // 监控僵尸状态
                    BeginCool(); // 开启冷却机制
                    AutoProduceSun(25); // 自动生成阳光，每次25点
                    oSym.addTask(1500, function() {
                        oP.AddZombiesFlag(); // 添加僵尸波次
                        SetVisible($("dFlagMeterContent")); // 显示旗帜进度条内容
                    }, []);
                });
            }
        }, {
            // 僵尸波次配置
            AZ: [
                [oBigFootballZombie, 5, 1], // 橄榄球僵尸，出现时间范围30-40
                [oTrashZombie, 2, 2], // 垃圾僵尸，出现时间范围30-40
                [oCPoleVaultingZombie, 3, 3], // 撑杆僵尸，出现时间范围20-40
                [oWJY, 1, 4], // 舞狮僵尸，仅出现一次
                // [oLionDanceZombie, 1, 4], // 舞狮僵尸，仅出现一次
                // [oZZ, 1, 5], // 仅出现一次
                // [oScreenDoorZombie, 1, 6], // 仅出现一次
                // [othugZombie, 1, 7], // 仅出现一次
                [oEmperor, 1, 2] // 仅出现一次
            ],
            // 总波数
            FlagNum: 8,
            FlagToSumNum: {
                a1: [3, 50, 90, 100, 130, 150, 190, 200, 230, 250, 290],
                a2: [1, 20, 30, 100, 40, 50, 60, 150, 70, 80, 90, 250]
            },
            FlagToMonitor: {
                9: [ShowLargeWave, 0],
                19: [ShowLargeWave, 0],
                29: [ShowFinalWave, 0]
            },
            // 波次监控配置
            FlagToMonitor: {
                7: [ShowFinalWave, 0] // 第7波时显示最终波次
            },
            // 关卡结束时的逻辑
            FlagToEnd: function() {
                // 显示新的植物卡片（坚果墙）
                NewImg("imgSF", "images/Card/Plants/WallNut.png", "left:827px;top:330px;clip:rect(auto,auto,60px,auto)", EDAll, {
                    onclick: function() {
                        GetNewCard(this, oWallNut, 4); // 获取坚果墙卡片
                    }
                });
                // 显示指针提示
                NewImg("PointerUD", "images/interface/PointerDown.gif", "top:295px;left:836px", EDAll);
            }
        });
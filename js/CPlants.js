var CPlants = NewO({
        name: "Plants",
        HP: 300,
        PKind: 1,
        beAttackedPointL: 20,
        CardGif: 0,
        StaticGif: 1,
        NormalGif: 2,
        BookHandBack: 0,
        canEat: 1,
        zIndex: 0,
        AudioArr: [],
        coolTime: 7.5,
        CanSelect: 1,
        canTrigger: 1,
        Stature: 0,
        Sleep: 0,
        CanGrow: function(c, b, e) {
            var a = b + "_" + e,
                d = oS.ArP;
            return d ? oGd.$LF[b] == 1 ? e > 0 && e < d.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1] : oGd.$LF[b] == 1 ? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1]
        },
        getHurt: function(e, c, b) {
            var d = this,
                a = d.id;
            !(c % 3) ? (d.HP -= b) < 1 && d.Die(): d.Die()
        },
        GetDY: function(b, c, a) {
            return a[0] ? -21 : -15
        },
        GetDX: function() {
            return -Math.floor(this.width * .5)
        },
        GetDBottom: function() {
            return this.height
        },
        Birth: function(d, c, h, a, m, n) {
            var e = this,
                k = d + e.GetDX(),
                i = c + e.GetDY(h, a, m),
                l = e.prototype,
                g = i - e.height,
                b = e.id = "P_" + Math.random(),
                j = e.zIndex += 3 * h,
                f = NewEle(0, "div", "position:absolute");
            NewImg(0, ShadowPNG, e.getShadow(e), f);
            NewImg(0, e.PicArr[e.NormalGif], "", f);
            e.pixelLeft = k;
            e.pixelRight = k + e.width;
            e.pixelTop = g;
            e.pixelBottom = g + e.GetDBottom();
            e.opacity = 1;
            e.InitTrigger(e, b, e.R = h, e.C = a, e.AttackedLX = k + e.beAttackedPointL, e.AttackedRX = k + e.beAttackedPointR);
            $P[b] = e;
            $P.length += 1;
            e.BirthStyle(e, b, f, {
                left: k + "px",
                top: g + "px",
                zIndex: j
            }, n);
            oGd.add(e, h + "_" + a + "_" + e.PKind);
            e.PrivateBirth(e, n)
        },
        getShadow: function(a) {
            return "left:" + (a.width * .5 - 48) + "px;top:" + (a.height - 22) + "px"
        },
        BirthStyle: function(c, d, b, a) {
            EditEle(b, {
                id: d
            }, a, EDPZ)
        },
        PrivateBirth: function(a) {},
        getTriggerRange: function(a, b, c) {
            return [
                [b, oS.W, 0]
            ]
        },
        getTriggerR: function(a) {
            return [a, a]
        },
        InitTrigger: function(c, b, f, a, h, g) {
            var j = {},
                i = c.getTriggerR(f),
                e = i[0],
                d = i[1];
            do {
                oT.add(e, j[e] = c.getTriggerRange(e, h, g), b)
            } while (e++ != d);
            c.oTrigger = j
        },
        TriggerCheck: function(b, a) {
            this.AttackCheck2(b) && (this.canTrigger = 0, this.CheckLoop(b.id, a))
        },
        CheckLoop: function(b, c) {
            var a = this.id;
            this.NormalAttack(b);
            oSym.addTask(140, function(e, f, h) {
                var g;
                (g = $P[e]) && g.AttackCheck1(f, h)
            }, [a, b, c])
        },
        AttackCheck1: function(g, f) {
            var b = this,
                c = b.oTrigger,
                a = $Z[g],
                h, e, k, j;
            if (a && a.PZ && (h = c[a.R])) {
                k = a.ZX;
                e = h.length;
                while (e--) {
                    j = h[e];
                    if (j[0] <= k && j[1] >= k && b.AttackCheck2(a)) {
                        b.CheckLoop(g, j[2]);
                        return
                    }
                }
            }
            b.canTrigger = 1
        },
        AttackCheck2: function(a) {
            return a.Altitude > 0
        },
        PrivateDie: function(a) {},
        BoomDie: function() {
            var a = this,
                b = a.id;
            a.oTrigger && oT.delP(a);
            a.HP = 0;
            delete $P[b];
            delete oGd.$[a.R + "_" + a.C + "_" + a.PKind];
            $P.length -= 1;
            ClearChild($(b));
            a.PrivateDie(a)
        },
        Die: function(a) {
            var b = this,
                c = b.id;
            b.oTrigger && oT.delP(b);
            b.HP = 0;
            delete $P[c];
            delete oGd.$[b.R + "_" + b.C + "_" + b.PKind];
            $P.length -= 1;
            !a && ClearChild($(c));
            b.PrivateDie(b)
        }
    }),
    oGraveBuster = InheritO(CPlants, {
        EName: "oGraveBuster",
        CName: "咬咬碑",
        width: 99,
        height: 106,
        beAttackedPointR: 70,
        SunNum: 75,
        BookHandBack: 2.5,
        canEat: 0,
        PicArr: ["images/Card/Plants/GraveBuster.png", "images/Plants/GraveBuster/0.gif", "images/Plants/GraveBuster/GraveBuster.gif" + $Random + Math.random()],
        AudioArr: ["gravebusterchomp"],
        CanGrow: function(b, a, d) {
            var c = oS.ArP;
            return c ? d > 0 && d < c.ArC[1] && (a + "_" + d in oGd.$Tombstones && !b[1]) : a + "_" + d in oGd.$Tombstones && !b[1]
        },
        getShadow: function(a) {
            return "left:" + (a.width * .5 - 48) + "px;top:" + a.height + "px"
        },
        BirthStyle: function(c, d, b, a) {
            EditEle(b, {
                id: d
            }, a, EDPZ)
        },
        GetDY: function(b, c, a) {
            return -30
        },
        InitTrigger: function() {},
        Tooltip: "咬咬碑会吃掉墓碑。",
        Produce: '咬咬碑用来吃掉墓碑。<p>使用方法：<font color="#FF0000">单次使用，只对墓碑生效。</font><br>特点：<font color="#FF0000">吞噬墓碑。</font></p>尽管咬咬碑的外表十分吓人，但他想要所有人</font><br>都知道，其实他喜欢小猫咪，而且利用业余时</font><br>间，在一家僵尸康复中心做志愿者。“我只是</font><br>在做正确的事情，”他说。',
        PrivateBirth: function(a) {
            PlayAudio("gravebusterchomp");
            oSym.addTask(420, function(b) {
                var e = $P[b],
                    c, d, f;
                e && (d = e.R, f = e.C, delete oGd.$Tombstones[c = d + "_" + f], e.Die(), ClearChild($("dTombstones" + c)), oS.StaticCard && AppearSun(Math.floor(GetX(f) + Math.random() * 41), GetY(d), 25, 0))
            }, [a.id])
        }
    }),
    oLawnCleaner = InheritO(CPlants, {
        EName: "oLawnCleaner",
        CName: "草地剪草机",
        width: 71,
        height: 57,
        beAttackedPointL: 0,
        beAttackedPointR: 71,
        SunNum: 0,
        PicArr: ["images/interface/LawnCleaner.png", "images/interface/LawnCleaner1.png"],
        AudioArr: ["lawnmower"],
        NormalGif: 0,
        canEat: 0,
        Stature: 1,
        getShadow: function(a) {
            return "left:" + (a.width * .5 - 38) + "px;top:" + (a.height - 22) + "px"
        },
        getTriggerRange: function(a, b, c) {
            return [
                [b, c, 0]
            ]
        },
        TriggerCheck: function(b, a) {
            b.beAttacked && b.Altitude > 0 && (this.canTrigger = 0, this.NormalAttack(this))
        },
        BoomDie: function() {},
        Tooltip: "最普通的草地剪草机",
        NormalAttack: function(a) {
            PlayAudio(a.AudioArr[0]);
            (function(b, c, k, j, e, g) {
                var d = oZ.getArZ(k, j, e),
                    f = d.length,
                    h;
                $(a.id).childNodes[1].src = "images/interface/LawnCleaner1.png";
                while (f--) {
                    (h = d[f]).getCrushed(b) && h.CrushDie()
                }
                k > c ? b.Die() : (b.pixelRight += 10, b.AttackedLX = k += 10, b.AttackedRX = j += 10, g.style.left = (b.pixelLeft += 10) + "px", oSym.addTask(1, arguments.callee, [b, c, k, j, e, g]), [this])
            })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id))
        }
    }),
    oCleaner1 = InheritO(oLawnCleaner, {
        EName: "oCleaner",
        CName: "爆竹",
        width: 80,
        height: 80,
        beAttackedPointL: 0,
        beAttackedPointR: 57,
        SunNum: 0,
        PicArr: ["images/interface/BZ.png", "images/Plants/Jalapeno/JalapenoAttack.gif"],
        Tooltip: "爆竹",
        AudioArr: ["jalapeno"]
    }),
    oCleaner = InheritO(oCleaner1, {
        EName: "oCleaner",
        NormalAttack: function(a) {
            oSym.addTask(40, function(j) {
                var h = $P[j];
                if (h) {
                    PlayAudio("jalapeno");
                    var b = $(j),
                        f = h.R,
                        c = oZ.getArZ(100, oS.W, f),
                        e = c.length,
                        g = oGd.$Ice[f],
                        d = oGd.$Crater;
                    while (e--) {
                        c[e].getExplosion()
                    }
                    h.Die(1);
                    EditEle(b.childNodes[1], {
                        src: "images/Plants/Jalapeno/JalapenoAttack.gif"
                    }, {
                        width: "755px",
                        height: "131px",
                        left: 120 - h.pixelLeft + "px",
                        top: "-42px"
                    });
                    oSym.addTask(135, ClearChild, [b]);
                    ClearChild($("dIceCar" + f));
                    if (g) {
                        for (e = g[1]; e < 11; e++) {
                            delete d[f + "_" + e]
                        }
                    }
                }
            }, [a.id])
        }
    }),
    oPoolCleaner = InheritO(oLawnCleaner, {
        EName: "oPoolCleaner",
        CName: "池塘清扫车",
        width: 47,
        height: 64,
        beAttackedPointL: 0,
        beAttackedPointR: 47,
        SunNum: 0,
        PicArr: ["images/interface/PoolCleaner.png", "images/interface/PoolCleaner1.png"],
        Tooltip: "池塘清扫车",
        AudioArr: ["pool_cleaner"],
        NormalAttack: function(a) {
            PlayAudio(a.AudioArr[0]);
            (function(b, c, k, j, e, g) {
                var d = oZ.getArZ(k, j, e),
                    f = d.length,
                    h;
                $(a.id).childNodes[1].src = "images/interface/PoolCleaner1.png";
                while (f--) {
                    (h = d[f]).getCrushed(b) && h.CrushDie()
                }
                k > c ? b.Die() : (b.pixelRight += 10, b.AttackedLX = k += 10, b.AttackedRX = j += 10, g.style.left = (b.pixelLeft += 10) + "px", oSym.addTask(1, arguments.callee, [b, c, k, j, e, g]), [this])
            })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id))
        }
    }),
    oBrains = InheritO(CPlants, {
        EName: "oBrains",
        CName: "脑子",
        width: 32,
        height: 31,
        beAttackedPointL: 0,
        beAttackedPointR: 32,
        SunNum: 0,
        HP: 1,
        PicArr: ["images/interface/brain.png"],
        Tooltip: "美味的脑子",
        NormalGif: 0,
        InitTrigger: function() {},
        PrivateBirth: function(a) {
            a.PrivateDie = oS.BrainsNum ? (a.DieStep = Math.floor(150 / oS.BrainsNum), function(d) {
                var c, b;
                AppearSun(Math.floor(GetX(d.C) - 40 + Math.random() * 41), GetY(d.R), 50, 0);
                (b = --oS.BrainsNum) ? (c = b * d.DieStep, $("imgFlagHead").style.left = c - 11 + "px", $("imgFlagMeterFull").style.clip = "rect(0,157px,21px," + c + "px)") : ($("imgFlagHead").style.left = "-1px", $("imgFlagMeterFull").style.clip = "rect(0,157px,21px,0)", oP.FlagToEnd())
            }) : function(b) {
                GameOver()
            }
        },
        GetDX: function() {
            return -40
        }
    }),
    oStarfruit = InheritO(CPlants, {
        EName: "oStarfruit",
        CName: "杨桃",
        width: 77,
        height: 70,
        beAttackedPointR: 57,
        SunNum: 125,
        GetDY: function(b, c, a) {
            return a[0] ? -17 : -10
        },
        PicArr: ["images/Card/Plants/Starfruit.png", "images/Plants/Starfruit/0.gif", "images/Plants/Starfruit/Starfruit.gif", "images/Plants/Starfruit/Star.gif"],
        Tooltip: "向五个方向发射小杨桃",
        Produce: '杨桃可以向五个方向发射小杨桃。<p>伤害：<font color="#FF0000">中等</font><br>范围：<font color="#FF0000">五个方向</font></p>杨桃：“嘿，哥们，有一天我去看牙医，他说</font><br>我有四个牙洞。我一数，我就只有一颗牙齿！一</font><br>颗牙齿长了四个牙洞？怎么会这样啊？”',
        getTriggerRange: function(e, g, f) {
            var a = this.R,
                b = GetY(a),
                c = oS.W,
                j = this.ArFlyTime,
                h = this.ArHitX,
                i, d = .5 * (g + f);
            !j && (j = this.ArFlyTime = {}, h = this.ArHitX = {});
            switch (true) {
                case e < a:
                    j[e] = [(i = b - GetY(e)) / 5, i / 3];
                    h[e] = [d, d + i / 3 * 4];
                    return [
                        [100, c, 0]
                    ];
                case e == a:
                    return [
                        [100, g + 25, 4]
                    ];
                default:
                    j[e] = [(i = GetY(e) - b) / 5, i / 3];
                    h[e] = [d, d + i / 3 * 4];
                    return [
                        [100, c, 0]
                    ]
            }
        },
        AttackCheck2: function(l) {
            var j = l.R;
            if (j == this.R) {
                return l.Altitude > 0
            }
            var q = 0,
                t = l.AttackedLX,
                b = l.AttackedRX,
                e, g, d = this.ArFlyTime,
                c = this.ArHitX,
                s = d[j],
                r = c[j],
                f = l.WalkDirection ? -1 : 1,
                k = false,
                m, p, n, h, a = l.Speed;
            while (q < s.length) {
                h = a * s[q] * f * .1;
                e = Math.floor(t - h);
                g = Math.floor(b - h);
                p = r[0];
                n = r[1];
                if (e + 20 < p && g - 20 > p || e < n && g > n) {
                    k = true;
                    break
                }++q
            }
            return k && l.Altitude > 0
        },
        getTriggerR: function(a) {
            return [1, oS.R]
        },
        PrivateBirth: function(d) {
            var c = d.pixelLeft + 38,
                b = c - 15,
                a = d.pixelTop + 20;
            d.BulletEle = NewImg(0, "images/Plants/Starfruit/Star.gif", "left:" + b + "px;top:" + a + "px;z-index:" + (d.zIndex + 2))
        },
        PrivateDie: function(a) {
            a.BulletEle = null
        },
        getHurt: function(d, b, a) {
            var c = this;
            b != 3 && c.NormalAttack();
            (c.HP -= a) < 1 && c.Die()
        },
        NormalAttack: function() {
            var g = this,
                f = g.pixelLeft + 38,
                d = f - 15,
                b = g.pixelTop + 20,
                c = g.R,
                e = f + 15,
                a = function(j, i, h) {
                    return j && j.Altitude == 1 ? (j.getPea(j, 20, i), ClearChild(h), false) : true
                };
            (function(h) {
                oSym.addTask(15, function(j) {
                    var i = $(j);
                    i && SetVisible(i)
                }, [h]);
                oSym.addTask(1, function(m, k, l, i, j) {
                    j(oZ.getZ1(m, k), 4, i) && ((m -= 5) < 100 ? ClearChild(i) : (i.style.left = (l -= 5) + "px", oSym.addTask(1, arguments.callee, [m, k, l, i, j])))
                }, [f, c, d, EditEle(g.BulletEle.cloneNode(false), {
                    id: h
                }, 0, EDPZ), a])
            })("StarB" + Math.random());
            (function(h) {
                oSym.addTask(15, function(j) {
                    var i = $(j);
                    i && SetVisible(i)
                }, [h]);
                oSym.addTask(1, function(m, n, l, k, i, j) {
                    j(oZ.getRangeLeftZ(m, n, l), 6, i) && ((k -= 5) < -15 ? ClearChild(i) : (i.style.top = k + "px", oSym.addTask(1, arguments.callee, [m, n, GetR(k + 15), k, i, j])))
                }, [d, e, c, b, EditEle(g.BulletEle.cloneNode(false), {
                    id: h
                }, 0, EDPZ), a])
            })("StarB" + Math.random());
            (function(h) {
                oSym.addTask(15, function(j) {
                    var i = $(j);
                    i && SetVisible(i)
                }, [h]);
                oSym.addTask(1, function(m, n, l, k, i, j) {
                    j(oZ.getRangeLeftZ(m, n, l), 2, i) && ((k += 5) > 600 ? ClearChild(i) : (i.style.top = k + "px", oSym.addTask(1, arguments.callee, [m, n, GetR(k + 15), k, i, j])))
                }, [d, e, c, b, EditEle(g.BulletEle.cloneNode(false), {
                    id: h
                }, 0, EDPZ), a])
            })("StarB" + Math.random());
            (function(h) {
                oSym.addTask(15, function(j) {
                    var i = $(j);
                    i && SetVisible(i)
                }, [h]);
                oSym.addTask(1, function(n, l, m, k, i, j) {
                    j(oZ.getZ0(n, l), 7, i) && ((n += 4) > 900 || (k -= 3) < -15 ? ClearChild(i) : (SetStyle(i, {
                        left: (m += 4) + "px",
                        top: k + "px"
                    }), oSym.addTask(1, arguments.callee, [n, GetR(k + 15), m, k, i, j])))
                }, [f, c, d, b, EditEle(g.BulletEle.cloneNode(false), {
                    id: h
                }, 0, EDPZ), a])
            })("StarB" + Math.random());
            (function(h) {
                oSym.addTask(15, function(j) {
                    var i = $(j);
                    i && SetVisible(i)
                }, [h]);
                oSym.addTask(1, function(n, l, m, k, i, j) {
                    j(oZ.getZ0(n, l), 1, i) && ((n += 4) > 900 || (k += 3) > 600 ? ClearChild(i) : (SetStyle(i, {
                        left: (m += 4) + "px",
                        top: k + "px"
                    }), oSym.addTask(1, arguments.callee, [n, GetR(k + 15), m, k, i, j])))
                }, [f, c, d, b, EditEle(g.BulletEle.cloneNode(false), {
                    id: h
                }, 0, EDPZ), a])
            })("StarB" + Math.random())
        }
    }),
    oPeashooter = InheritO(CPlants, {
        EName: "oPeashooter",
        CName: "豌豆射手",
        width: 71,
        height: 71,
        beAttackedPointR: 51,
        SunNum: 100,
        BKind: 0,
        AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
        PicArr: ["images/Card/Plants/Peashooter.png", "images/Plants/Peashooter/0.gif", "images/Plants/Peashooter/Peashooter.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
        Tooltip: "向敌人射出豌豆",
        Produce: '豌豆射手，你的第一道防线。它们通过发射豌</font><br>豆来攻击僵尸。<p>伤害：<font color="#FF0000">中等</font></p>一棵植物，怎么能如此快地生长，并发射如此</font><br>多的豌豆呢？豌豆射手：“努力工作，奉献自</font><br>己，再加上一份阳光，高纤维和氧化碳均衡搭</font><br>配，这种健康早餐让一切成为可能。”',
        PrivateBirth: function(a) {
            a.BulletEle = NewImg(0, "images/Plants/PB00.gif", "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2))
        },
        PrivateDie: function(a) {
            a.BulletEle = null
        },
        NormalAttack: function() {
           pea(this);
        }
    }),
    oPineTree = InheritO(CPlants, {
        EName: "oPineTree",
        CName: "松果射手",
        width: 71,
        height: 71,
        beAttackedPointR: 51,
        SunNum: 100,
        BKind: 0,
        AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
        PicArr: ["images/Card/Plants/PineTree.png", "images/Plants/PineTree/0.png", "images/Plants/PineTree/PineTree.gif", "images/Plants/PineTree/PineCone.png", "images/Plants/PeaBulletHit.gif"],
        Tooltip: "向敌人射出松果",
        Produce: '松果射手，你的第一道防线。它们通过发射豌</font><br>豆来攻击僵尸。<p>伤害：<font color="#FF0000">中等</font></p>一棵植物，怎么能如此快地生长，并发射如此</font><br>多的豌豆呢？豌豆射手：“努力工作，奉献自</font><br>己，再加上一份阳光，高纤维和氧化碳均衡搭</font><br>配，这种健康早餐让一切成为可能。”',
        PrivateBirth: function(a) {
            a.BulletEle = NewImg(0, "images/Plants/PineTree/PineCone.png", "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2))
        },
        PrivateDie: function(a) {
            a.BulletEle = null
        },
        NormalAttack: function() {
            pea(this);
        }
    }),
    oWaterShooter = InheritO(CPlants, {
        EName: "oWaterShooter",
        CName: "水滴射手",
        width: 71,
        height: 71,
        beAttackedPointR: 51,
        SunNum: 100,
        BKind: 0,
        AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
        PicArr: ["images/Card/Plants/WaterShooter.png", "images/Plants/WaterShooter/0.png", "images/Plants/WaterShooter/WaterShooter.gif", "images/Plants/Drop.png", "images/Plants/PeaBulletHit.gif"],
        Tooltip: "向敌人射出水滴💧",
        Produce: '豌豆射手，你的第一道防线。它们通过发射豌</font><br>豆来攻击僵尸。<p>伤害：<font color="#FF0000">中等</font></p>一棵植物，怎么能如此快地生长，并发射如此</font><br>多的豌豆呢？豌豆射手：“努力工作，奉献自</font><br>己，再加上一份阳光，高纤维和氧化碳均衡搭</font><br>配，这种健康早餐让一切成为可能。”',
        PrivateBirth: function(a) {
            a.BulletEle = NewImg(0, "images/Plants/Drop.png", "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2))
        },
        PrivateDie: function(a) {
            a.BulletEle = null
        },
        NormalAttack: function() {
            pea(this);
        }
    }),
    oLotusRoot = InheritO(oPeashooter, {
        EName: "oLotusRoot",
        CName: "莲藕火箭炮",
        width: 130,
        height: 114,
        beAttackedPointR: 70,
        SunNum: 400,
        BookHandBack: 4.9,
        coolTime: 30,
        getShadow: function(a) {
            return "display:none"
        },
        PicArr: ["images/Card/Plants/LotusRoot.png", "images/Plants/LotusRoot/0.gif", "images/Plants/LotusRoot/Peashooter.gif", "images/Plants/LotusRoot/Missile.png", "images/Plants/LotusRoot/BulletHit.png"],
        Tooltip: "发射高火力火箭炮，对军舰和潜水艇造成重创",
        Produce: '莲藕火箭炮可以发射高火力火箭炮，对军舰和</font><br>潜水艇造成重创。<p>伤害：<font color="#FF0000">极高</font></p>要问莲藕火箭炮除了发射炮弹还能干啥。嗯，</font><br>对于这个问题，你应该去问问密集恐惧症患者</font><br>。”',
        CanGrow: function(c, b, d) {
            var a = b + "_" + d;
            return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a] || oGd.$Tombstones[a])
        },
        PrivateBirth: function(a) {
            a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2))
        },
        PrivateDie: function(a) {
            a.BulletEle = null
        },
        NormalAttack: function() {
            var a = this,
                b = "PB" + Math.random();
            EditEle(a.BulletEle.cloneNode(false), {
                id: b
            }, 0, EDPZ);
            oSym.addTask(15, function(o) {
                $(a.id).childNodes[1].src = "images/Plants/LotusRoot/Peashooter.gif"
            }, [this]);
            oSym.addTask(15, function(d) {
                var c = $(d);
                c && SetVisible(c)
            }, [b]);
            oSym.addTask(1, function(f, j, h, c, n, i, m, k, o, g) {
                var l, e = GetC(n),
                    d = oZ["getZ" + c](n, i);
                m == 0 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), m = 1, h = 40, k = e, j.src = "images/Plants/LotusRoot/Missile.png");
                d && d.Altitude == 1 ? (d[{
                    "-1": "getSnowPea",
                    0: "getPea",
                    1: "getFirePea"
                } [m]](d, h, c), SetStyle(j, {
                    left: o + 28 + "px"
                }).src = "images/Plants/LotusRoot/BulletHit.png", oSym.addTask(10, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j)
            }, [b, $(b), 500, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch])
        }
    }),
    oSnowPea = InheritO(oPeashooter, {
        EName: "oSnowPea",
        CName: "寒冰射手",
        SunNum: 175,
        BKind: -1,
        PicArr: ["images/Card/Plants/SnowPea.png", "images/Plants/SnowPea/0.gif", "images/Plants/SnowPea/SnowPea.gif", "images/Plants/PB-10.gif", "images/Plants/PeaBulletHit1.gif"],
        AudioArr: ["frozen", "splat1", "splat2", "splat3", "shieldhit", "shieldhit2", "plastichit"],
        Tooltip: "寒冰射手可造成伤害, 同时又有减速效果",
        Produce: '寒冰射手会发射寒冰豌豆来攻击敌人，并具有</font><br>减速效果。<p>伤害：<font color="#FF0000">中等，带有减速效果</font></p>人们经常告诉寒冰射手他是多么“冷酷”，或者</font><br>告诫他要“冷静”。他们叫他要“保持镇静”。寒</font><br>冰射手只是转转他的眼睛。其实他都听见了。',
        NormalAttack: function() {
            var a = this,
                b = "PB" + Math.random();
            EditEle(a.BulletEle.cloneNode(false), {
                id: b
            }, 0, EDPZ);
            oSym.addTask(15, function(d) {
                var c = $(d);
                c && SetVisible(c)
            }, [b]);
            oSym.addTask(1, function(f, j, h, c, n, i, m, k, o, g) {
                var l, e = GetC(n),
                    d = oZ["getZ" + c](n, i);
                m < 1 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), ++m && (h = 40), k = e, j.src = "images/Plants/PB" + m + c + ".gif");
                d && d.Altitude == 1 ? (d[{
                    "-1": "getSnowPea",
                    0: "getPea",
                    1: "getFirePea"
                } [m]](d, h, c), SetStyle(j, {
                    left: o + 28 + "px"
                }).src = "images/Plants/PeaBulletHit1.gif", oSym.addTask(10, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j)
            }, [b, $(b), 30, 0, a.AttackedLX, a.R, -1, 0, a.AttackedLX - 40, oGd.$Torch])
        }
    }),
    oSnowRepeater = InheritO(oSnowPea, {
        EName: "oSnowRepeater",
        CName: "寒冰双发射手",
        SunNum: 250,
        PicArr: ["images/Card/Plants/SnowRepeater.png", "images/Plants/SnowRepeater/0.gif", "images/Plants/SnowRepeater/SnowPea.gif", "images/Plants/PB-10.gif", "images/Plants/PeaBulletHit1.gif"],
        Tooltip: "双发寒冰射手可以发射两枚带有减速效果的子弹",
        Produce: '双发寒冰射手可以发射两枚带有减速效果的子弹。<p>伤害：<font color="#FF0000">中等(每颗)</font><br>发射速度：<font color="#FF0000">两倍</font></p>双发寒冰射手是个射击爱好者，他常常会对别</font><br>人提起自己的射击精准度有多高。嗯，虽然事</font><br>实并不是这样。',
        NormalAttack1: oSnowPea.prototype.NormalAttack,
        NormalAttack: function(a) {
            this.NormalAttack1();
            oSym.addTask(15, function(c) {
                var b = $P[c];
                b && b.NormalAttack1()
            }, [this.id])
        }
    }),
    oRepeater = InheritO(oPeashooter, {
        EName: "oRepeater",
        CName: "双发射手",
        width: 73,
        height: 71,
        beAttackedPointR: 53,
        SunNum: 200,
        PicArr: ["images/Card/Plants/Repeater.png", "images/Plants/Repeater/0.gif", "images/Plants/Repeater/Repeater.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
        AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
        Tooltip: "一次发射两颗豌豆",
        Produce: '双发射手可以一次发射两颗豌豆<p>伤害：<font color="#FF0000">中等(每颗)</font><br>发射速度：<font color="#FF0000">两倍</font></p>双发射手很凶悍，他是在街头混大的。他不在</font><br>乎任何人的看法，无论是植物还是僵尸，他打</font><br>出豌豆，是为了让别人离他远点。其实呢，双</font><br>发射手一直暗暗地渴望着爱情。',
        NormalAttack1: oPeashooter.prototype.NormalAttack,
        NormalAttack: function(a) {
            this.NormalAttack1();
            oSym.addTask(15, function(c) {
                var b = $P[c];
                b && b.NormalAttack1()
            }, [this.id])
        }
    }),
    oThreepeater = InheritO(oPeashooter, {
        EName: "oThreepeater",
        CName: "三线射手",
        width: 73,
        height: 80,
        beAttackedPointR: 53,
        SunNum: 325,
        PicArr: ["images/Card/Plants/Threepeater.png", "images/Plants/Threepeater/0.gif", "images/Plants/Threepeater/Threepeater.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif", "images/Plants/PeaBulletHit2.gif"],
        AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
        Tooltip: "一次射出三行的豌豆",
        Produce: '三线射手可以在三条线上同时射出豌豆。<p>伤害：<font color="#FF0000">普通(每颗)</font><br>范围：<font color="#FF0000">三线</font></p>三线射手喜欢读书，下棋和在公园里呆坐。他</font><br>也喜欢演出，特别是现代爵士乐。“我正在寻找</font><br>我生命中的另一半，”他说。三线射手最爱的数</font><br>字是5。',
        getTriggerR: function(a) {
            return [a > 2 ? a - 1 : 1, a < oS.R ? Number(a) + 1 : a]
        },
        PrivateBirth: function(f) {
            var e = f.AttackedLX,
                d = e - 40,
                a, c = f.oTrigger,
                b;
            f.BulletClass = [];
            f.BulletEle = [];
            for (b in c) {
                f.BulletClass.push(NewO({
                    X: e,
                    R: b,
                    D: 0,
                    Attack: 20,
                    Kind: 0,
                    ChangeC: 0,
                    pixelLeft: d,
                    F: oGd.MB1
                }));
                f.BulletEle.push(NewImg(0, "images/Plants/PB00.gif", "left:" + d + "px;top:" + (GetY(b) - 50) + "px;visibility:hidden;z-index:" + (3 * b + 2)))
            }
        },
        PrivateDie: function(a) {
            a.BulletEle.length = 0
        },
        NormalAttack: function() {
            var a, c = this,
                d, b = 0;
            for (a in c.oTrigger) {
                EditEle(c.BulletEle[b++].cloneNode(false), {
                    id: d = "PB" + Math.random()
                }, 0, EDPZ);
                oSym.addTask(15, function(f) {
                    var e = $(f);
                    e && SetVisible(e)
                }, [d]);
                oSym.addTask(1, function(h, l, j, e, p, k, o, m, q, i) {
                    var n, g = GetC(p),
                        f = oZ["getZ" + e](p, k);
                    o == 0 && i[k + "_" + g] && m != g && (PlayAudio("firepea"), o = 1, j = 40, m = g, l.src = "images/Plants/PB" + o + e + ".gif");
                    f && f.Altitude == 1 ? (f[{
                        "-1": "getSnowPea",
                        0: "getPea",
                        1: "getFirePea"
                    } [o]](f, j, e), SetStyle(l, {
                        left: q + 28 + "px"
                    }).src = ["images/Plants/PeaBulletHit.gif", "images/Plants/PeaBulletHit2.gif"][o], oSym.addTask(10, ClearChild, [l])) : (p += n = !e ? 5 : -5) < oS.W && p > 100 ? (l.style.left = (q += n) + "px", oSym.addTask(1, arguments.callee, [h, l, j, e, p, k, o, m, q, i])) : ClearChild(l)
                }, [d, $(d), 20, 0, c.AttackedLX, a, 0, 0, c.AttackedLX - 40, oGd.$Torch])
            }
        }
    }),
    o3GatlingPea = InheritO(oThreepeater, {
        EName: "o3GatlingPea",
        CName: "三路机枪射手",
        NormalAttack1: oThreepeater.prototype.NormalAttack,
        NormalAttack: function(a) {
            this.NormalAttack1();
            oSym.addTask(5, function(d, b) {
                var c = $P[d];
                c && c.NormalAttack1();
                --b && oSym.addTask(5, arguments.callee, [d, b])
            }, [this.id, 3])
        }
    }),
    oGatlingPea = InheritO(oPeashooter, {
        EName: "oGatlingPea",
        CName: "机枪射手",
        width: 88,
        height: 84,
        beAttackedPointR: 68,
        SunNum: 275,
        PicArr: ["images/Card/Plants/GatlingPea.png", "images/Plants/GatlingPea/0.gif", "images/Plants/GatlingPea/GatlingPea.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
        AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
        Tooltip: "一次发射四颗豌豆<br>",
        Produce: '机枪射手可以一次发射四颗豌豆<p>伤害：<font color="#FF0000">中等(每颗)</font><br>发射速度：<font color="#FF0000">四倍<br>可以种在双发射手上</font></p>当加特林宣布他要参军的时候，他的父母很为</font><br>他担心，他们异口同声地对他说：“亲爱的，</font><br>这太危险了。”加特林拒绝让步，“生活就危</font><br>险，”他这样回答着，此时他的眼睛里，正</font><br>闪烁着钢铁般的信念。',
        PrivateBirth: function(c) {
            var b = c.AttackedLX,
                a = b - 40;
            c.BulletClass = NewO({
                X: b,
                R: c.R,
                D: 0,
                Attack: 20,
                Kind: c.BKind,
                ChangeC: 0,
                pixelLeft: a,
                F: oGd.MB1
            });
            c.BulletEle = NewImg(0, c.PicArr[3], "left:" + a + "px;top:" + (c.pixelTop + 8) + "px;visibility:hidden;z-index:" + (c.zIndex + 2))
        },
        CanGrow: function(c, b, f) {
            var a = b + "_" + f,
                d = c[1],
                e = oS.ArP;
            return e ? oGd.$LF[b] == 1 ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d : d && d.EName == "oRepeater" ? 1 : oGd.$LF[b] == 1 ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d
        },
        NormalAttack1: oPeashooter.prototype.NormalAttack,
        NormalAttack: function(a) {
            this.NormalAttack1();
            oSym.addTask(15, function(d, b) {
                var c = $P[d];
                c && c.NormalAttack1();
                --b && oSym.addTask(15, arguments.callee, [d, b])
            }, [this.id, 3])
        }
    }),
    o5GatlingPea = InheritO(oPeashooter, {
        EName: "o5GatlingPea",
        CName: "五头机枪射手",
        width: 88,
        height: 84,
        beAttackedPointR: 68,
        SunNum: 275,
        PicArr: ["images/Card/Plants/5GatlingPea.png", "images/Plants/5GatlingPea/0.png", "images/Plants/5GatlingPea/5GatlingPea.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],
        NormalAttack1: oPeashooter.prototype.NormalAttack,
        NormalAttack: function(a) {
            this.NormalAttack1();
            oSym.addTask(15, function(d, b) {
                var c = $P[d];
                c && c.NormalAttack1();
                --b && oSym.addTask(15, arguments.callee, [d, b])
            }, [this.id, 19])
        }
    }),
        oSplitPea = InheritO(oPeashooter, {
        EName: "oSplitPea",
        CName: "分裂射手",
        width: 92,
        height: 72,
        beAttackedPointR: 72,
        SunNum: 125,
        PicArr: ["images/Card/Plants/SplitPea.png", "images/Plants/SplitPea/0.gif", "images/Plants/SplitPea/SplitPea.gif", "images/Plants/PB00.gif", "images/Plants/PB01.gif", "images/Plants/PeaBulletHit.gif"],
        AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],
        Tooltip: "前后双向发射豌豆",
        Produce: '分裂射手，可以向前后两个方向发射豌豆。<p>伤害：<font color="#FF0000">中等</font><br>范围：<font color="#FF0000">前面和后面</font><br>发射速度：<font color="#FF0000">前面为正常速度，后面为两倍速度</font></p>分裂射手：“没错，我就是双子座。我知道，</font><br>这的确很令人惊奇。不过，有两个头，或者实际</font><br>上，长着一个头和一个类似头的东西，在背上，</font><br>对我这条线上的防守帮助很大。',
        GetDX: function() {
            return -55
        },
        getShadow: function(a) {
            return "left:5px;top:" + (a.height - 22) + "px"
        },
        getTriggerRange: function(a, b, c) {
            return [
                [100, b + 25, 1],
                [b + 26, oS.W, 0]
            ]
        },
        PrivateBirth: function(c) {
            var b = c.PicArr,
                a = "px;top:" + (c.pixelTop + 3) + "px;visibility:hidden;z-index:" + (c.zIndex + 2);
            c.BulletEle = [NewImg(0, b[3], "left:" + (c.AttackedLX - 40) + a), NewImg(0, b[4], "left:" + (c.AttackedRX - 16) + a)], c.aTri = [0, 0]
        },
        PrivateDie: function(a) {
            a.BulletEle.length = 0
        },
        TriggerCheck: function(b, a) {
            if (this.aTri[a]) {
                return
            }
            if (this.AttackCheck2(b)) {
                ++this.aTri[a];
                this.aTri[0] && this.aTri[1] && (this.canTrigger = 0);
                this.CheckLoop(b.id, a)
            }
        },
        AttackCheck1: function(b, f) {
            var e = this,
                c = $Z[b],
                a;
            if (c && c.PZ && c.R == e.R) {
                a = c.ZX > e.AttackedLX + 25 ? 0 : 1;
                f == a ? e.AttackCheck2(c) ? e.CheckLoop(b, f) : --e.aTri[f] : (++e.aTri[a], --e.aTri[f])
            } else {
                --e.aTri[f]
            }
            e.canTrigger = e.aTri[0] && e.aTri[1] ? 0 : 1
        },
        CheckLoop: function(a, b) {
            this.NormalAttack(b);
            oSym.addTask(140, function(c, e, g) {
                var f;
                (f = $P[c]) && f.AttackCheck1(e, g)
            }, [this.id, a, b])
        },
        NormalAttack: function(c) {
            var d = this,
                e, a = c ? (oSym.addTask(15, function(f) {
                    $P[f] && b(1)
                }, [d.id]), d.AttackedRX - 16) : d.AttackedLX - 40,
                b = function() {
                    EditEle(d.BulletEle[c].cloneNode(false), {
                        id: e = "PB" + Math.random()
                    }, 0, EDPZ);
                    oSym.addTask(15, function(g) {
                        var f = $(g);
                        f && SetVisible(f)
                    }, [e]);
                    oSym.addTask(1, function(i, m, k, f, q, l, p, n, r, j) {
                        var o, h = GetC(q),
                            g = oZ["getZ" + f](q, l);
                        p == 0 && j[l + "_" + h] && n != h && (PlayAudio("firepea"), p = 1, k = 40, n = h, m.src = "images/Plants/PB" + p + f + ".gif");
                        g && g.Altitude == 1 ? (g[{
                            "-1": "getSnowPea",
                            0: "getPea",
                            1: "getFirePea"
                        } [p]](g, k, f), SetStyle(m, {
                            left: r + 28 + "px"
                        }).src = ["images/Plants/PeaBulletHit.gif", "images/Plants/PeaBulletHit2.gif"][m], oSym.addTask(10, ClearChild, [m])) : (q += o = !f ? 5 : -5) < oS.W && q > 100 ? (m.style.left = (r += o) + "px", oSym.addTask(1, arguments.callee, [i, m, k, f, q, l, p, n, r, j])) : ClearChild(m)
                    }, [e, $(e), 20, c, d.AttackedLX, d.R, 0, 0, a, oGd.$Torch])
                };
            b()
        }
    }),
    oSunFlower = InheritO(CPlants, {
        EName: "oSunFlower",
        CName: "向日葵",
        width: 73,
        height: 74,
        beAttackedPointR: 53,
        SunNum: 50,
        PicArr: ["images/Card/Plants/SunFlower.png", "images/Plants/SunFlower/0.gif", "images/Plants/SunFlower/SunFlower1.gif", "images/Plants/SunFlower/SunFlower.gif"],
        Tooltip: "向日葵，为你生产更多阳光的基础作物。尽可能多地种植吧！",
        Produce: '向日葵，为你生产额外阳光的经济作物。尝试</font><br>尽可能多种植吧！<p>阳光产量：<font color="#FF0000">中等</font></p>向日葵情不自禁地和着节拍起舞。是什么节拍</font><br>呢？嗨，是大地自己用来提神的爵士节拍，这</font><br>种频率的节拍，只有向日葵才能听到。',
        BirthStyle: function(c, e, b, a) {
            var d = b.childNodes[1];
            d.src = this.PicArr[3];
            d.style.clip = "rect(0,auto,74px,0)";
            d.style.height = "148px";
            EditEle(b, {
                id: e
            }, a, EDPZ)
        },
        ChangePosition: function(c, a) {
            var b = c.childNodes[1];
            a ? SetStyle(b, {
                clip: "rect(74px,auto,auto,auto)",
                top: "-74px"
            }) : SetStyle(b, {
                clip: "rect(auto,auto,74px,auto)",
                top: 0
            })
        },
        PrivateBirth: function(a) {
            oS.ProduceSun ? oSym.addTask(500, function(d, c, b) {
                $P[d] && (a.ChangePosition($(d), 1), oSym.addTask(100, function(h, g, f, e) {
                    $P[h] && (AppearSun(Math.floor(g + Math.random() * 41), f, 50, 0), oSym.addTask(100, function(i) {
                        $P[i] && a.ChangePosition($(i), 0)
                    }, [h]), oSym.addTask(2400, e, [h, g, f]))
                }, [d, c, b, arguments.callee]))
            }, [a.id, GetX(a.C) - 40, GetY(a.R)]) : a.getHurt = function(f, c, b) {
                var e = this;
                switch (c) {
                    case 0:
                        var d = e.HP -= b;
                        !(d % 100) && (AppearSun(Math.floor(GetX(e.C) - 40 + Math.random() * 41), GetY(e.R), 25, 0), oSym.addTask(50, function(h, g) {
                            AppearSun(Math.floor(GetX(h) - 40 + Math.random() * 41), GetY(g), 25, 0)
                        }, [e.C, e.R]), d < 1 ? e.Die() : oSym.addTask(50, function(h, g) {
                            AppearSun(Math.floor(GetX(h) - 40 + Math.random() * 41), GetY(g), 25, 0)
                        }, [e.C, e.R]));
                        break;
                    case 3:
                        (e.HP -= b) < 1 && e.Die();
                        break;
                    default:
                        e.Die(1)
                }
            }
        },
        InitTrigger: function() {}
    }),
    oTwinSunflower = InheritO(oSunFlower, {
        EName: "oTwinSunflower",
        CName: "双胞向日葵",
        width: 83,
        height: 84,
        beAttackedPointR: 63,
        SunNum: 150,
        PicArr: ["images/Card/Plants/TwinSunflower.png", "images/Plants/TwinSunflower/0.gif", "images/Plants/TwinSunflower/TwinSunflower1.gif", "images/Plants/TwinSunflower/TwinSunflower.gif"],
        Tooltip: "双胞向日葵的阳光产量是普通向日葵的两倍<br>",
        Produce: '双胞向日葵的阳光产量是普通向日葵的两倍。<p>阳光产量：<font color="#FF0000">双倍<br>可以种在普通向日葵上</font></p>这是一个疯狂的夜晚，禁忌的科学技术，让双</font><br>胞向日葵来到了这个世界。电闪雷鸣狂风怒吼</font><br>，都在表示着这个世界对他的拒绝。但是一切</font><br>无济于事，双子向日葵他却仍然活着！',
        CanGrow: function(c, b, f) {
            var a = b + "_" + f,
                d = c[1],
                e = oS.ArP;
            return e ? oGd.$LF[b] == 1 ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d : d && d.EName == "oSunFlower" ? 1 : oGd.$LF[b] == 1 ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d
        },
        BirthStyle: function(c, e, b, a) {
            var d = b.childNodes[1];
            d.src = "images/Plants/TwinSunflower/TwinSunflower.gif";
            d.style.clip = "rect(0,auto,84px,0)";
            d.style.height = "168px";
            EditEle(b, {
                id: e
            }, a, EDPZ)
        },
        ChangePosition: function(c, a) {
            var b = c.childNodes[1];
            a ? SetStyle(b, {
                clip: "rect(84px,auto,auto,auto)",
                top: "-84px"
            }) : SetStyle(b, {
                clip: "rect(auto,auto,84px,auto)",
                top: 0
            })
        },
        PrivateBirth: function(a) {
            var b = GetX(a.C);
            oSym.addTask(500, function(f, d, c, e) {
                $P[f] && (a.ChangePosition($(f), 1), oSym.addTask(100, function(k, h, g, j, i) {
                    AppearSun(Math.floor(h + Math.random() * 21), j, 50, 0), AppearSun(Math.floor(g + Math.random() * 21), j, 50, 0), oSym.addTask(100, function(l) {
                        $P[l] && a.ChangePosition($(l), 0)
                    }, [k]), oSym.addTask(2400, i, [k, h, g, j])
                }, [f, d, c, e, arguments.callee]))
            }, [a.id, b - 40, b - 20, GetY(a.R)])
        }
    }),
    o4Sunflower = InheritO(oSunFlower, {
        EName: "o4Sunflower",
        CName: "四胞向日葵",
        width: 83,
        height: 84,
        beAttackedPointR: 63,
        SunNum: 50,
        PicArr: ["images/Card/Plants/4Sunflower.png", "images/Plants/4Sunflower/0.gif", "images/Plants/4Sunflower/4Sunflower1.gif", "images/Plants/4Sunflower/4Sunflower.gif"],
        Tooltip: "四胞向日葵的阳光产量是普通向日葵的四倍<br>",
        Produce: '四胞向日葵的阳光产量是普通向日葵的四倍。<p>阳光产量：<font color="#FF0000">双倍<br>可以种在普通向日葵上</font></p>这是一个疯狂的夜晚，禁忌的科学技术，让双</font><br>胞向日葵来到了这个世界。电闪雷鸣狂风怒吼</font><br>，都在表示着这个世界对他的拒绝。但是一切</font><br>无济于事，双子向日葵他却仍然活着！',
        CanGrow: function(c, b, f) {
            var a = b + "_" + f,
                d = c[1],
                e = oS.ArP;
            return e ? oGd.$LF[b] == 1 ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d : d && d.EName == "oSunFlower" ? 1 : oGd.$LF[b] == 1 ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d
        },
        BirthStyle: function(c, e, b, a) {
            var d = b.childNodes[1];
            d.src = "images/Plants/4Sunflower/4Sunflower.gif";
            d.style.clip = "rect(0,auto,84px,0)";
            d.style.height = "168px";
            EditEle(b, {
                id: e
            }, a, EDPZ)
        },
        ChangePosition: function(c, a) {
            var b = c.childNodes[1];
            a ? SetStyle(b, {
                clip: "rect(84px,auto,auto,auto)",
                top: "-84px"
            }) : SetStyle(b, {
                clip: "rect(auto,auto,84px,auto)",
                top: 0
            })
        },
        PrivateBirth: function(a) {
            var b = GetX(a.C);
            oSym.addTask(500, function(f, d, c, e) {
                $P[f] && (a.ChangePosition($(f), 1), oSym.addTask(100, function(k, h, g, j, i) {
                    AppearSun(Math.floor(h + Math.random() * 21), j, 50, 0),
                    AppearSun(Math.floor(h + Math.random() * 21), j+40, 50, 0),
                        AppearSun(Math.floor(g + Math.random() * 21), j, 50, 0),
                        AppearSun(Math.floor(g + Math.random() * 21), j+40, 50, 0),
                        oSym.addTask(100, function(l) {
                        $P[l] && a.ChangePosition($(l), 0)
                    }, [k]), oSym.addTask(2400, i, [k, h, g, j])
                }, [f, d, c, e, arguments.callee]))
            }, [a.id, b - 40, b - 20, GetY(a.R)])
        }

    }),
    oSunflowerPea = InheritO(oSunFlower, {
        EName: "oSunflowerPea",
        CName: "向日葵豌豆",
        Tooltip: "不仅可以产生☀️，还可以射出豌豆",
        width: 83,
        height: 84,
        beAttackedPointR: 63,
        SunNum: 15,
        PicArr: ["images/Card/Plants/SunFlowerPea.png", "images/Plants/SunFlowerPea/0.gif", "images/Plants/SunFlowerPea/SunFlower1.gif", "images/Plants/SunFlowerPea/SunFlower.gif"],
        PrivateBirth: function(a) {
            a.BulletEle = NewImg(0, "images/Plants/PB00.gif", "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2))

            oS.ProduceSun ? oSym.addTask(500, function(d, c, b) {
                $P[d] && (a.ChangePosition($(d), 1), oSym.addTask(100, function(h, g, f, e) {
                    $P[h] && (AppearSun(Math.floor(g + Math.random() * 41), f, 50, 0),
                        AppearSun(Math.floor(h + Math.random() * 21), f, 50, 0),
                        AppearSun(Math.floor(h + Math.random() * 31), f, 50, 0),
                        AppearSun(Math.floor(h + Math.random() * 11), f, 50, 0),
                        AppearSun(Math.floor(h + Math.random() * 51), f, 50, 0),
                        oSym.addTask(100, function(i) {
                            $P[i] && a.ChangePosition($(i), 0)
                        }, [h]), oSym.addTask(2400, e, [h, g, f]))
                }, [d, c, b, arguments.callee]))
            }, [a.id, GetX(a.C) - 40, GetY(a.R)]) : a.getHurt = function(f, c, b) {
                var e = this;
                switch (c) {
                    case 0:
                        var d = e.HP -= b;
                        !(d % 100) && (AppearSun(Math.floor(GetX(e.C) - 40 + Math.random() * 41), GetY(e.R), 25, 0), oSym.addTask(50, function(h, g) {
                            AppearSun(Math.floor(GetX(h) - 40 + Math.random() * 41), GetY(g), 25, 0)
                        }, [e.C, e.R]), d < 1 ? e.Die() : oSym.addTask(50, function(h, g) {
                            AppearSun(Math.floor(GetX(h) - 40 + Math.random() * 41), GetY(g), 25, 0)
                        }, [e.C, e.R]));
                        break;
                    case 3:
                        (e.HP -= b) < 1 && e.Die();
                        break;
                    default:
                        e.Die(1)
                }
            }
        },
        NormalAttack: function() {
            pea(this);
        },
        InitTrigger: function(c, b, f, a, h, g) {
            var j = {},
                i = c.getTriggerR(f),
                e = i[0],
                d = i[1];
            do {
                oT.add(e, j[e] = c.getTriggerRange(e, h, g), b)
            } while (e++ != d);
            c.oTrigger = j
        }
    }),
    oPumpkinHead = InheritO(CPlants, {
        EName: "oPumpkinHead",
        CName: "南瓜头",
        width: 97,
        height: 67,
        beAttackedPointL: 15,
        beAttackedPointR: 82,
        SunNum: 125,
        PKind: 2,
        HP: 4e3,
        coolTime: 30,
        zIndex: 1,
        PicArr: ["images/Card/Plants/PumpkinHead.png", "images/Plants/PumpkinHead/0.gif", "images/Plants/PumpkinHead/PumpkinHead.gif", "images/Plants/PumpkinHead/PumpkinHead1.gif", "images/Plants/PumpkinHead/PumpkinHead2.gif", "images/Plants/PumpkinHead/pumpkin_damage1.gif", "images/Plants/PumpkinHead/pumpkin_damage2.gif", "images/Plants/PumpkinHead/Pumpkin_back.gif"],
        Tooltip: "南瓜头，可以用他的外壳保护其他植物。",
        Produce: '南瓜头，可以用他的外壳保护其他植物。<p>韧性：<font color="#FF0000">高</font><br>特点：<font color="#FF0000">可以种在其他植物上</font></p>南瓜头最近都没收到，关于他表哥刃菲尔德的</font><br>消息。很明显，刃菲尔德是个大明星，是一种……</font><br>叫什么运动来着……的体育明星？佩格跳跳球大</font><br>师？南瓜头反正搞不懂是什么运动，他只想做好</font><br>他自己的工作。',
        CanGrow: function(c, b, d) {
            var a = b + "_" + d;
            return c[2] ? 1 : oGd.$LF[b] == 1 ? !(d < 1 || d > 9 || oGd.$Crater[a] || oGd.$Tombstones[a]) : c[0]
        },
        GetDY: function(b, c, a) {
            return a[0] ? -12 : -5
        },
        HurtStatus: 0,
        getHurt: function(e, c, b) {
            var d = this,
                f = d.id,
                a = $(f);
            switch (true) {
                case c && c < 3:
                    d.Die(1);
                    break;
                case (d.HP -= b) < 1:
                    d.Die();
                    break;
                case d.HP < 1334:
                    d.HurtStatus < 2 && (d.HurtStatus = 2, a.childNodes[1].src = "images/Plants/PumpkinHead/pumpkin_damage2.gif");
                    break;
                case d.HP < 2667:
                    d.HurtStatus < 1 && (d.HurtStatus = 1, a.childNodes[1].src = "images/Plants/PumpkinHead/pumpkin_damage1.gif", $(f + "_2").src = "images/Plants/PumpkinHead/Pumpkin_back.gif")
            }
        },
        InitTrigger: function() {},
        BirthStyle: function(c, d, b, a) {
            b.childNodes[1].src = "images/Plants/PumpkinHead/PumpkinHead1.gif";
            EditEle(b, {
                id: d
            }, a, EDPZ);
            NewImg(d + "_2", "images/Plants/PumpkinHead/PumpkinHead2.gif", "left:" + c.pixelLeft + "px;top:" + c.pixelTop + "px;z-index:" + (c.zIndex - 2), EDPZ)
        },
        PrivateDie: function(a) {
            ClearChild($(a.id + "_2"))
        }
    }),
    oFlowerPot = InheritO(CPlants, {
        EName: "oFlowerPot",
        CName: "花盆",
        width: 72,
        height: 68,
        beAttackedPointR: 52,
        SunNum: 25,
        BookHandBack: 6,
        HP: 1e3,
        PicArr: ["images/Card/Plants/FlowerPot.png", "images/Plants/FlowerPot/0.gif", "images/Plants/FlowerPot/FlowerPot.gif"],
        PKind: 0,
        Stature: -1,
        GetDY: function(b, c, a) {
            return 6
        },
        CanGrow: function(e, d, f) {
            var c = d + "_" + f,
                b = oGd.$LF[d],
                a = f < 1 || f > 9;
            return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0
        },
        Tooltip: "可以让植物栽种在屋顶上",
        Produce: '花盆可以让你在屋顶上种植植物。<p>特点：<font color="#FF0000">允许你在屋顶上种植</font></p>“我是一个让植物栽种的花盆，但我也是一棵</font><br>植物。是不是很意外？',
        InitTrigger: function() {}
    }),
    oCFlowerPot = InheritO(oFlowerPot, {
        EName: "oCFlowerPot",
        PicArr: ["images/Card/Plants/CFlowerPot.png", "images/Plants/FlowerPot/C/0.gif", "images/Plants/FlowerPot/C/CFlowerPot.gif"],
        Produce: "可以让植物栽种在瓷砖地形上。</font></p>青瓷花盆，不需要介绍"
    }),
    oLilyPad = InheritO(oFlowerPot, {
        BookHandBack: 4.9,
        Stature: -1,
        EName: "oLilyPad",
        CName: "莲叶",
        width: 79,
        height: 58,
        beAttackedPointR: 59,
        HP: 1e3,
        PicArr: ["images/Card/Plants/LilyPad.png", "images/Plants/LilyPad/0.gif", "images/Plants/LilyPad/LilyPad.gif"],
        getShadow: function(a) {
            return "left:-8px;top:25px"
        },
        CanGrow: function(c, b, d) {
            var a = b + "_" + d;
            return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a] || oGd.$Tombstones[a])
        },
        Tooltip: "莲叶可以让你在它上面种植非水生植物。",
        Produce: '莲叶可以让你种植非水生植物在它上面。<p>特点：<font color="#FF0000">非水生植物可以种植在它上面<br>必须种植在水面</font></p>莲叶从不抱怨，它也从来不想知道发生了什么</font><br>事。在它身上种植物，它也不会说什么。难道</font><br>，它有什么惊奇想法或者可怕的秘密？没人</font><br>知道。莲叶把这些都埋藏在心底。'
    }),
    oLilyPad1 = InheritO(oLilyPad, {
        EName: "oLilyPad1"
    }),
    oPotatoMine = InheritO(CPlants, {
        EName: "oPotatoMine",
        CName: "土豆雷",
        width: 75,
        height: 55,
        beAttackedPointR: 55,
        SunNum: 25,
        coolTime: 30,
        Stature: -1,
        HP: 1e3,
        CanGrow: function(c, b, e) {
            var a = b + "_" + e,
                d = oS.ArP;
            return d ? oGd.$LF[b] == 1 ? e > 0 && e < d.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1] : oGd.$LF[b] == 1 ? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1]
        },
        PicArr: ["images/Card/Plants/PotatoMine.png", "images/Plants/PotatoMine/0.gif", "images/Plants/PotatoMine/PotatoMine.gif", "images/Plants/PotatoMine/PotatoMineNotReady.gif", "images/Plants/PotatoMine/PotatoMine_mashed.gif", "images/Plants/PotatoMine/ExplosionSpudow.gif"],
        Tooltip: "敌人接触后爆炸<br>需要时间安放",
        Produce: '土豆雷具有强大的威力，但是他们需要点时间</font><br>来武装自己。你应把他们种在僵尸前进的路上</font><br>，当他们一被接触就会发生爆炸。<p>伤害：<font color="FF0000">巨大</font><br>范围：<font color="#FF0000">一个小区域内的所有僵尸</font><br>使用方法：<font color="#FF0000">单独使用，需要一定准备时间。</font></p>一些人说土豆雷很懒，因为他总是把所有事情</font><br>留到最后。土豆雷才没空理他们，他正忙着考</font><br>虑他的投资战略呢。',
        Status: 0,
        AudioArr: ["potato_mine"],
        canTrigger: 0,
        BirthStyle: function(d, e, c, b, a) {
            c.childNodes[1].src = !a ? "images/Plants/PotatoMine/PotatoMineNotReady.gif" : (~ function() {
                d.Status = 1;
                d.canTrigger = 1;
                d.getHurt = d.getHurt2
            }(), "images/Plants/PotatoMine/PotatoMine.gif");
            EditEle(c, {
                id: e
            }, b, EDPZ)
        },
        getHurt2: function(d, b, a) {
            var c = this;
            b > 2 ? (c.HP -= a) < 1 && c.Die() : c.NormalAttack(c.pixelLeft, c.pixelRight, c.R)
        },
        PrivateBirth: function(b, a) {
            !a && oSym.addTask(1500, function(d) {
                var c = $P[d];
                c && ($(d).childNodes[1].src = "images/Plants/PotatoMine/PotatoMine.gif", c.Status = 1, c.canTrigger = 1, c.getHurt = c.getHurt2)
            }, [b.id])
        },
        getTriggerRange: function(a, b, c) {
            return [
                [b, c, 0]
            ]
        },
        TriggerCheck: function(e, c) {
            var a = this.R,
                b = this.C;
            e.beAttacked && e.Altitude < 2 && !oGd.$[a + "_" + b + "_2"] && this.NormalAttack(this.pixelLeft, this.pixelRight, this.R)
        },
        NormalAttack: function(j, h, e) {
            var g = this,
                b = g.id,
                d = $(b),
                c = oZ.getArZ(j, h, e),
                f = c.length,
                a;
            while (f--) {
                (a = c[f]).Altitude < 2 && a.getThump()
            }
            g.Die(1);
            PlayAudio("potato_mine");
            EditEle(d.childNodes[1], {
                src: "images/Plants/PotatoMine/PotatoMine_mashed.gif"
            }, {
                width: "132px",
                height: "93px",
                left: "-40px",
                top: "-20px"
            });
            NewImg(0, "images/Plants/PotatoMine/ExplosionSpudow.gif", "left:-90px;top:-40px", d);
            oSym.addTask(200, function(i) {
                ClearChild(i.lastChild);
                oSym.addTask(100, ClearChild, [i])
            }, [d])
        }
    }),
    oTorchwood = InheritO(CPlants, {
        EName: "oTorchwood",
        CName: "火炬树桩",
        width: 73,
        height: 83,
        beAttackedPointR: 53,
        SunNum: 175,
        PicArr: ["images/Card/Plants/Torchwood.png", "images/Plants/Torchwood/0.gif", "images/Plants/Torchwood/Torchwood.gif", "images/Plants/PB00.gif", "images/Plants/PB01.gif", "images/Plants/PB10.gif", "images/Plants/PB11.gif", "images/Plants/Torchwood/SputteringFire.gif"],
        AudioArr: ["firepea", "ignite", "ignite2"],
        Tooltip: "火炬树桩可以把穿过他的豌豆变成火球，让豌豆造成两倍伤害。",
        Produce: '火炬树桩可以把穿过他的豌豆变成火球，造成</font><br>两倍伤害。<p>特点：<font color="#FF0000">让穿过他的火球造成两倍伤害。火球也</font><br>会对附近僵尸</font><br>造成溅射伤害</font></p>每个人都喜欢并敬重火炬树桩。他们喜欢他的</font><br>诚实和坚贞的友谊，以及增强豌豆伤害的能力。</font><br>但他也有自己的秘密：他不识字！',
        PrivateBirth: function(c) {
            var a = c.R,
                b = c.C;
            oGd.$Torch[a + "_" + b] = c.id;
            oS.HaveFog && oGd.GatherFog(a, b, 1, 1, 0)
        },
        InitTrigger: function() {},
        PrivateDie: function(c) {
            var a = c.R,
                b = c.C;
            delete oGd.$Torch[a + "_" + b];
            oS.HaveFog && oGd.GatherFog(a, b, 1, 1, 1)
        },
        NormalAttack: function() {
            var a = this,
                b = "PB" + Math.random();
            EditEle(a.BulletEle.cloneNode(false), {
                id: b
            }, 0, EDPZ);
            oSym.addTask(15, function(d) {
                var c = $(d);
                c && SetVisible(c)
            }, [b]);
            oSym.addTask(1, function(f, j, h, c, n, i, m, k, o, g) {
                var l, e = GetC(n),
                    d = oZ["getZ" + c](n, i);
                m == 0 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), m = 1, h = 40, k = e, j.src = "images/Plants/PB" + m + c + ".gif");
                d && d.Altitude == 1 ? (d[{
                    "-1": "getSnowPea",
                    0: "getPea",
                    1: "getFirePea"
                } [m]](d, h, c), SetStyle(j, {
                    left: o + 28 + "px"
                }).src = "images/Plants/PeaBulletHit2.gif", oSym.addTask(75, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j)
            }, [b, $(b), 20, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch])
        }
    }),
    oWallNut = InheritO(CPlants, {
        EName: "oWallNut",
        CName: "坚果墙",
        width: 65,
        height: 73,
        beAttackedPointR: 45,
        SunNum: 50,
        coolTime: 15.5,
        HP: 4e3,
        PicArr: ["images/Card/Plants/WallNut.png", "images/Plants/WallNut/0.gif", "images/Plants/WallNut/WallNut.gif", "images/Plants/WallNut/Wallnut_cracked1.gif", "images/Plants/WallNut/Wallnut_cracked2.gif"],
        Tooltip: "坚果墙拥有足以保护其它植物的坚硬外壳。",
        Produce: '坚果墙拥有足以让你用来保护其它植物的坚硬</font><br>外壳。<p>韧性：<font color="FF0000">高</font></p>坚果墙：“人们想知道，经常被僵尸啃的感觉</font><br>怎样？他们不知道，我有限的感官，只能让我</font><br>感到一种麻麻的感觉，像是，令人放松的背部按摩。”',
        CanGrow: function(c, b, f) {
            var a = b + "_" + f,
                d = c[1],
                e = oS.ArP;
            return e ? oGd.$LF[b] == 1 ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d : d && d.EName == "oWallNut" ? 1 : oGd.$LF[b] == 1 ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d
        },
        InitTrigger: function() {},
        HurtStatus: 0,
        getHurt: function(e, b, a) {
            var c = this,
                d = $(c.id).childNodes[1];
            !(b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 1334 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/Plants/WallNut/Wallnut_cracked2.gif") : c.HP < 2667 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/Plants/WallNut/Wallnut_cracked1.gif"): c.Die(1)
        }
    }),
    oLing = InheritO(oWallNut, {
        EName: "oLing",
        CName: "南湖菱",
        width: 90,
        height: 72,
        beAttackedPointL: 15,
        beAttackedPointR: 80,
        BookHandBack: 4.9,
        HP: 1e4,
        getShadow: function(a) {
            return "display:none"
        },
        PicArr: ["images/Card/Plants/Ling.png", "images/Plants/Ling/0.gif", "images/Plants/Ling/Ling.gif"],
        Tooltip: "南湖菱是水中的第一道障碍物",
        Produce: '南湖菱是水中的第一道障碍物。<p>韧性：<font color="FF0000">高</font></p>瞧，多大一个腰果呀，今天又有人对南湖菱这</font><br>么说道，可他并不在乎。南湖菱脑袋里每天只</font><br>想一件事"如果当年乾隆没开金口，我不就能用</font><br>角去刺僵尸了？！"',
        CanGrow: function(c, b, d) {
            var a = b + "_" + d;
            return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a] || oGd.$Tombstones[a])
        },
        getHurt: function(e, b, a) {
            var c = this,
                d = $(c.id).childNodes[1];
            !(b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 1334 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/Plants/Ling/Ling.gif") : c.HP < 2667 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/Plants/Ling/Ling.gif"): c.Die(1)
        }
    }),
    oNutBowling = InheritO(CPlants, {
        EName: "oNutBowling",
        CName: "坚果保龄球",
        width: 71,
        height: 71,
        beAttackedPointL: 10,
        beAttackedPointR: 61,
        SunNum: 0,
        HP: 4e3,
        coolTime: 0,
        canEat: 0,
        Tooltip: "",
        PicArr: ["images/Card/Plants/WallNut.png", "images/Plants/WallNut/0.gif", "images/Plants/WallNut/WallNutRoll.gif"],
        AudioArr: ["bowling", "bowlingimpact", "bowlingimpact2"],
        Produce: "",
        CanAttack: 1,
        InitTrigger: function() {},
        getHurt: function() {},
        CanGrow: function(d, e, f) {
            return true
        },
        NormalAttack: null,
        PrivateBirth: function(c) {
            var d = $(c.id);
            PlayAudio("bowling");
            (function(z, y, q, r, p, x, e, g, b) {
                var a = z.R,
                    l = z.C,
                    A, u, s, v = 0,
                    w, i, t = false;
                if (z.CanAttack && (A = oZ.getZ0(r, a)) && A.getCrushed(z)) {
                    u = A.id;
                    PlayAudio(["bowlingimpact", "bowlingimpact2"][Math.floor(Math.random() * 2)]);
                    switch (A.Ornaments) {
                        case 0:
                            A.NormalDie();
                            break;
                        case 1:
                            A.getHit0(A, Math.min(A.OrnHP, 900), 0);
                            break;
                        default:
                            z.side ? A.Normaldie() : A.CheckOrnHP(A, u, A.OrnHP, 400, A.PicArr, 0, 0, 0)
                    }
                    z.CanAttack = 0;
                    switch (a) {
                        case oS.R:
                            e = -1;
                            break;
                        case 1:
                            e = 1;
                            break;
                        default:
                            switch (e) {
                                case 1:
                                    e = -1;
                                    break;
                                case -1:
                                    e = 1;
                                    break;
                                default:
                                    e = Math.random() > .5 ? 1 : -1
                            }
                    }
                    oSym.addTask(1, arguments.callee, [z, y, z.AttackedLX + 20, z.AttackedRX + 20, z.pixelLeft + 20, x, e, g, b])
                } else {
                    switch (e) {
                        case 1:
                            z.pixelBottom + 2 > b && (e = -1);
                            break;
                        case -1:
                            z.pixelBottom - 2 < g && (e = 1);
                            break
                    }
                    q > y ? z.Die() : (i = GetC(z.pixelRight += 2), z.AttackedLX = q += 2, z.AttackedRX = r += 2, w = GetR(z.pixelBottom += e * 2), SetStyle(x, {
                        left: (z.pixelLeft = p += 2) + "px",
                        top: (z.pixelTop += e * 2) + "px"
                    }), w != a && (z.R = w, t = true, !z.CanAttack && (z.CanAttack = 1)), i != l && (z.C = i, t = true), t && (oGd.del({
                        R: a,
                        C: l,
                        PKind: 1
                    }), oGd.add(z, w + "_" + i + "_1")), oSym.addTask(1, arguments.callee, [z, y, z.AttackedLX, z.AttackedRX, z.pixelLeft, x, e, g, b]))
                }
            })(c, oS.W, c.AttackedLX, c.AttackedRX, c.pixelLeft, d, 0, GetY1Y2(1)[0], 600)
        }
    }),
    oHugeNutBowling = InheritO(oNutBowling, {
        EName: "oHugeNutBowling",
        CName: "巨型坚果保龄球",
        width: 142,
        height: 142,
        beAttackedPointL: 5,
        beAttackedPointR: 137,
        HP: 8e3,
        Stature: 1,
        PicArr: ["images/Card/Plants/HugeWallNut.png", "images/Plants/WallNut/2.gif", "images/Plants/WallNut/HugeWallNutRoll.gif"],
        PrivateBirth: function(a) {
            PlayAudio("bowling");
            (function(b, c, n, m, e, g) {
                var d = oZ.getArZ(n, m, e),
                    f = d.length,
                    k, j, l = b.R,
                    h = b.C;
                while (f--) {
                    (k = d[f]).getCrushed(b) && k.CrushDie()
                }
                n > c ? b.Die() : (j = GetC(b.pixelRight += 2), b.AttackedLX = n += 2, b.AttackedRX = m += 2, g.style.left = (b.pixelLeft += 2) + "px", j != h && (b.C = j, oGd.del({
                    R: l,
                    C: h,
                    PKind: 1
                }), oGd.add(b, l + "_" + j + "_1")), oSym.addTask(1, arguments.callee, [b, c, n, m, e, g]))
            })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id))
        }
    }),
    oBoomNutBowling = InheritO(oNutBowling, {
        EName: "oBoomNutBowling",
        CName: "爆炸坚果",
        PicArr: ["images/Card/Plants/BoomWallNut.png", "images/Plants/WallNut/1.gif", "images/Plants/WallNut/BoomWallNutRoll.gif", "images/Plants/CherryBomb/Boom.gif"],
        AudioArr: ["cherrybomb", "bowling"],
        PrivateBirth: function(a) {
            PlayAudio("bowling");
            (function(s, q, b, c, m) {
                var v = s.R,
                    p = s.C,
                    t, l;
                if ((t = oZ.getZ0(c, v)) && t.getCrushed(s)) {
                    var j = v > 2 ? v - 1 : 1,
                        g = v < oS.R ? v + 1 : oS.R,
                        u = s.pixelLeft - 80,
                        r = s.pixelLeft + 160,
                        e, k;
                    PlayAudio("cherrybomb");
                    do {
                        k = (e = oZ.getArZ(u, r, j)).length;
                        while (k--) {
                            e[k].ExplosionDie()
                        }
                    } while (j++ < g);
                    s.Die(1);
                    EditEle(m.childNodes[1], {
                        src: "images/Plants/CherryBomb/Boom.gif"
                    }, {
                        width: "213px",
                        height: "160px",
                        left: "-50px",
                        top: "-30px"
                    });
                    oSym.addTask(65, ClearChild, [m])
                } else {
                    b > q ? s.Die() : (l = GetC(s.pixelRight += 2), s.AttackedLX = b += 2, s.AttackedRX = c += 2, SetStyle(m, {
                        left: (s.pixelLeft += 2) + "px"
                    }), l != p && (s.C = l, oGd.del({
                        R: v,
                        C: p,
                        PKind: 1
                    }), oGd.add(s, v + "_" + l + "_1")), oSym.addTask(1, arguments.callee, [s, q, s.AttackedLX, s.AttackedRX, m]))
                }
            })(a, oS.W, a.AttackedLX, a.AttackedRX, $(a.id))
        }
    }),
    oTallNut = InheritO(oWallNut, {
        EName: "oTallNut",
        CName: "高坚果",
        width: 83,
        height: 119,
        beAttackedPointR: 63,
        SunNum: 125,
        HP: 8e3,
        coolTime: 24.5,
        PicArr: ["images/Card/Plants/TallNut.png", "images/Plants/TallNut/0.gif", "images/Plants/TallNut/TallNut.gif", "images/Plants/TallNut/TallnutCracked1.gif", "images/Plants/TallNut/TallnutCracked2.gif"],
        Tooltip: "不会被跳过的坚实壁垒",
        Produce: '高坚果是重型壁垒植物，而且不会被跳过。<p>韧性：<font color="#FF0000">非常高</font><br>特殊：<font color="#FF0000">不会被跨过或越过</font></p>人们想知道，坚果墙和高坚果是否在竞争。高</font><br>坚果以男中音的声调大声笑了。“我们之间怎么</font><br>会存在竞争关系？我们是哥们儿。你知道坚果墙</font><br>为我做了什么吗……”高坚果的声音越来越小，</font><br>他狡黠地笑着。”',
        CanGrow: function(c, b, f) {
            var a = b + "_" + f,
                d = c[1],
                e = oS.ArP;
            return e ? oGd.$LF[b] == 1 ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d : d && d.EName == "oTallNut" ? 1 : oGd.$LF[b] == 1 ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d
        },
        Stature: 1,
        getHurt: function(e, b, a) {
            var c = this,
                d = $(c.id).childNodes[1];
            !(b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 2667 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/Plants/TallNut/TallnutCracked2.gif") : c.HP < 5333 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/Plants/TallNut/TallnutCracked1.gif"): c.Die(1)
        }
    }),
    oTenManNut = InheritO(CPlants, {
        EName: "oTenManNut",
        CName: "藤蔓坚果",
        width: 155,
        height: 130,
        beAttackedPointL: 63,
        beAttackedPointR: 75,
        SunNum: 150,
        HP: 11e3,
        Stature: 1,
        canEat: 1,
        PicArr: ["images/Card/Plants/TenManNut.png", "images/Plants/TenManNut/0.gif", "images/Plants/TenManNut/Spikeweed.gif"],
        Attack: 40,
        ArZ: {},
        Tooltip: "能近距离攻击僵尸",
        Produce: '能近距离攻击僵尸<p>伤害：<font color="#FF0000">普通</font><br>强度：<font color="#FF0000">非常高</font></p>大家一直在质疑高坚果和坚果的特殊关系，直</font><br>到高坚果找到了属于他的藤蔓，这种谣言才不</font><br>攻自散。',
        getHurt: function(f, c, b) {
            var e = this,
                d, a = $(e.id).childNodes[1];
            switch (c) {
                case 2:
                    f.flatTire();
                    break;
                case 1:
                    f.getHit2(f, 40, 0)
            }
            switch (true) {
                case (d = e.HP -= b) < 1:
                    e.Die();
                    break;
                case d < 101:
                    a.src = "images/Plants/TenManNut/Spikeweed.gif";
                    break;
                case d < 201:
                    a.src = "images/Plants/TenManNut/Spikeweed.gif"
            }
        },
        NormalAttack: function(b, a) {
            var c = $Z[b];
            c.getHit2(c, this.Attack, 0)
        },
        getTriggerRange: function(a, b, c) {
            return [
                [this.pixelLeft - 80, this.pixelRight + 80, 0]
            ]
        },
        TriggerCheck: function(i, h) {
            var c = i.id,
                g = this.ArZ,
                a, b, e, f;
            i.PZ && !g[c] && (a = i.AttackedLX, b = i.AttackedRX, e = this.AttackedLX, f = this.AttackedRX, a <= f && a >= e || b <= f && b >= e || a <= e && b >= f) && this.AttackCheck2(i) && (g[c] = 1, this.NormalAttack(c), oSym.addTask(100, function(d, j) {
                var k = $P[d];
                k && delete k.ArZ[j]
            }, [this.id, c]))
        },
        AttackCheck2: function(a) {
            return a.Altitude == 1 && a.beAttacked
        }
    }),
    oCherryBomb = InheritO(CPlants, {
        EName: "oCherryBomb",
        CName: "樱桃炸弹",
        width: 112,
        height: 81,
        beAttackedPointR: 92,
        SunNum: 150,
        coolTime: 20,
        PicArr: ["images/Card/Plants/CherryBomb.png", "images/Plants/CherryBomb/0.gif", "images/Plants/CherryBomb/CherryBomb.gif", "images/Plants/CherryBomb/Boom.gif" + $Random],
        AudioArr: ["cherrybomb"],
        Tooltip: "炸掉一定区域内的所有僵尸",
        Produce: '樱桃炸弹，能炸掉一定区域内所有僵尸。他们</font><br>一种下就会立刻引爆。所以请把他们种在僵尸</font><br>们的身边。<p>伤害：<font color="#FF0000">巨大</font><br>范围：<font color="#FF0000">一个中等区域内的所有僵尸</font><br>使用方法：<font color="#FF0000">单独使用，立即爆炸</font></p>“我要‘爆’开了。”樱桃一号说。“不，我们是</font><br>‘炸’开了！”它哥哥樱桃二号说。经过激烈的商</font><br>议之后，他们才统一“爆炸这个说法。”',
        InitTrigger: function() {},
        getHurt: function() {},
        PrivateBirth: function(a) {
            oSym.addTask(40, function(b) {
                var c = $P[b];
                if (c) {
                    PlayAudio("cherrybomb");
                    var f = $(b),
                        j = c.R,
                        g = j > 2 ? j - 1 : 1,
                        e = j < oS.R ? j + 1 : oS.R,
                        l = c.pixelLeft - 80,
                        k = c.pixelLeft + 160,
                        d, h;
                    do {
                        h = (d = oZ.getArZ(l, k, g)).length;
                        while (h--) {
                            d[h].getExplosion()
                        }
                    } while (g++ < e);
                    c.Die(1);
                    EditEle(f.childNodes[1], {
                        src: c.PicArr[3] + Math.random()
                    }, {
                        width: "213px",
                        height: "196px",
                        left: "-50px",
                        top: "-37px"
                    });
                    oSym.addTask(120, ClearChild, [f])
                }
            }, [a.id])
        }
    }),
    oJalapeno = InheritO(oCherryBomb, {
        EName: "oJalapeno",
        CName: "火爆辣椒",
        width: 68,
        height: 89,
        SunNum: 125,
        beAttackedPointR: 48,
        PicArr: ["images/Card/Plants/Jalapeno.png", "images/Plants/Jalapeno/0.gif", "images/Plants/Jalapeno/Jalapeno.gif", "images/Plants/Jalapeno/JalapenoAttack.gif"],
        AudioArr: ["jalapeno"],
        Tooltip: "消灭整行的敌人",
        Produce: '火爆辣椒可以摧毁一整条线上的敌人。<p>伤害：<font color="#FF0000">极高</font><br>范围：<font color="#FF0000">整条线上的僵尸</font><br>用法：<font color="#FF0000">单独使用，立即生效</font></p>“嘎嘎嘎嘎嘎嘎嘎！！！”火爆辣椒说。他现在</font><br>不会爆炸，还不到时候，不过快了，喔~，快了快</font><br>了，快来了。他知道，他感受到了，他一生都是</font><br>在等待这个时刻！',
        PrivateBirth: function(a) {
            oSym.addTask(40, function(j) {
                var h = $P[j];
                if (h) {
                    PlayAudio("jalapeno");
                    var b = $(j),
                        f = h.R,
                        c = oZ.getArZ(100, oS.W, f),
                        e = c.length,
                        g = oGd.$Ice[f],
                        d = oGd.$Crater;
                    while (e--) {
                        c[e].getExplosion()
                    }
                    h.Die(1);
                    EditEle(b.childNodes[1], {
                        src: "images/Plants/Jalapeno/JalapenoAttack.gif"
                    }, {
                        width: "755px",
                        height: "131px",
                        left: 120 - h.pixelLeft + "px",
                        top: "-42px"
                    });
                    oSym.addTask(135, ClearChild, [b]);
                    ClearChild($("dIceCar" + f));
                    if (g) {
                        for (e = g[1]; e < 11; e++) {
                            delete d[f + "_" + e]
                        }
                    }
                }
            }, [a.id])
        }
    }),
    oSpikeweed = InheritO(CPlants, {
        EName: "oSpikeweed",
        CName: "地刺",
        width: 85,
        height: 35,
        beAttackedPointL: 10,
        beAttackedPointR: 75,
        SunNum: 100,
        Stature: -1,
        canEat: 0,
        PicArr: ["images/Card/Plants/Spikeweed.png", "images/Plants/Spikeweed/0.gif", "images/Plants/Spikeweed/Spikeweed.gif"],
        Attack: 20,
        ArZ: {},
        Tooltip: "扎破轮胎, 也能伤害走在上面的僵尸",
        Produce: '地刺可以扎破轮胎，并对踩到他的僵尸造成伤</font><br>害<p>伤害：<font color="#FF0000">普通</font><br>范围：<font color="#FF0000">所有踩到他的僵尸</font><br>特点：<font color="#FF0000">不会被僵尸吃掉</font></p>地刺痴迷冰球，他买了包厢的季票。他一直关</font><br>注着他喜欢的球员，他也始终如一的在赛后清理</font><br>冰球场。但只有一个问题：他害怕冰球。',
        CanGrow: function(c, b, e) {
            var a = b + "_" + e,
                d = oS.ArP;
            return d ? e > 0 && e < d.ArC[1] && oGd.$LF[b] == 1 && !(c[1] || c[0]) : !(e < 1 || e > 9 || oGd.$LF[b] - 1 || c[1] || c[0] || oGd.$Crater[a] || oGd.$Tombstones[a])
        },
        getHurt: function(d, b, a) {
            var c = this;
            switch (b) {
                case 2:
                    d.flatTire();
                    c.Die();
                    break;
                case 1:
                    d.getHit2(d, 20, 0);
                    c.Die();
                    break;
                default:
                    (c.HP -= a) < 1 && c.Die()
            }
        },
        NormalAttack: function(b, a) {
            var c = $Z[b];
            c.getHit2(c, this.Attack, 0)
        },
        GetDY: function(b, c, a) {
            return -2
        },
        getTriggerRange: function(a, b, c) {
            return [
                [this.pixelLeft - 80, this.pixelRight + 80, 0]
            ]
        },
        TriggerCheck: function(i, h) {
            var c = i.id,
                g = this.ArZ,
                a, b, e, f;
            i.PZ && !g[c] && (a = i.AttackedLX, b = i.AttackedRX, e = this.AttackedLX, f = this.AttackedRX, a <= f && a >= e || b <= f && b >= e || a <= e && b >= f) && this.AttackCheck2(i) && (g[c] = 1, this.NormalAttack(c), oSym.addTask(100, function(d, j) {
                var k = $P[d];
                k && delete k.ArZ[j]
            }, [this.id, c]))
        },
        AttackCheck2: function(a) {
            return a.Altitude == 1 && a.beAttacked
        }
    }),
    oSpikerock = InheritO(oSpikeweed, {
        EName: "oSpikerock",
        CName: "地刺王",
        width: 84,
        height: 43,
        beAttackedPointL: 10,
        beAttackedPointR: 74,
        SunNum: 125,
        PicArr: ["images/Card/Plants/Spikerock.png", "images/Plants/Spikerock/0.gif", "images/Plants/Spikerock/Spikerock.gif", "images/Plants/Spikerock/2.gif", "images/Plants/Spikerock/3.gif"],
        Attack: 40,
        Tooltip: "能扎破多个轮胎, 并伤害经过上面的僵尸",
        Produce: '地刺王可以扎破多个轮胎，并对踩到他的僵尸</font><br>造成伤害。<p><font color="#FF0000">可以种植在地刺上</font></p>地刺王刚刚从欧洲旅行回来。他玩的很高兴，</font><br>也认识了很多有趣的人。这些都真的拓展了他</font><br>视野——他从来不知道，他们建造了这么大博</font><br>物馆，有这么多的画作。这对他说太惊奇了。',
        CanGrow: function(c, b, e) {
            var a = b + "_" + e,
                d = oS.ArP;
            return d ? e > 0 && e < d.ArC[1] && oGd.$LF[b] == 1 && !(c[1] || c[0]) : !(e < 1 || e > 9 || oGd.$LF[b] - 1 || c[1] || c[0] || oGd.$Crater[a] || oGd.$Tombstones[a])
        },
        GetDY: function(b, c, a) {
            return 0
        },
        getHurt: function(f, c, b) {
            var e = this,
                d, a = $(e.id).childNodes[1];
            switch (c) {
                case 2:
                    f.flatTire();
                    break;
                case 1:
                    f.getHit2(f, 40, 0)
            }
            switch (true) {
                case (d = e.HP -= b) < 1:
                    e.Die();
                    break;
                case d < 101:
                    a.src = "images/Plants/Spikerock/3.gif";
                    break;
                case d < 201:
                    a.src = "images/Plants/Spikerock/2.gif"
            }
        }
    }),
    oGarlic = InheritO(CPlants, {
        EName: "oGarlic",
        CName: "大蒜",
        width: 60,
        height: 59,
        beAttackedPointR: 40,
        SunNum: 50,
        HP: 400,
        PicArr: ["images/Card/Plants/Garlic.png", "images/Plants/Garlic/0.gif", "images/Plants/Garlic/Garlic.gif", "images/Plants/Garlic/Garlic_body2.gif", "images/Plants/Garlic/Garlic_body3.gif"],
        Tooltip: "将僵尸赶到其它的横行",
        Produce: '大蒜可以让僵尸改变前进的路线。<p>范围：<font color="#FF0000">近距离接触</font><br>特点：<font color="#FF0000">改变僵尸的前进路线</font></p>路线转向，这不仅仅是大蒜的专业，更是他</font><br>的热情所在。他在布鲁塞尔大学里，获得了转向</font><br>学的博士学位。他能把路线向量和反击阵列，讲</font><br>上一整天。他甚至会把家里的东西，推到街上去</font><br>。不知道为啥，他老婆还可以忍受这些。',
        CanGrow: function(c, b, f) {
            var a = b + "_" + f,
                d = c[1],
                e = oS.ArP;
            return e ? oGd.$LF[b] == 1 ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d : d && d.EName == "oGarlic" ? 1 : oGd.$LF[b] == 1 ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d
        },
        InitTrigger: function() {},
        HurtStatus: 0,
        getHurt: function(e, b, a) {
            var c = this,
                d = $(c.id).childNodes[1];
            !(b % 3) ? (c.HP -= 20) < 1 ? c.Die() : (e.ChangeR({
                R: c.R
            }), c.HP < 134 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/Plants/Garlic/Garlic_body3.gif") : c.HP < 267 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/Plants/Garlic/Garlic_body2.gif")): c.Die(1)
        }
    }),
    oSquash = InheritO(CPlants, {
        EName: "oSquash",
        CName: "窝瓜",
        width: 100,
        height: 226,
        beAttackedPointR: 67,
        SunNum: 50,
        PicArr: ["images/Card/Plants/Squash.png", "images/Plants/Squash/0.gif", "images/Plants/Squash/Squash.gif", "images/Plants/Squash/SquashAttack.gif", "images/Plants/Squash/SquashL.png", "images/Plants/Squash/SquashR.png"],
        AudioArr: ["squash_hmm", "gargantuar_thump"],
        Tooltip: "压扁接近的僵尸",
        Produce: '窝瓜会压扁第一个接近它的僵尸。<p>伤害：<font color="#FF0000">极高</font><br>范围：<font color="#FF0000">短，覆盖所有它压到的僵尸。</font><br>用法：<font color="#FF0000">单独使用</font></p>“我准备好了！”窝瓜大吼道，“干吧！！算我</font><br>一份！没人比我厉害！我就是你要的人！来啊！</font><br>等啥啊？要的就是这个！”',
        GetDY: function(b, c, a) {
            return a[0] ? -21 : -10
        },
        getHurt: function(d, b, a) {
            var c = this;
            b != 3 ? c.NormalAttack(c, d.id, d.ZX + d.Speed * 4 * (!d.WalkDirection ? -1 : 1) - 50) : (c.HP -= a) < 1 && c.Die()
        },
        getTriggerRange: function(a, b, c) {
            return [
                [b - 50, c + 80, 0]
            ]
        },
        TriggerCheck: function(h, g, e) {
            var c = h.ZX,
                b = this.id,
                a = $(b).childNodes[1],
                f = h.isAttacking;
            h.beAttacked && h.Altitude > -1 && h.Altitude < 2 && (f || !f && c - this.AttackedRX < 71) && (PlayAudio("squash_hmm"), oT.$[this.R].splice(e, 1), a.src = c > this.AttackedRX ? "images/Plants/Squash/SquashR.png" : "images/Plants/Squash/SquashL.png", oSym.addTask(100, function(d, j, i) {
                var k = $P[d];
                k && k.NormalAttack(k, h.id, i)
            }, [b, h.id, h.ZX + h.Speed * 4 * (!h.WalkDirection ? -1 : 1) - 50]))
        },
        NormalAttack: function(d, c, b) {
            var a = $(d.id),
                e = $Z[c];
            e && (b = e.ZX + e.Speed * 4 * (!e.WalkDirection ? -1 : 1) - 50);
            a.childNodes[1].src = "images/Plants/Squash/SquashAttack.gif" + $Random + Math.random();
            SetStyle(a, {
                left: b + "px"
            });
            d.Die(1);
            oSym.addTask(45, function(f, l, j) {
                PlayAudio("gargantuar_thump");
                var g = oZ.getArZ(l, l + 100, j),
                    h = g.length,
                    k;
                while (h--) {
                    (k = g[h]).Altitude > -1 && k.PZ && k.Altitude < 3 && k.getThump()
                }
                oSym.addTask(185, ClearChild, [f])
            }, [a, b, d.R])
        }
    }),
    oChomper = InheritO(CPlants, {
        EName: "oChomper",
        CName: "大嘴花",
        width: 130,
        height: 114,
        beAttackedPointR: 70,
        SunNum: 150,
        AudioArr: ["chomp"],
        PicArr: ["images/Card/Plants/Chomper.png", "images/Plants/Chomper/0.gif", "images/Plants/Chomper/Chomper.gif", "images/Plants/Chomper/ChomperAttack.gif", "images/Plants/Chomper/ChomperDigest.gif"],
        Tooltip: "能一口气吞下一只僵尸, 但处于咀嚼状态中十分脆弱",
        Produce: '大嘴花可以一口吞掉一整只僵尸，但是他们消</font><br>化僵尸的时候很脆弱。<p>伤害：<font color="#FF0000">巨大</font><br>范围：<font color="#FF0000">非常近</font><br>特点：<font color="#FF0000">消化时间很长</font></p>大嘴花几乎可以去“恐怖小店”，来表演它的绝</font><br>技了，不过他的经纪人压榨了他太多的钱，所</font><br>以他没去成。尽管如此，大嘴花没有怨言，只</font><br>说了句这只是交易的一部分。',
        GetDX: function() {
            return -40
        },
        getShadow: function(a) {
            return "top:" + (a.height - 22) + "px"
        },
        getTriggerRange: function(a, b, c) {
            return [
                [this.pixelLeft, c + 80, 0]
            ]
        },
        TriggerCheck: function(a) {
            this.AttackCheck2(a) && (this.canTrigger = 0, this.NormalAttack(this.id, a.id))
        },
        AttackCheck2: function(a) {
            return a.Altitude == 1 && a.beAttacked
        },
        NormalAttack: function(a, b) {
            eatFlower(a,b);
        }
    }),
    oChomperPea = InheritO(oPeashooter, {
        EName: "oChomperPea",
        CName: "豌豆大嘴花",
        PicArr: ["images/Card/Plants/ChomperPea.png", "images/Plants/ChomperPea/0.gif", "images/Plants/ChomperPea/Chomper.gif", "images/Plants/ChomperPea/ChomperAttack.gif", "images/Plants/ChomperPea/ChomperDigest.gif"],
        Tooltip: "超级大嘴花能一口气吞下一只僵尸, 并且咀嚼速度是普通大嘴花的50%",
        Produce: '超级大嘴花能一口气吞下一只僵尸, 并且咀嚼速</font><br>度是普通大嘴花的50%。<p>伤害：<font color="#FF0000">巨大</font><br>范围：<font color="#FF0000">非常近</font><br>特点：<font color="#FF0000">咀嚼时间短</font></p>超级大嘴花曾经是电视节目“超级大胃王”节</font><br>目的常客，但后来他被踢出了节目组，原因是</font><br>它的存在直接影响到观众的饮食量和节目收视</font><br>率。没办法，为了糊口他只得干起吞食僵尸行</font><br>动。',
        NormalAttack: function(a, b) {
            pea(this,function(a,d){
                //如果距离够近调用eatFlower函数
                if (Math.abs(a.AttackedLX - d.AttackedLX) < 100) {
                    // 如果子弹击中僵尸且距离足够近，调用eatFlower函数
                    eatFlower(a.id, d.id);
                }
            });
        }
    }),
    oMixChomperPea = InheritO(oPeashooter, {
        EName: "oMixChomperPea",
        CName: "超级豌豆大嘴花",
        PicArr: ["images/Card/Plants/ChomperPea.png", "images/Plants/ChomperPea/0.gif", "images/Plants/ChomperPea/Chomper.gif", "images/Plants/ChomperPea/ChomperAttack.gif", "images/Plants/ChomperPea/ChomperDigest.gif"],
        Tooltip: "超级大嘴花能一口气吞下一只僵尸, 并且咀嚼速度是普通大嘴花的50%",
        Produce: '超级大嘴花能一口气吞下一只僵尸, 并且咀嚼速</font><br>度是普通大嘴花的50%。<p>伤害：<font color="#FF0000">巨大</font><br>范围：<font color="#FF0000">非常近</font><br>特点：<font color="#FF0000">咀嚼时间短</font></p>超级大嘴花曾经是电视节目“超级大胃王”节</font><br>目的常客，但后来他被踢出了节目组，原因是</font><br>它的存在直接影响到观众的饮食量和节目收视</font><br>率。没办法，为了糊口他只得干起吞食僵尸行</font><br>动。',
        PrivateBirth: function(a) {
            a.BulletEle = NewImg(0, "images/Plants/PB10.gif", "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2))
        },
        NormalAttack1: oPeashooter.prototype.NormalAttack,
        NormalAttack: function(a, b) {
            pea(this,function(a,d){
                //如果距离够近调用eatFlower函数
                if (Math.abs(a.AttackedLX - d.AttackedLX) < 100) {
                    // 如果子弹击中僵尸且距离足够近，调用eatFlower函数
                    eatFlower(a.id, d.id);
                }
            });
            oSym.addTask(10, function(d, b) {
                var c = $P[d];
                c && c.NormalAttack1();
                --b && oSym.addTask(10, arguments.callee, [d, b])
            }, [this.id, 10])
        }
    }),
    oBigChomper = InheritO(oChomper, {
        EName: "oBigChomper",
        CName: "超级大嘴花",
        coolTime: 15,
        PicArr: ["images/Card/Plants/BigChomper.png", "images/Plants/BigChomper/0.gif", "images/Plants/BigChomper/Chomper.gif", "images/Plants/BigChomper/ChomperAttack.gif", "images/Plants/BigChomper/ChomperDigest.gif"],
        Tooltip: "超级大嘴花能一口气吞下一只僵尸, 并且咀嚼速度是普通大嘴花的50%",
        Produce: '超级大嘴花能一口气吞下一只僵尸, 并且咀嚼速</font><br>度是普通大嘴花的50%。<p>伤害：<font color="#FF0000">巨大</font><br>范围：<font color="#FF0000">非常近</font><br>特点：<font color="#FF0000">咀嚼时间短</font></p>超级大嘴花曾经是电视节目“超级大胃王”节</font><br>目的常客，但后来他被踢出了节目组，原因是</font><br>它的存在直接影响到观众的饮食量和节目收视</font><br>率。没办法，为了糊口他只得干起吞食僵尸行</font><br>动。',
        NormalAttack: function(a, b) {
            $(a).childNodes[1].src = "images/Plants/BigChomper/ChomperAttack.gif" + $Random + Math.random();
            oSym.addTask(70, function(c, d) {
                PlayAudio("chomp");
                $P[c] && oSym.addTask(9, function(e, f) {
                    var g = $P[e],
                        h;
                    g && ((h = $Z[f]) && h.beAttacked && h.PZ ? $(e).childNodes[1].src = h.getRaven(e) ? (oSym.addTask(2100, function(i) {
                        var j = $P[i];
                        j && (j.canTrigger = 1, $(i).childNodes[1].src = "images/Plants/BigChomper/Chomper.gif")
                    }, [e]), "images/Plants/BigChomper/ChomperDigest.gif") : (g.canTrigger = 1, "images/Plants/BigChomper/Chomper.gif") : oSym.addTask(9, function(i) {
                        var j = $P[i];
                        j && (j.canTrigger = 1, $(i).childNodes[1].src = "images/Plants/BigChomper/Chomper.gif")
                    }, [e]))
                }, [c, d])
            }, [a, b])
        }
    }),
    oFumeShroom = InheritO(CPlants, {
        EName: "oFumeShroom",
        CName: "大喷菇",
        width: 100,
        height: 88,
        beAttackedPointR: 80,
        SunNum: 75,
        BookHandBack: 2.5,
        SleepGif: 3,
        night: true,
        PicArr: ["images/Card/Plants/FumeShroom.png", "images/Plants/FumeShroom/0.gif", "images/Plants/FumeShroom/FumeShroom.gif", "images/Plants/FumeShroom/FumeShroomSleep.gif", "images/Plants/FumeShroom/FumeShroomAttack.gif", "images/Plants/FumeShroom/FumeShroomBullet.gif"],
        AudioArr: ["fume"],
        Tooltip: "喷射可以穿过门板的气液",
        Produce: '大喷菇喷出的臭气可以穿透铁丝网门。<p>伤害：<font color="#FF0000">普通，可穿透铁丝网门</font><br>范围：<font color="#FF0000">臭气中的所有僵尸<br>白天睡觉</font></p>“我以前那份没前途的工作，是为一个面包房</font><br>生产酵母孢，”大喷菇说。“然后小喷菇，上帝</font><br>保佑它，告诉了我这个喷杀僵尸的机会。现在</font><br>我真觉得自己完全不同了。”',
        GetDY: function(b, c, a) {
            return a[0] ? -18 : -10
        },
        GetDX: function() {
            return -45
        },
        BirthStyle: function(c, d, b, a) {
            oS.DKind && (c.canTrigger = 0, c.Sleep = 1, b.childNodes[1].src = c.PicArr[c.SleepGif]);
            EditEle(b, {
                id: d
            }, a, EDPZ)
        },
        PrivateBirth: function(b) {
            var a = b.id;
            NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/FumeShroom/FumeShroomBullet.gif);z-index:" + (b.zIndex + 1), 0, EDPZ)
        },
        PrivateDie: function(a) {
            ClearChild($(a.id + "_Bullet"))
        },
        getTriggerRange: function(a, b, c) {
            return [
                [b, Math.min(c + 330, oS.W), 0]
            ]
        },
        NormalAttack: function() {
            PlayAudio("fume");
            var f = this,
                d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 330, oS.W), f.R),
                e = d.length,
                g, c = f.id,
                b = $(c),
                a = c + "_Bullet";
            while (e--) {
                (g = d[e]).Altitude < 2 && g.getHit1(g, 20)
            }
            b.childNodes[1].src = "images/Plants/FumeShroom/FumeShroomAttack.gif";
            SetVisible($(a));
            ImgSpriter(a, c, [
                ["0 0", 9, 1],
                ["0 -62px", 9, 2],
                ["0 -124px", 9, 3],
                ["0 -186px", 9, 4],
                ["0 -248px", 9, 5],
                ["0 -310px", 9, 6],
                ["0 -372px", 9, 7],
                ["0 -434px", 9, -1]
            ], 0, function(i, j) {
                var h = $(j);
                $P[j] && (h.childNodes[1].src = "images/Plants/FumeShroom/FumeShroom.gif", SetHidden($(i)))
            })
        }
    }),
    oIceFumeShroom = InheritO(oFumeShroom, {
        EName: "oIceFumeShroom",
        CName: "寒冰大喷菇",
        PicArr: ["images/Card/Plants/FumeShroom.png", "images/Plants/FumeShroom/0.gif", "images/Plants/FumeShroom/FumeShroom.gif", "images/Plants/FumeShroom/FumeShroomSleep.gif", "images/Plants/FumeShroom/FumeShroomAttack.gif", "images/Plants/FumeShroom/FumeShroomBullet.gif"],
        Tooltip: "喷射可以穿过门板的气液",
        Produce: '大喷菇喷出的臭气可以穿透铁丝网门。<p>伤害：<font color="#FF0000">普通，可穿透铁丝网门</font><br>范围：<font color="#FF0000">臭气中的所有僵尸<br>白天睡觉</font></p>“我以前那份没前途的工作，是为一个面包房</font><br>生产酵母孢，”大喷菇说。“然后小喷菇，上帝</font><br>保佑它，告诉了我这个喷杀僵尸的机会。现在</font><br>我真觉得自己完全不同了。”',
        NormalAttack: function() {
            PlayAudio("fume");
            var f = this,
                d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 330, oS.W), f.R),
                e = d.length,
                g, c = f.id,
                b = $(c),
                a = c + "_Bullet";
            while (e--) {
                (g = d[e]).Altitude < 2 && g.getSnowPea(g, 20)
            }
            b.childNodes[1].src = "images/Plants/FumeShroom/FumeShroomAttack.gif";
            SetVisible($(a));
            ImgSpriter(a, c, [
                ["0 0", 9, 1],
                ["0 -62px", 9, 2],
                ["0 -124px", 9, 3],
                ["0 -186px", 9, 4],
                ["0 -248px", 9, 5],
                ["0 -310px", 9, 6],
                ["0 -372px", 9, 7],
                ["0 -434px", 9, -1]
            ], 0, function(i, j) {
                var h = $(j);
                $P[j] && (h.childNodes[1].src = "images/Plants/FumeShroom/FumeShroom.gif", SetHidden($(i)))
            })
        }
    }),
    oCoffeeBean = InheritO(CPlants, {
        EName: "oCoffeeBean",
        CName: "咖啡豆",
        width: 39,
        height: 97,
        beAttackedPointL: 10,
        beAttackedPointR: 29,
        SunNum: 75,
        PKind: 3,
        canEat: 0,
        PicArr: ["images/Card/Plants/CoffeeBean.png", "images/Plants/CoffeeBean/0.gif", "images/Plants/CoffeeBean/CoffeeBean.gif", "images/Plants/CoffeeBean/CoffeeBeanEat.gif" + $Random],
        AudioArr: ["coffee", "wakeup"],
        Tooltip: "咖啡豆，可以唤醒睡眠中的蘑菇们。",
        Produce: '咖啡豆，可以唤醒睡眠中的蘑菇们。<p>使用方法：<font color="#FF0000">单独使用，立即生效</font><br>特点：<font color="#FF0000">可以种在其他植物上，用来唤醒蘑菇们</font></p>咖啡豆：“嘿，伙计们！嘿，怎么回事？是谁？</font><br>嘿！你瞧见那个东西没？什么东西？哇！是狮子</font><br>！”嗯，咖啡豆确定，这样可以让自己很兴奋</font><br>。',
        InitTrigger: function() {},
        GetDBottom: function() {
            return 49
        },
        GetDY: function() {
            return -30
        },
        CanGrow: function(a, b) {
            return (b = a[1]) && b.Sleep && !a[3]
        },
        BirthStyle: function(c, d, b, a) {
            b.childNodes[1].src = this.PicArr[3] + Math.random();
            EditEle(b, {
                id: d
            }, a, EDPZ)
        },
        PrivateBirth: function(a) {
            SetHidden($(a.id).firstChild);
            PlayAudio("coffee");
            oSym.addTask(240, function(c) {
                PlayAudio("wakeup");
                var d = oGd.$[c],
                    b;
                d && (b = d.WakeUP, !b ? ($(d.id).childNodes[1].src = d.PicArr[d.NormalGif], d.canTrigger = 1, d.Sleep = 0) : b(d));
                a.Die()
            }, [a.R + "_" + a.C + "_1"])
        }
    }),
    oGloomShroom = InheritO(oFumeShroom, {
        EName: "oGloomShroom",
        CName: "忧郁菇",
        width: 112,
        height: 81,
        beAttackedPointR: 92,
        SunNum: 150,
        PicArr: ["images/Card/Plants/GloomShroom.png", "images/Plants/GloomShroom/0.gif", "images/Plants/GloomShroom/GloomShroom.gif", "images/Plants/GloomShroom/GloomShroomSleep.gif", "images/Plants/GloomShroom/GloomShroomAttack.gif", "images/Plants/GloomShroom/GloomShroomBullet.gif"],
        AudioArr: ["kernelpult", "kernelpult2"],
        Tooltip: "围绕自身释放大量孢子<br>",
        Produce: '围绕自身释放大量孢子<p><font color="#FF0000">可以种植在大喷菇上</font></p>“我喜欢喷射大量烟雾。”忧郁蘑菇说，“我</font><br>知道许多人不喜欢这样，他们说这又粗鲁啦烟</font><br>雾又很臭啦之类的，我只想说，你们想不想自</font><br>己的脑袋被僵尸吃掉？”',
        CanGrow: function(c, b, f) {
            var a = b + "_" + f,
                d = c[1],
                e = oS.ArP;
            return e ? oGd.$LF[b] == 1 ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d : d && d.EName == "oFumeShroom" ? 1 : oGd.$LF[b] == 1 ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d
        },
        BirthStyle: function(c, d, b, a) {
            oS.DKind && (c.canTrigger = 0, c.Sleep = 1, b.childNodes[1].src = c.PicArr[c.SleepGif]);
            EditEle(b, {
                id: d
            }, a, EDPZ)
        },
        GetDX: function() {
            return -58
        },
        PrivateBirth: function(b) {
            var a = b.id;
            NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:210px;height:200px;left:" + (b.pixelLeft - 60) + "px;top:" + (b.pixelTop - 65) + "px;background:url(images/Plants/GloomShroom/GloomShroomBullet.gif);z-index:" + (b.zIndex + 1), 0, EDPZ)
        },
        PrivateDie: function(a) {
            ClearChild($(a.id + "_Bullet"))
        },
        getTriggerRange: function(c, d, e) {
            var f = GetX(this.C),
                b = this.MinX = f - 120,
                a = this.MaxX = f + 120;
            return [
                [b, a, 0]
            ]
        },
        getTriggerR: function(c) {
            var b = this.MinR = c > 2 ? c - 1 : 1,
                a = this.MaxR = c < oS.R ? Number(c) + 1 : c;
            return [b, a]
        },
        NormalAttack: function() {
            var k = this,
                g, f = k.MaxR,
                c = k.MinX,
                b = k.MaxX,
                e, h, a, j = k.id,
                d = $(j),
                l = j + "_Bullet";
            for (g = k.MinR; g <= f; g++) {
                e = oZ.getArZ(c, b, g);
                for (h = e.length; h--;
                    (a = e[h]).Altitude < 2 && a.getHit1(a, 80)) {}
            }
            oSym.addTask(100, function(i) {
                PlayAudio(["kernelpult", "kernelpult2"][Math.floor(Math.random() * 2)]);
                --i && oSym.addTask(100, arguments.callee, [i])
            }, [4]);
            d.childNodes[1].src = "images/Plants/GloomShroom/GloomShroomAttack.gif";
            SetVisible($(l));
            ImgSpriter(l, j, [
                ["0 0", 9, 1],
                ["0 -200px", 9, 2],
                ["0 -400px", 9, 3],
                ["0 -600px", 9, 4],
                ["0 -800px", 9, 5],
                ["0 -1000px", 9, 6],
                ["0 -1200px", 9, 7],
                ["0 -1400px", 9, 8],
                ["0 -1600px", 9, 9],
                ["0 -1800px", 9, 10],
                ["0 -2000px", 9, 11],
                ["0 -2200px", 9, -1]
            ], 0, function(m, n) {
                var i = $(n);
                $P[n] && (i.childNodes[1].src = "images/Plants/GloomShroom/GloomShroom.gif");
                SetHidden($(m))
            })
        }
    }),
    oPuffShroom = InheritO(oFumeShroom, {
        EName: "oPuffShroom",
        CName: "小喷菇",
        width: 40,
        height: 66,
        beAttackedPointL: 15,
        beAttackedPointR: 25,
        SunNum: 0,
        Stature: -1,
        PicArr: ["images/Card/Plants/PuffShroom.png", "images/Plants/PuffShroom/0.gif", "images/Plants/PuffShroom/PuffShroom.gif", "images/Plants/PuffShroom/PuffShroomSleep.gif", "images/Plants/ShroomBullet.gif", "images/Plants/ShroomBulletHit.gif"],
        AudioArr: ["puff"],
        Tooltip: "向敌人发射短程孢子",
        Produce: '小喷菇是免费的，不过射程很近。<p>伤害：<font color="#FF0000">中等</font><br>范围：<font color="#FF0000">近<br>白天要睡觉</font></p>小喷菇：“我也是最近才知道僵尸的存在，和</font><br>很多蘑菇一样，我只是把他们想象成童话和电</font><br>影里的怪物。不过这次的经历已经让我大开眼</font><br>界了。',
        GetDX: CPlants.prototype.GetDX,
        getTriggerRange: function(a, b, c) {
            return [
                [b, Math.min(c + 250, oS.W), 0]
            ]
        },
        PrivateBirth: function(a) {
            a.BulletEle = NewImg(0, "images/Plants/ShroomBullet.gif", "left:" + (a.AttackedLX - 46) + "px;top:" + (a.pixelTop + 40) + "px;visibility:hidden;z-index:" + (a.zIndex + 2))
        },
        PrivateDie: function(a) {
            a.BulletEle = null
        },
        NormalAttack: function() {
            PlayAudio("puff");
            var b = this,
                c = "PSB" + Math.random(),
                a = b.AttackedLX;
            EditEle(b.BulletEle.cloneNode(false), {
                id: c
            }, 0, EDPZ);
            oSym.addTask(15, function(e) {
                var d = $(e);
                d && SetVisible(d)
            }, [c]);
            oSym.addTask(1, function(j, d, e, f, g) {
                var i = GetC(e),
                    h = oZ.getZ0(e, f);
                h && h.Altitude == 1 ? (h.getPea(h, 20, 0), SetStyle(d, {
                    left: g + 38 + "px"
                }).src = "images/Plants/ShroomBulletHit.gif", oSym.addTask(10, ClearChild, [d])) : (e += 5) < oS.W ? (d.style.left = (g += 5) + "px", oSym.addTask(1, arguments.callee, [j, d, e, f, g])) : ClearChild(d)
            }, [c, $(c), a, b.R, a - 46])
        }
    }),
    oScaredyShroom = InheritO(oFumeShroom, {
        EName: "oScaredyShroom",
        CName: "胆小菇",
        width: 57,
        height: 81,
        beAttackedPointR: 37,
        SunNum: 25,
        Cry: 0,
        ArZ: [],
        Attacking: 0,
        PicArr: ["images/Card/Plants/ScaredyShroom.png", "images/Plants/ScaredyShroom/0.gif", "images/Plants/ScaredyShroom/ScaredyShroom.gif", "images/Plants/ScaredyShroom/ScaredyShroomSleep.gif", "images/Plants/ScaredyShroom/ScaredyShroomCry.gif", "images/Plants/ShroomBullet.gif", "images/Plants/ShroomBulletHit.gif"],
        Tooltip: "远程射手, 但敌人靠近时会蜷缩不动",
        Produce: '胆小菇是一种远程射手，敌人接近后会躲起来。<p>伤害：<font color="#FF0000">普通</font><br>特点：<font color="#FF0000">敌人接近后就停止攻击<br>白天睡觉</font></p>“谁在那？”胆小菇低声说，声音细微难辨。“</font><br>走开！我不想见任何人。除非……除非你是马</font><br>戏团的人。”',
        GetDX: CPlants.prototype.GetDX,
        getTriggerRange: CPlants.prototype.getTriggerRange,
        getTriggerR: function(c) {
            var b = this.MinR = c > 2 ? c - 1 : 1,
                a = this.MaxR = c < oS.R ? Number(c) + 1 : c;
            return [b, a]
        },
        TriggerCheck: function(e, c) {
            var b = this,
                a = b.id;
            e.PZ && Math.abs(e.ZX - b.MX) < 121 && e.beAttacked ? (b.ArZ.push(e.id), !b.Cry && (b.Cry = 1, $(a).childNodes[1].src = "images/Plants/ScaredyShroom/ScaredyShroomCry.gif", b.CryCheck(a))) : e.R == b.R && !b.Cry && !b.Attacking && e.Altitude > 0 && e.Altitude < 3 && b.NormalAttack()
        },
        PrivateBirth: function(c) {
            var b = c.AttackedLX,
                a = b - 46;
            c.BulletClass = NewO({
                X: b,
                R: c.R,
                pixelLeft: a,
                F: oGd.MB2
            });
            c.BulletEle = NewImg(0, "images/Plants/ShroomBullet.gif", "left:" + a + "px;top:" + (c.pixelTop + 35) + "px;visibility:hidden;z-index:" + (c.zIndex + 2));
            c.MX = b + 9
        },
        PrivateDie: function(a) {
            a.BulletEle = null
        },
        NormalAttack: function() {
            var c = this,
                a = c.id,
                d = "SSB" + Math.random(),
                b = c.AttackedLX;
            EditEle(c.BulletEle.cloneNode(false), {
                id: d
            }, 0, EDPZ);
            oSym.addTask(1, function(k, e, f, g, h) {
                var j = GetC(f),
                    i = oZ.getZ0(f, g);
                i && i.Altitude == 1 ? (i.getPea(i, 20, 0), SetStyle(e, {
                    left: h + 38 + "px"
                }).src = "images/Plants/ShroomBulletHit.gif", oSym.addTask(10, ClearChild, [e])) : (f += 5) < oS.W ? (e.style.left = (h += 5) + "px", oSym.addTask(1, arguments.callee, [k, e, f, g, h])) : ClearChild(e)
            }, [d, $(d), b, c.R, b - 46]);
            c.Attacking = 1;
            oSym.addTask(10, function(g, e) {
                var f = $(g);
                f && SetVisible(f);
                oSym.addTask(130, function(h) {
                    var i = $P[h];
                    i && (i.Attacking = 0)
                }, [e])
            }, [d, a])
        },
        CryCheck: function(a) {
            oSym.addTask(140, function(b) {
                var d = $P[b],
                    c, f, e;
                if (d) {
                    c = (f = d.ArZ).length;
                    while (c--) {
                        (!(e = $Z[f[c]]) || !e.PZ || Math.abs(e.ZX - d.MX) > 120) && f.splice(c, 1)
                    }
                    f.length ? d.CryCheck(b) : (d.Cry = 0, $(b).childNodes[1].src = "images/Plants/ScaredyShroom/ScaredyShroom.gif")
                }
            }, [a])
        }
    }),
    oHypnoShroom = InheritO(oFumeShroom, {
        EName: "oHypnoShroom",
        CName: "魅惑菇",
        width: 71,
        height: 78,
        beAttackedPointL: 10,
        beAttackedPointR: 61,
        SunNum: 75,
        coolTime: 30,
        HP: 1,
        PicArr: ["images/Card/Plants/HypnoShroom.png", "images/Plants/HypnoShroom/0.gif", "images/Plants/HypnoShroom/HypnoShroom.gif", "images/Plants/HypnoShroom/HypnoShroomSleep.gif"],
        Tooltip: "让一只僵尸为你作战",
        Produce: '当僵尸吃下魅惑菇后，他将会掉转方向为你作</font><br>战。<p>使用方法：<font color="#FF0000">单独使用，接触生效</font><br>特点：<font color="#FF0000">让一只僵尸为你作战<br>白天睡觉</font></p>魅惑菇声称：“僵尸们是我们的朋友，他们被</font><br>严重误解了，僵尸们在我们的生态环境里扮演着</font><br>重要角色。我们可以也应当更努力地让他们学</font><br>会用我们的方式来思考。”',
        InitTrigger: function() {},
        getHurt: function(d, b, a) {
            var c = this;
            switch (b) {
                case 3:
                    (c.HP -= a) < 1 && c.Die();
                    break;
                case 0:
                    !c.Sleep && d.bedevil(d);
                    c.Die();
                    break;
                default:
                    c.Die(1)
            }
        }
    }),
    oIceShroom = InheritO(oFumeShroom, {
        EName: "oIceShroom",
        CName: "寒冰菇",
        width: 83,
        height: 75,
        beAttackedPointR: 63,
        SunNum: 75,
        coolTime: 50,
        PicArr: ["images/Card/Plants/IceShroom.png", "images/Plants/IceShroom/0.gif", "images/Plants/IceShroom/IceShroom.gif", "images/Plants/IceShroom/IceShroomSleep.gif", "images/Plants/IceShroom/Snow.gif", "images/Plants/IceShroom/icetrap.gif"],
        AudioArr: ["frozen", "wakeup"],
        Tooltip: "暂时使画面里的所有敌人停止行动",
        Produce: '寒冰菇，能短暂的冻结屏幕上所有僵尸。<p>伤害：<font color="#FF0000">非常低，冻结僵尸</font><br>范围：<font color="#FF0000">屏幕上的所有僵尸</font><br>用法：<font color="#FF0000">单独使用，立即生效<br>白天睡觉</font></p>寒冰菇皱着眉头，倒不是因为它不高兴或不满</font><br>意，只是因为，它儿时因受创伤而</font><br>遗留下了面瘫。',
        GetDX: CPlants.prototype.GetDX,
        GetDY: CPlants.prototype.GetDY,
        InitTrigger: function() {},
        PrivateDie: function(a) {},
        PrivateBirth: function(a) {
            !oS.DKind ? (a.NormalAttack(a.id), a.getHurt = function(d, c, b) {}) : a.getHurt = CPlants.prototype.getHurt
        },
        WakeUP: function(a) {
            var b = a.id;
            a.Sleep = 0;
            $(b).childNodes[1].src = "images/Plants/IceShroom/IceShroom.gif";
            a.NormalAttack(b)
        },
        NormalAttack: function(a) {
            oSym.addTask(100, function(c) {
                var f = $P[c];
                if (f) {
                    PlayAudio("frozen");
                    var e, d, b = "Snow_" + Math.random();
                    for (d in $Z) {
                        (e = $Z[d]).ZX < 901 && e.getFreeze(e, d)
                    }
                    oSym.addTask(40, function(g) {
                        ClearChild(g)
                    }, [NewEle(b, "div", "position:absolute;left:0;top:0;width:900px;height:600px;z-index:10;filter:alpha(opacity=50);opacity:.5;background:#9CF url(images/Plants/IceShroom/Snow.gif) no-repeat scroll " + (f.pixelLeft - 197) + "px " + (f.pixelTop - 80) + "px", 0, EDPZ)]);
                    f.Die()
                }
            }, [a])
        }
    }),
    oSunShroom = InheritO(oFumeShroom, {
        EName: "oSunShroom",
        CName: "阳光菇",
        width: 59,
        height: 61,
        beAttackedPointL: 15,
        beAttackedPointR: 44,
        SunNum: 25,
        Stature: -1,
        Status: 0,
        PicArr: ["images/Card/Plants/SunShroom.png", "images/Plants/SunShroom/0.gif", "images/Plants/SunShroom/SunShroom2.gif", "images/Plants/SunShroom/SunShroomSleep.gif", "images/Plants/SunShroom/SunShroom.gif"],
        Tooltip: "阳光菇开始提供少量阳光，稍后提供正常数量阳光。",
        Produce: '阳光菇开始提供少量阳光，稍后提供正常数量</font><br>阳光。<p>生产阳光：<font color="#FF0000">开始低，之后正常<br>白天睡觉</font></p>阳光菇讨厌阳光。恨到当它内部产生点阳光时</font><br>，就尽可能快的吐出来。它就是不能忍受这个</font><br>。对它来说，阳光令人厌恶。',
        GetDX: CPlants.prototype.GetDX,
        GetDY: CPlants.prototype.GetDY,
        InitTrigger: function() {},
        PrivateDie: function(a) {},
        PrivateBirth: function() {},
        BirthStyle: function(c, d, b, a) {
            oS.DKind ? (c.canTrigger = 0, c.Sleep = 1, b.childNodes[1].src = "images/Plants/SunShroom/SunShroomSleep.gif") : (oSym.addTask(600, function(h, g, f) {
                var e = $P[h];
                e && e.ProduceSun(e, g, f)
            }, [d, GetX(c.C) - 40, GetY(c.R)]), oSym.addTask(12e3, function(f) {
                var e = $P[f];
                e && (e.Sleep = 0, $(f).childNodes[1].src = "images/Plants/SunShroom/SunShroom.gif", e.Status = 1)
            }, [d]));
            EditEle(b, {
                id: d
            }, a, EDPZ)
        },
        ProduceSun: function(a, c, b) {
            AppearSun(Math.floor(c + Math.random() * 41), b, !a.Status ? 15 : 25, 0), oSym.addTask(2400, function(g, f, e) {
                var d = $P[g];
                d && d.ProduceSun(d, f, e)
            }, [a.id, c, b])
        },
        WakeUP: function(a) {
            var b = a.id;
            a.ProduceSun(a, GetX(a.C) - 40, GetY(a.R));
            $(b).childNodes[1].src = "images/Plants/SunShroom/SunShroom2.gif";
            a.Sleep = 0;
            oSym.addTask(12e3, function(d) {
                var c = $P[d];
                c && ($(d).childNodes[1].src = "images/Plants/SunShroom/SunShroom.gif", c.Status = 1)
            }, [b])
        }
    }),
    oDoomShroom = InheritO(oFumeShroom, {
        EName: "oDoomShroom",
        CName: "毁灭菇",
        width: 102,
        height: 91,
        beAttackedPointR: 80,
        coolTime: 50,
        SunNum: 125,
        AudioArr: ["doomshroom"],
        PicArr: ["images/Card/Plants/DoomShroom.png", "images/Plants/DoomShroom/0.gif", "images/Plants/DoomShroom/DoomShroom.gif", "images/Plants/DoomShroom/Sleep.gif", "images/Plants/DoomShroom/BeginBoom.gif", "images/Plants/DoomShroom/crater10.png", "images/Plants/DoomShroom/crater11.png", "images/Plants/DoomShroom/crater20.png", "images/Plants/DoomShroom/crater21.png", "images/Plants/DoomShroom/crater30.png", "images/Plants/DoomShroom/crater31.png", "images/Plants/DoomShroom/Boom.png"],
        Tooltip: "造成大规模的伤害, 但会在原地留下一个坑, 坑中无法种植物",
        Produce: '毁灭菇可以摧毁大范围的僵尸，并留下一个不</font><br>能种植物的大弹坑。<p>伤害：<font color="#FF0000">极高</font><br>范围：<font color="#FF0000">大范围内的所有僵尸</font><br>用法：<font color="#FF0000">单独使用，立即生效</font><br>特点：<font color="#FF0000">留下一个弹坑<br>白天睡觉</font></p>“你很幸运，我是和你一伙的，”毁灭菇说，“</font><br>我能摧毁任何你所珍视的东西，小菜一碟。”',
        InitTrigger: function() {},
        BirthStyle: function(c, d, b, a) {
            oS.DKind ? (c.Sleep = 1, b.childNodes[1].src = c.PicArr[c.SleepGif]) : (c.Sleep = 0, c.getHurt = function() {}, b.childNodes[1].src = "images/Plants/DoomShroom/BeginBoom.gif", c.NormalAttack(d));
            EditEle(b, {
                id: d
            }, a, EDPZ)
        },
        WakeUP: function(a) {
            var b = a.id;
            a.Sleep = 0;
            a.getHurt = function() {};
            $(b).childNodes[1].src = "images/Plants/DoomShroom/BeginBoom.gif";
            a.NormalAttack(b)
        },
        NormalAttack: function(a) {
            oSym.addTask(50, function(c) {
                PlayAudio("doomshroom");
                var d = $P[c],
                    q = c + "_Boom";
                if (d) {
                    var g = $(c),
                        l = d.R,
                        h = l > 3 ? l - 2 : 1,
                        f = Math.min(oS.R, l + 2),
                        n = d.pixelLeft - 240,
                        m = d.pixelRight + 240,
                        e, k, b = GetC(d.AttackedLX),
                        o, r = l + "_" + b,
                        j = oGd.$;
                    do {
                        k = (e = oZ.getArZ(n, m, h)).length;
                        while (k--) {
                            e[k].getExplosion()
                        }
                    } while (h++ < f);
                    d.Die();
                    (o = j[r + "_" + 0]) && o.Die();
                    (o = j[r + "_" + 2]) && o.Die();
                    oGd.$Crater[r] = 2;
                    NewEle(q, "div", "position:absolute;overflow:hidden;z-index:" + (d.zIndex + 2) + ";width:283px;height:324px;left:" + (d.pixelLeft - 80) + "px;top:" + (d.pixelTop - 220) + "px;background:url(images/Plants/DoomShroom/Boom.png) no-repeat", 0, EDPZ);
                    oSym.addTask(20, function(i) {
                        ClearChild(i)
                    }, [NewEle(q, "div", "position:absolute;z-index:20;width:900px;height:600px;left:0;top:0;background:#FFF;*filter:alpha(opacity=50);opacity:.5", 0, EDPZ)]);
                    ImgSpriter(q, c, [
                        ["0 0", 10, 1],
                        ["-283px 0", 10, 2],
                        ["-566px 0", 10, 3],
                        ["-849px 0", 10, 4],
                        ["-1132px 0", 10, 5],
                        ["-1415px 0", 10, 6],
                        ["-1698px 0", 10, 7],
                        ["-1981px 0", 10, 8],
                        ["-2264px 0", 10, 9],
                        ["-2547px 0", 10, -1]
                    ], 0, function(i, p) {
                        ClearChild($(i));
                        d.setCrater(c + "_crater", l, b, d.pixelLeft + 3, d.pixelTop + 50)
                    })
                }
            }, [a])
        },
        setCrater: function(f, b, d, e, c) {
            var a;
            switch (oGd.$LF[b]) {
                case 1:
                    a = NewEle(f, "div", "position:absolute;z-index:" + (3 * b - 1) + ";overflow:hidden;background:url(images/Plants/DoomShroom/crater1" + oS.DKind + ".png) no-repeat;width:90px;height:61px;left:" + (e || GetX(d) - 45) + "px;top:" + (c || GetY(b) - 30) + "px", 0, EDPZ);
                    break;
                case 2:
                    a = NewEle(f, "div", "position:absolute;z-index:" + (3 * b - 1) + ";overflow:hidden;background:url(images/Plants/DoomShroom/crater2" + oS.DKind + ".png) no-repeat;width:85px;height:53px;left:" + (e || GetX(d) - 42) + "px;top:" + (c || GetY(b) - 26) + "px", 0, EDPZ);
                    break;
                case 3:
                    a = NewEle(f, "div", "position:absolute;z-index:" + (3 * b - 1) + ";overflow:hidden;background:url(images/Plants/DoomShroom/crater31.png) no-repeat;width:75px;height:77px;left:" + (e || GetX(d) - 37) + "px;top:" + (c || GetY(b) - 19) + "px", 0, EDPZ);
                    break;
                default:
            }
            oSym.addTask(9e3, function(g) {
                var h = b + "_" + d;
                g.style.backgroundPosition = "100% 0";
                oGd.$Crater[h] = 1;
                oSym.addTask(9e3, function(i, j) {
                    ClearChild(i);
                    delete oGd.$Crater[j]
                }, [g, h])
            }, [a])
        }
    }),
    oTangleKlep = InheritO(CPlants, {
        EName: "oTangleKlep",
        CName: "缠绕水草",
        width: 90,
        height: 72,
        beAttackedPointL: 15,
        beAttackedPointR: 80,
        coolTime: 30,
        SunNum: 25,
        BookHandBack: 4.9,
        GetDY: function(b, c, a) {
            return 5
        },
        NormalGif: 1,
        AudioArr: ["TangleKlep"],
        PicArr: ["images/Card/Plants/TangleKlep.png", "images/Plants/TangleKlep/0.gif", "images/Plants/TangleKlep/Float.gif", "images/Plants/TangleKlep/Grab.png", "images/interface/splash.png"],
        Tooltip: "可以将僵尸拉入水底的水生植物",
        Produce: '缠绕水草是一种可以把接近他的僵尸拉进水中</font><br>的水生植物。<p>伤害：<font color="#FF0000">极高</font><br>用法：<font color="#FF0000">单独使用，接触后生效</font><br>特点：<font color="#FF0000">必须种在水中</font></p>“我是完全隐形的，”缠绕水草自己想，“我就</font><br>藏在水面下，没人会看到我。”他的朋友告诉他</font><br>，他们可以清楚地看到他。不过，缠绕水草似</font><br>乎不想改变自己的看法。',
        CanGrow: function(c, b, d) {
            var a = b + "_" + d;
            return !(oGd.$LF[b] != 2 || d < 1 || d > 9 || oGd.$Crater[a] || c[0] || c[1] || oGd.$Tombstones[a])
        },
        getShadow: function(a) {
            return "display:none"
        },
        getTriggerRange: function(a, b, c) {
            return [
                [b, c, 0]
            ]
        },
        BirthStyle: function(c, d, b, a) {
            b.childNodes[1].src = "images/Plants/TangleKlep/Float.gif";
            EditEle(b, {
                id: d
            }, a, EDPZ)
        },
        getHurt: function(d, b, a) {
            var c = this;
            b == 3 ? (c.HP -= a) < 1 && c.Die() : (c.canTrigger = 0, c.NormalAttack(c, d))
        },
        TriggerCheck: function(b, a) {
            b.AttackedLX < GetX(9) && b.beAttacked && (this.canTrigger = 0, this.NormalAttack(this, b))
        },
        NormalAttack: function(a, b) {
            a.getHurt = function() {};
            b.getHurt = function() {};
            b.beAttacked = 0;
            b.isAttacking = 1;
            NewImg(0, "images/Plants/TangleKlep/Grab.png", "left:" + b.beAttackedPointL + "px;top:" + (b.height - 67) + "px", b.Ele);
            oSym.addTask(50, function(g, h) {
                PlayAudio("TangleKlep");
                var e = g.id,
                    f = h.id,
                    d = e + "_splash",
                    c = f + "_splash";
                NewEle(d, "div", "position:absolute;background:url(images/interface/splash.png);left:" + (g.pixelLeft - 4) + "px;top:" + (g.pixelTop - 16) + "px;width:97px;height:88px;over-flow:hidden", 0, EDPZ);
                NewEle(c, "div", "position:absolute;background:url(images/interface/splash.png);left:" + (h.AttackedLX - 10) + "px;top:" + (h.pixelTop + h.height - 88) + "px;width:97px;height:88px;over-flow:hidden", 0, EDPZ);
                ImgSpriter(d, e, [
                    ["0 0", 9, 1],
                    ["-97px 0", 9, 2],
                    ["-194px 0", 9, 3],
                    ["-291px 0", 9, 4],
                    ["-388px 0", 9, 5],
                    ["-485px 0", 9, 6],
                    ["-582px 0", 9, 7],
                    ["-679px 0", 9, -1]
                ], 0, function(i, j) {
                    ClearChild($(i))
                });
                ImgSpriter(c, f, [
                    ["0 0", 9, 1],
                    ["-97px 0", 9, 2],
                    ["-194px 0", 9, 3],
                    ["-291px 0", 9, 4],
                    ["-388px 0", 9, 5],
                    ["-485px 0", 9, 6],
                    ["-582px 0", 9, 7],
                    ["-679px 0", 9, -1]
                ], 0, function(i, j) {
                    ClearChild($(i))
                });
                h.DisappearDie();
                g.Die()
            }, [a, b])
        }
    }),
    oSeaShroom = InheritO(oPuffShroom, {
        EName: "oSeaShroom",
        CName: "海蘑菇",
        width: 48,
        height: 99,
        beAttackedPointL: 10,
        beAttackedPointR: 40,
        coolTime: 30,
        BookHandBack: 4.9,
        Sleep: 0,
        getShadow: function(a) {
            return "display:none"
        },
        PicArr: ["images/Card/Plants/SeaShroom.png", "images/Plants/SeaShroom/0.gif", "images/Plants/SeaShroom/SeaShroom.gif", "images/Plants/SeaShroom/SeaShroomSleep.gif", "images/Plants/ShroomBullet.gif", "images/Plants/ShroomBulletHit.gif"],
        CanGrow: function(c, b, d) {
            var a = b + "_" + d;
            return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a] || oGd.$Tombstones[a])
        },
        BirthStyle: function(c, d, b, a) {
            EditEle(b, {
                id: d
            }, a, EDPZ)
        },
        Tooltip: "发射短距离孢子的水生植物",
        Produce: '海蘑菇，能够发射短程孢子的水生植物。<p>伤害：<font color="#FF0000">普通</font><br>射程：<font color="#FF0000">短<br>必须种在水上</font></p>海蘑菇从来没看到过大海，大海就在他的名字</font><br>里，他总听到关于大海的事。他只是没找到合适的</font><br>时间，总有一天……是的，他会见到海的。'
    });
oCactus = InheritO(CPlants, {
    EName: "oCactus",
    CName: "仙人掌",
    width: 122,
    height: 157,
    SunNum: 125,
    beAttackedPointL: 10,
    beAttackedPointR: 80,
    AudioArr: ["plantgrow"],
    Status: 0,
    PicArr: function() {
        return ["images/Card/Plants/Cactus.png", "images/Plants/Cactus/0.gif", "images/Plants/Cactus/Cactus.gif", "images/Plants/Cactus/Cactus2.gif", "images/Plants/Cactus/Attack.gif", "images/Plants/Cactus/Attack2.gif", "images/Plants/Cactus/Elongation.gif", "images/Plants/Cactus/Shorten.gif", "images/Plants/Cactus/Projectile32.png"]
    }(),
    Tooltip: "能发射刺穿气球的子弹",
    Produce: '仙人掌发射的穿刺弹可以用来打击地面和空中</font><br>目标<p>伤害：<font color="#FF0000">中等</font><br>范围：<font color="#FF0000">地面和空中</font></p>确实，仙人掌非常“刺儿”，但是她的刺下，隐</font><br>藏着颗温柔的心，充满着爱和善良。她只是想拥</font><br>抱别人，和被别人拥抱。大多数人都做不到这点</font><br>，但是仙人掌她并不介意。她盯着一只铠甲鼠好</font><br>一阵子了，这次好像真的可以抱抱了。',
    getShadow: function(a) {
        return "left:3px;top:132px"
    },
    PrivateBirth: function(a) {
        a.ES = a.Elongation
    },
    TriggerCheck: function(b, a) {
        this.ES() && (this.canTrigger = 0, this.CheckLoop(b.id, a))
    },
    CheckLoop: function(b, c) {
        var a = this.id;
        this.NormalAttack(b);
        this.ES();
        this.Status == 0 && oSym.addTask(140, function(e, f, h) {
            var g;
            (g = $P[e]) && g.ES() && g.AttackCheck1(f, h)
        }, [a, b, c])
    },
    CheckLoop2: function(b, c) {
        var a = this.id;
        this.NormalAttack(b);
        this.ES();
        this.Status && oSym.addTask(150, function(e, f, h) {
            var g;
            (g = $P[e]) && g.ES() && g.AttackCheck12(f, h)
        }, [a, b, c])
    },
    AttackCheck1: function(g, f) {
        var b = this,
            c = b.oTrigger,
            a = $Z[g],
            h, e, k, j;
        if (a && a.PZ && (h = c[a.R])) {
            k = a.ZX;
            e = h.length;
            while (e--) {
                j = h[e];
                if (j[0] <= k && j[1] >= k && a.Altitude > 0) {
                    b.CheckLoop(g, j[2]);
                    return
                }
            }
        }
        b.canTrigger = 1
    },
    AttackCheck12: function(a, c) {
        var b = this;
        b.CheckLoop(a, c)
    },
    Elongation: function() {
        var a = this,
            b = a.id;
        if (!oGd.$Balloon[a.R] > 0) {
            return true
        } else {
            PlayAudio("plantgrow");
            a.canTrigger = 0;
            a.Status = 1;
            $(b).childNodes[1].src = "images/Plants/Cactus/Elongation.gif";
            oSym.addTask(1, function(e) {
                var d = $P[e],
                    c;
                if (d) {
                    d.NormalGif = 3;
                    $(e).childNodes[1].src = "images/Plants/Cactus/Cactus2.gif";
                    c = d.CheckLoop;
                    d.CheckLoop = d.CheckLoop2;
                    d.CheckLoop2 = c;
                    c = d.NormalAttack;
                    d.NormalAttack = d.NormalAttack2;
                    d.NormalAttack2 = c;
                    d.ES = d.Shorten;
                    d.canTrigger = 1
                }
            }, [b]);
            return false
        }
    },
    Shorten: function() {
        var a = this,
            b = a.id;
        if (oGd.$Balloon[a.R] > 0) {
            return true
        } else {
            a.canTrigger = 0;
            a.Status = 0;
            $(b).childNodes[1].src = "images/Plants/Cactus/Shorten.gif";
            oSym.addTask(1, function(e) {
                var d = $P[e],
                    c;
                if (d) {
                    d.NormalGif = 2;
                    $(e).childNodes[1].src = "images/Plants/Cactus/Cactus.gif";
                    c = d.CheckLoop;
                    d.CheckLoop = d.CheckLoop2;
                    d.CheckLoop2 = c;
                    c = d.NormalAttack;
                    d.NormalAttack = d.NormalAttack2;
                    d.NormalAttack2 = c;
                    d.ES = d.Elongation;
                    d.canTrigger = 1
                }
            }, [b]);
            return false
        }
    },
    NormalAttack: function() {
        var b = this,
            c = "CB" + Math.random(),
            a = b.id;
        $(a).childNodes[1].src = "images/Plants/Cactus/Attack.gif";
        oSym.addTask(40, function(e) {
            var d = $(e);
            d && (d.childNodes[1].src = "images/Plants/Cactus/Cactus.gif")
        }, [a]);
        NewImg(c, b.PicArr[8], "left:" + (b.AttackedRX + 25) + "px;top:" + (b.pixelTop + 103) + "px;visibility:hidden;z-index:" + (b.zIndex + 2), EDPZ);
        oSym.addTask(30, function(e) {
            var d = $(e);
            d && SetVisible(d)
        }, [c]);
        oSym.addTask(1, function(g, i, d, k, h, l) {
            var j, f = GetC(k),
                e = oZ["getZ" + d](k, h);
            e && e.Altitude == 1 ? (e.getPea(e, 30, d), ClearChild(i)) : (k += j = !d ? 5 : -5) < oS.W && k > 100 ? (i.style.left = (l += j) + "px", oSym.addTask(1, arguments.callee, [g, i, d, k, h, l])) : ClearChild(i)
        }, [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40])
    },
    NormalAttack2: function() {
        var b = this,
            c = "CB" + Math.random(),
            a = b.id;
        $(a).childNodes[1].src = "images/Plants/Cactus/Attack2.gif";
        oSym.addTask(50, function(e) {
            var d = $(e);
            d && (d.childNodes[1].src = "images/Plants/Cactus/Cactus2.gif")
        }, [a]);
        NewImg(c, b.PicArr[8], "left:" + (b.AttackedRX + 125) + "px;top:" + (b.pixelTop + 33) + "px;visibility:hidden;z-index:" + (b.zIndex + 2), EDPZ);
        oSym.addTask(20, function(e) {
            var d = $(e);
            d && SetVisible(d)
        }, [c]);
        oSym.addTask(1, function(g, i, d, k, h, l) {
            var j, f = GetC(k),
                e = oZ["getZ" + d](k, h);
            e && e.Altitude == 3 ? (e.getHit0(e, 20, d), e.Drop(), ClearChild(i)) : (k += j = !d ? 5 : -5) < oS.W && k > 100 ? (i.style.left = (l += j) + "px", oSym.addTask(1, arguments.callee, [g, i, d, k, h, l])) : ClearChild(i)
        }, [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40])
    }
}), oOxygen = InheritO(CPlants, {
    EName: "oOxygen",
    CName: "氧气藻",
    width: 73,
    height: 74,
    beAttackedPointR: 53,
    SunNum: 25,
    HP: 300,
    BookHandBack: 3.5,
    coolTime: 7.5,
    PicArr: ["images/Card/Plants/Oxygen.png", "images/Plants/Oxygen/0.gif", "images/Plants/Oxygen/Oxygen.gif"],
    Tooltip: "氧气藻可以提供氧气给地上的植物",
    Produce: '氧气藻可以提供氧气给地上的植物<p>韧性：<font color="FF0000">中</font><p><font color="#000000">范围：<font color="#1F470B">3x3</font></p>噗咕……氧气藻默默地吐着气泡，倒不是他愿</font><br>意一直吐，只怪他昨天喝了太多汽水。不过有传</font><br>言说，他除了吐气泡就不会别的了。',
    CanGrow: function(e, d, f) {
        var c = d + "_" + f,
            b = oGd.$LF[d],
            a = f < 1 || f > 9;
        return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0
    },
    NormalAttack: function() {},
    PrivateBirth: function(a) {
        var R = a.R,
            C = a.C,
            R1, C1, MaxR = oS.R,
            MaxC = oS.C,
            LF = oGd.$LF,
            LFR, _$ = oGd.$,
            rc;
        for (R1 = R - 1; R1 <= R + 1; R1++) {
            if (R1 > 0 && R1 <= MaxR) {
                LFR = LF[R];
                for (C1 = C - 1; C1 <= C + 1; C1++) {
                    if (C1 > 0 && C1 <= MaxC && (LFR == 1 || LFR == 3)) {
                        rc = R1 + "_" + C1 + "_";
                        !(_$[rc + 0] || _$[rc + 1] || _$[rc + 2]) && CustomSpecial(oOG, R1, C1)
                    }
                }
            }
        }
    }
}), oFlamesMushroom = InheritO(CPlants, {
    EName: "oFlamesMushroom",
    CName: "烈焰菇",
    width: 102,
    height: 91,
    beAttackedPointR: 80,
    SunNum: 200,
    HP: 4e3,
    BookHandBack: 2.5,
    coolTime: 30,
    PicArr: ["images/Card/Plants/FlamesMushroom.png", "images/Plants/FlamesMushroom/0.gif", "images/Plants/FlamesMushroom/FlamesMushroom.gif", "images/Plants/FlamesMushroom/FlamesMushroom1.gif", "images/Plants/FlamesMushroom/FlamesMushroom2.gif"],
    Tooltip: "烈焰菇可以召唤多个毁灭菇，嗨翻全场僵尸",
    Produce: '烈焰菇可以召唤多个毁灭菇，嗨翻全场僵尸<p>韧性：<font color="FF0000">高</font><p><font color="#000000">技能：<font color="#1F470B">在自身3x3范围内召唤8只毁灭菇</font></p>烈焰菇总是为自己的火焰感到反感，因为它们</font><br>总是伤害到自己的朋友。所以为了朋友，烈焰</font><br>菇到花园里找到了自己的归宿。',
    getHurt: function(e, b, a) {
        var c = this,
            d = $(c.id).childNodes[1];
        !(b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 2667 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/Plants/FlamesMushroom/FlamesMushroom2.gif") : c.HP < 5333 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/Plants/FlamesMushroom/FlamesMushroom1.gif"): c.Die(1)
    },
    NormalAttack: function() {},
    PrivateBirth: function(a) {
        var R = a.R,
            C = a.C,
            R1, C1, MaxR = oS.R,
            MaxC = oS.C,
            LF = oGd.$LF,
            LFR, _$ = oGd.$,
            rc;
        for (R1 = R - 1; R1 <= R + 1; R1++) {
            if (R1 > 0 && R1 <= MaxR) {
                LFR = LF[R];
                for (C1 = C - 1; C1 <= C + 1; C1++) {
                    if (C1 > 0 && C1 <= MaxC && (LFR == 1 || LFR == 3)) {
                        rc = R1 + "_" + C1 + "_";
                        !(_$[rc + 0] || _$[rc + 1] || _$[rc + 2]) && CustomSpecial(oDoomShroom, R1, C1)
                    }
                }
            }
        }
    }
}), oOG = InheritO(CPlants, {
    EName: "oOG",
    CName: "氧气",
    width: 72,
    height: 68,
    beAttackedPointR: 52,
    SunNum: 0,
    canEat: 0,
    BookHandBack: 5,
    PicArr: ["images/Card/Plants/Oxygen.png", "images/Plants/Oxygen/0.gif", "images/Plants/Oxygen/Oxygen1.gif"],
    PKind: 0,
    Stature: -1,
    GetDY: function(b, c, a) {
        return -15
    },
    getShadow: function(a) {
        return "display:none";
        return "left:" + (a.width * .5 - 20) + "px;top:" + (a.height - 22) + "px"
    },
    CanGrow: function(e, d, f) {
        var c = d + "_" + f,
            b = oGd.$LF[d],
            a = f < 1 || f > 9;
        return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0
    },
    Tooltip: "",
    Produce: "",
    InitTrigger: function() {}
}), oPlantern = InheritO(CPlants, {
    EName: "oPlantern",
    CName: "路灯花",
    width: 250,
    height: 242,
    beAttackedPointL: 105,
    beAttackedPointR: 145,
    canEat: 1,
    BookHandBack: 2.5,
    SunNum: 25,
    PicArr: ["images/Card/Plants/Plantern.png", "images/Plants/Plantern/0.gif", "images/Plants/Plantern/Plantern.gif"],
    Tooltip: "照亮一片区域, 让玩家可以看穿战场迷雾",
    Produce: '路灯花，能照亮一片区域，让你看清战场迷雾<p>范围：<font color="#FF0000">一片圆形区域</font><br>特点：<font color="#FF0000">使你看清战场迷雾</font></p>灯笼草拒绝科学，他只会埋头苦干。其他植物</font><br>吃的是光，挤出的是氧气。灯笼草吃的是黑暗，</font><br>挤出的却是光。对于他如何能产生光这件事，灯</font><br>笼草持谨慎态度。“我不会说这是‘巫术’，我</font><br>也不会使用‘黑暗力量’，我只是……我想我说</font><br>得够多的了。”',
    PrivateBirth: function(c) {
        var a = c.R,
            b = c.C;
        NewImg("", "", "filter:alpha(opacity=30);opacity:.3;left:0;top:0;z-index:" + c.zIndex, $(c.id));
        oS.HaveFog && oGd.GatherFog(a, b, 2, 3, 0)
    },
    InitTrigger: function() {},
    PrivateDie: function(c) {
        var a = c.R,
            b = c.C;
        delete oGd.$Plantern[a + "_" + b];
        oS.HaveFog && oGd.GatherFog(a, b, 2, 3, 1)
    },
    GetDY: function(b, c, a) {
        return a[0] ? 70 : 74
    },
    getShadow: function(a) {
        return "left:" + (a.width * .5 - 43) + "px;top:" + (a.height - 100) + "px"
    }
}), ostar = InheritO(CPlants, {
    EName: "ostar",
    CName: "海星果",
    width: 71,
    height: 71,
    beAttackedPointL: 10,
    beAttackedPointR: 61,
    SunNum: 75,
    HP: 4e3,
    canEat: 0,
    BookHandBack: 3.5,
    Tooltip: "海星果的触手可以轻易掀翻僵尸并造成混乱",
    Produce: '海星果的触手可以轻易掀翻僵尸并造成混乱<p>攻击：<font color="#FF0000">较大</font><br>路径：<font color="#FF0000">随机的撞击线</font></p>海星果永远保持着迷人的微笑，没人知道他那</font><br>么热爱转圈圈却不会头晕的秘密，有人说因为他</font><br>那双斗鸡眼只看一点才不会转晕。',
    PicArr: ["images/Card/Plants/star.png", "images/Plants/star/0.gif", "images/Plants/star/starRoll.gif"],
    AudioArr: ["bowling", "bowlingimpact", "bowlingimpact2"],
    CanAttack: 1,
    InitTrigger: function() {},
    getHurt: function() {},
    CanGrow: function(e, d, f) {
        var c = d + "_" + f,
            b = oGd.$LF[d],
            a = f < 1 || f > 9;
        return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0
    },
    NormalAttack: null,
    PrivateBirth: function(c) {
        var d = $(c.id);
        PlayAudio("bowling");
        (function(z, y, q, r, p, x, e, g, b) {
            var a = z.R,
                l = z.C,
                A, u, s, v = 0,
                w, i, t = false;
            if (z.CanAttack && (A = oZ.getZ0(r, a)) && A.getCrushed(z)) {
                u = A.id;
                PlayAudio(["bowlingimpact", "bowlingimpact2"][Math.floor(Math.random() * 2)]);
                switch (A.Ornaments) {
                    case 0:
                        A.NormalDie();
                        break;
                    case 1:
                        A.getHit0(A, Math.min(A.OrnHP, 900), 0);
                        break;
                    default:
                        z.side ? A.Normaldie() : A.CheckOrnHP(A, u, A.OrnHP, 400, A.PicArr, 0, 0, 0)
                }
                z.CanAttack = 0;
                switch (a) {
                    case oS.R:
                        e = -1;
                        break;
                    case 1:
                        e = 1;
                        break;
                    default:
                        switch (e) {
                            case 1:
                                e = -1;
                                break;
                            case -1:
                                e = 1;
                                break;
                            default:
                                e = Math.random() > .5 ? 1 : -1
                        }
                }
                oSym.addTask(1, arguments.callee, [z, y, z.AttackedLX + 20, z.AttackedRX + 20, z.pixelLeft + 20, x, e, g, b])
            } else {
                switch (e) {
                    case 1:
                        z.pixelBottom + 2 > b && (e = -1);
                        break;
                    case -1:
                        z.pixelBottom - 2 < g && (e = 1);
                        break
                }
                q > y ? z.Die() : (i = GetC(z.pixelRight += 2), z.AttackedLX = q += 2, z.AttackedRX = r += 2, w = GetR(z.pixelBottom += e * 2), SetStyle(x, {
                    left: (z.pixelLeft = p += 2) + "px",
                    top: (z.pixelTop += e * 2) + "px"
                }), w != a && (z.R = w, t = true, !z.CanAttack && (z.CanAttack = 1)), i != l && (z.C = i, t = true), t && (oGd.del({
                    R: a,
                    C: l,
                    PKind: 1
                }), oGd.add(z, w + "_" + i + "_1")), oSym.addTask(1, arguments.callee, [z, y, z.AttackedLX, z.AttackedRX, z.pixelLeft, x, e, g, b]))
            }
        })(c, oS.W, c.AttackedLX, c.AttackedRX, c.pixelLeft, d, 0, GetY1Y2(1)[0], 600)
    }
}), ostar1 = InheritO(oNutBowling, {
    EName: "ostar1",
    CName: "海星果1",
    width: 71,
    height: 71,
    beAttackedPointL: 10,
    beAttackedPointR: 61,
    SunNum: 75,
    coolTime: 50,
    HP: 0,
    canEat: 0,
    BookHandBack: 3,
    Stature: 1,
    PicArr: ["images/Card/Plants/star.png", "images/Plants/star/0.gif", "images/Plants/star/starRoll.gif"],
    Tooltip: "",
    Produce: "",
    PrivateBirth: function(a) {
        PlayAudio("bowling");
        (function(b, c, n, m, e, g) {
            var d = oZ.getArZ(n, m, e),
                f = d.length,
                k, j, l = b.R,
                h = b.C;
            while (f--) {
                (k = d[f]).getCrushed(b) && k.CrushDie()
            }
            n > c ? b.Die() : (j = GetC(b.pixelRight += 2), b.AttackedLX = n += 2, b.AttackedRX = m += 2, g.style.left = (b.pixelLeft += 2) + "px", j != h && (b.C = j, oGd.del({
                R: l,
                C: h,
                PKind: 1
            }), oGd.add(b, l + "_" + j + "_1")), oSym.addTask(1, arguments.callee, [b, c, n, m, e, g]))
        })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id))
    }
}), oGun = InheritO(oPuffShroom, {
    EName: "oGun",
    CName: "水枪草",
    Sleep: 0,
    width: 40,
    height: 66,
    beAttackedPointL: 15,
    beAttackedPointR: 25,
    BookHandBack: 3.5,
    SunNum: 0,
    PicArr: ["images/Card/Plants/gun.png", "images/Plants/gun/0.gif", "images/Plants/gun/SeaShroom.gif", "images/Plants/gun/SeaShroomSleep.gif", "images/Plants/gun/ShroomBullet.gif", "images/Plants/gun/ShroomBulletHit.gif"],
    CanGrow: function(e, d, f) {
        var c = d + "_" + f,
            b = oGd.$LF[d],
            a = f < 1 || f > 9;
        return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0
    },
    Tooltip: "轻型海底作战植物",
    Produce: '水枪草可以直接种在海底，但射程比较短。<p>伤害：<font color="#FF0000">小</font><br>射程：<font color="#FF0000">短</font></p>自从水枪草得到了绝世的吐纳秘籍之后一直在</font><br>不断地练习着，希望自己能够突破三米的射程。',
    PrivateBirth: function(a) {
        a.BulletEle = NewImg(0, "images/Plants/gun/ShroomBullet.gif", "left:" + (a.AttackedLX - 46) + "px;top:" + (a.pixelTop + 40) + "px;visibility:hidden;z-index:" + (a.zIndex + 2))
    },
    BirthStyle: function(c, d, b, a) {
        EditEle(b, {
            id: d
        }, a, EDPZ)
    },
    PrivateDie: function(a) {
        a.BulletEle = null
    },
    NormalAttack: function() {
        PlayAudio("puff");
        var b = this,
            c = "PSB" + Math.random(),
            a = b.AttackedLX;
        EditEle(b.BulletEle.cloneNode(false), {
            id: c
        }, 0, EDPZ);
        oSym.addTask(15, function(e) {
            var d = $(e);
            d && SetVisible(d)
        }, [c]);
        oSym.addTask(1, function(j, d, e, f, g) {
            var i = GetC(e),
                h = oZ.getZ0(e, f);
            h && h.Altitude == 1 ? (h.getPea(h, 20, 0), SetStyle(d, {
                left: g + 38 + "px"
            }).src = "images/Plants/gun/ShroomBulletHit.gif", oSym.addTask(10, ClearChild, [d])) : (e += 5) < oS.W ? (d.style.left = (g += 5) + "px", oSym.addTask(1, arguments.callee, [j, d, e, f, g])) : ClearChild(d)
        }, [c, $(c), a, b.R, a - 46])
    }
}), oSeaAnemone = InheritO(oGloomShroom, {
    EName: "oSeaAnemone",
    CName: "电海葵",
    width: 83,
    height: 119,
    beAttackedPointR: 63,
    SunNum: 300,
    coolTime: 15,
    BookHandBack: 3.5,
    AudioArr: ["SeaAnemone"],
    PicArr: ["images/Card/Plants/SeaAnemone.png", "images/Plants/SeaAnemone/0.gif", "images/Plants/SeaAnemone/GloomShroom.gif", "images/Plants/SeaAnemone/GloomShroomSleep.gif", "images/Plants/SeaAnemone/GloomShroomAttack.gif", "images/Plants/SeaAnemone/GloomShroomBullet.gif"],
    AudioArr: ["kernelpult", "kernelpult2"],
    Tooltip: "电海葵花可以对在他周围的僵尸造成巨大伤害<br>",
    Produce: "电海葵花可以对在他周围的僵尸造成巨大伤害</font></p>自信的电海葵花毫不畏惧任何困难，一头杀马</font><br>特式的发型是他引以为傲的事情，可他说这是上</font><br>次在村口找王师傅给剃的。",
    BirthStyle: function(c, d, b, a) {
        EditEle(b, {
            id: d
        }, a, EDPZ)
    },
    CanGrow: function(e, d, f) {
        var c = d + "_" + f,
            b = oGd.$LF[d],
            a = f < 1 || f > 9;
        return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0
    },
    PrivateBirth: function(b) {
        var a = b.id;
        NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:210px;height:200px;left:" + (b.pixelLeft - 60) + "px;top:" + (b.pixelTop - 65) + "px;background:url(images/Plants/SeaAnemone/GloomShroomBullet.gif);z-index:" + (b.zIndex + 1), 0, EDPZ)
    },
    NormalAttack: function() {
        PlayAudio("SeaAnemone");
        var k = this,
            g, f = k.MaxR,
            c = k.MinX,
            b = k.MaxX,
            e, h, a, j = k.id,
            d = $(j),
            l = j + "_Bullet";
        for (g = k.MinR; g <= f; g++) {
            e = oZ.getArZ(c, b, g);
            for (h = e.length; h--;
                (a = e[h]).Altitude < 2 && a.getHit1(a, 130)) {}
        }
        oSym.addTask(100, function(i) {
            PlayAudio(["kernelpult", "kernelpult2"][Math.floor(Math.random() * 2)]);
            --i && oSym.addTask(100, arguments.callee, [i])
        }, [4]);
        d.childNodes[1].src = "images/Plants/SeaAnemone/GloomShroomAttack.gif";
        SetVisible($(l));
        ImgSpriter(l, j, [
            ["0 0", 9, 1],
            ["0 -200px", 9, 2],
            ["0 -400px", 9, 3],
            ["0 -600px", 9, 4],
            ["0 -800px", 9, 5],
            ["0 -1000px", 9, 6],
            ["0 -1200px", 9, 7],
            ["0 -1400px", 9, 8],
            ["0 -1600px", 9, 9],
            ["0 -1800px", 9, 10],
            ["0 -2000px", 9, 11],
            ["0 -2200px", 9, -1]
        ], 0, function(m, n) {
            var i = $(n);
            $P[n] && (i.childNodes[1].src = "images/Plants/SeaAnemone/GloomShroom.gif");
            SetHidden($(m))
        })
    }
}), oTTS = InheritO(CPlants, {
    EName: "oTTS",
    CName: "荆棘海草",
    width: 75,
    height: 226,
    beAttackedPointR: 55,
    beAttackedPointR: 80,
    SunNum: 25,
    BookHandBack: 3.5,
    GetDY: function(b, c, a) {
        return 5
    },
    NormalGif: 1,
    AudioArr: ["TTS"],
    PicArr: ["images/Card/Plants/TTS.png", "images/Plants/TTS/0.gif", "images/Plants/TTS/Float.gif", "images/Plants/TTS/Grab.png", "images/Plants/TTS/splash.png"],
    Tooltip: "会用力抓住靠近他的任何东西",
    Produce: '荆棘海草会用力抓住靠近他的任何东西并拖入</font><br>地下。<p>伤害：<font color="FF0000">巨大</font><br>范围：<font color="#FF0000">一格</font><br>使用方法：<font color="#FF0000">一次性使用。</font></p>荆棘海草最近一次的表白又被捷足先登了，这</font><br>使他很伤心。不过很快他就重新振作起来并吸取</font><br>教训。一定要抓住机会！但他似乎对这句话理解</font><br>有误：他无论碰到什么都会死死地抓住。',
    CanGrow: function(e, d, f) {
        var c = d + "_" + f,
            b = oGd.$LF[d],
            a = f < 1 || f > 9;
        return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0
    },
    getTriggerRange: function(a, b, c) {
        return [
            [b, c, 0]
        ]
    },
    BirthStyle: function(c, d, b, a) {
        b.childNodes[1].src = "images/Plants/TTS/Float.gif";
        EditEle(b, {
            id: d
        }, a, EDPZ)
    },
    getHurt: function(d, b, a) {
        var c = this;
        b == 3 ? (c.HP -= a) < 1 && c.Die() : (c.canTrigger = 0, c.NormalAttack(c, d))
    },
    TriggerCheck: function(b, a) {
        b.AttackedLX < GetX(9) && b.beAttacked && (this.canTrigger = 0, this.NormalAttack(this, b))
    },
    NormalAttack: function(a, b) {
        PlayAudio("TTS");
        a.getHurt = function() {};
        b.getHurt = function() {};
        b.beAttacked = 0;
        b.isAttacking = 1;
        NewImg(0, "images/Plants/TTS/Grab.png", "left:" + b.beAttackedPointL + "px;top:" + (b.height - 67) + "px", b.Ele);
        oSym.addTask(50, function(g, h) {
            var e = g.id,
                f = h.id,
                d = e + "_splash",
                c = f + "_splash";
            NewEle(c, "div", "position:absolute;background:url(images/Plants/TTS/splash.png);left:" + (h.AttackedLX - 10) + "px;top:" + (h.pixelTop + h.height - 88) + "px;width:97px;height:88px;over-flow:hidden", 0, EDPZ);
            ImgSpriter(d, e, [
                ["0 0", 9, 1],
                ["-97px 0", 9, 2],
                ["-194px 0", 9, 3],
                ["-291px 0", 9, 4],
                ["-388px 0", 9, 5],
                ["-485px 0", 9, 6],
                ["-582px 0", 9, 7],
                ["-679px 0", 9, -1]
            ], 0, function(i, j) {
                ClearChild($(i))
            });
            ImgSpriter(c, f, [
                ["0 0", 9, 1],
                ["-97px 0", 9, 2],
                ["-194px 0", 9, 3],
                ["-291px 0", 9, 4],
                ["-388px 0", 9, 5],
                ["-485px 0", 9, 6],
                ["-582px 0", 9, 7],
                ["-679px 0", 9, -1]
            ], 0, function(i, j) {
                ClearChild($(i))
            });
            h.DisappearDie();
            g.Die()
        }, [a, b])
    }
}), oMagneticmuShroom = InheritO(CPlants, {
    EName: "oMagneticmuShroom",
    CName: "磁力菇",
    width: 176,
    height: 148,
    beAttackedPointR: 50,
    SunNum: 50,
    BookHandBack: 2.5,
    AudioArr: ["Magneticmu"],
    PicArr: ["images/Card/Plants/MagneticmuShroom.png", "images/Plants/MagneticmuShroom/0.gif", "images/Plants/MagneticmuShroom/Shrubbery.gif", "images/Plants/MagneticmuShroom/ShrubberyBoom.gif" + $Random],
    Tooltip: "磁力菇可以用磁力吸取僵尸的头盔等其它金属物品。",
    Produce: '磁力菇可以吸走周围僵尸的护具<p>范围：<font color="#FF0000">约一行</font><br>使用方法：<font color="#FF0000">安放即可使用（一次性）</font></p>磁力是一种强大的力量，非常强大，强大到有</font><br>时都吓到磁力菇自己了。能力越大，责任越大</font><br>，他不知道自己能否肩负得起这责任',
    InitTrigger: function() {},
    getHurt: function() {},
    PrivateBirth: function(a) {
        oSym.addTask(10, function(j) {
            var h = $P[j];
            if (h) {
                PlayAudio("Magneticmu");
                var b = $(j),
                    f = h.R,
                    c = oZ.getArZ(100, oS.W, f),
                    e = c.length,
                    g = oGd.$Ice[f],
                    d = oGd.$Crater;
                while (e--) {
                    if (c[e].EName == "oBucketheadZombie" || c[e].EName == "oFootballZombie" || c[e].EName == "oHeiFootballZombie" || c[e].EName == "oCFootballZombie" || c[e].EName == "oScreenDoorZombie" || c[e].EName == "oDuckyTubeZombie3" || c[e].EName == "oDuckyTubeZombie4" || c[e].EName == "oSmallFootballZombie" || c[e].EName == "oCBucketheadZombie" || c[e].EName == "oTrashZombie" || c[e].EName == "oCFootballZombie" || c[e].EName == "oConeheadZombie" || c[e].EName == "oCConeheadZombie" || c[e].EName == "oJY" || c[e].EName == "oBalloonZombie" || c[e].EName == "oNewspaperZombie" || c[e].EName == "oCNewspaperZombie" || c[e].EName == "oDuckyTubeZombie2") {
                        c[e].OrnHP = 0;
                        c[e].getHit0(c[e], 0, 0)
                    }
                }
                h.Die(1);
                EditEle(b.childNodes[1], {
                    src: "images/Plants/MagneticmuShroom/ShrubberyBoom.gif"
                }, {
                    width: "176px",
                    height: "148px",
                    left: "-1px",
                    top: "-1px"
                });
                oSym.addTask(220, ClearChild, [b])
            }
        }, [a.id])
    }
}), oLaserBean = InheritO(CPlants, {
    EName: "oLaserBean",
    CName: "激光蚕豆",
    width: 80,
    height: 80,
    beAttackedPointR: 80,
    SunNum: 75,
    SunNum: 450,
    coolTime: 30,
    HP: 4e3,
    PicArr: ["images/Card/Plants/LaserBean.png", "images/Plants/LaserPea/0.gif", "images/Plants/LaserPea/LaserPea.gif", "images/Plants/LaserPea/LaserPeaSleep.gif", "images/Plants/LaserPea/LaserPeaAttack.gif", "images/Plants/LaserPea/LaserPeaBullet.gif"],
    AudioArr: ["LaserBean"],
    Tooltip: "向一整排僵尸发射高火力激光。",
    Produce: '激光蚕豆向一整排僵尸发射激光<p>范围：<font color="#FF0000">一整排僵尸<p>本豆由上海宝开绘制<br></font><p><br>这位就是大名鼎鼎的激光豆。但是为什么他是</font><br>蚕豆？恐怕没人搞得清楚。',
    CheckLoop: function(b, c) {
        var a = this.id;
        this.NormalAttack(b);
        oSym.addTask(292, function(e, f, h) {
            var g;
            (g = $P[e]) && g.AttackCheck1(f, h)
        }, [a, b, c])
    },
    getShadow: function(a) {
        return "left:" + (a.width * .5 - +20) + "px;top:" + (a.height - 22) + "px"
    },
    GetDY: function(b, c, a) {
        return a[0] ? -18 : -10
    },
    GetDX: function() {
        return -68
    },
    PrivateBirth: function(b) {
        var a = b.id;
        NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/LaserPea/LaserPeaBullet.gif);z-index:" + (b.zIndex + 1), 0, EDPZ)
    },
    PrivateDie: function(a) {
        ClearChild($(a.id + "_Bullet"))
    },
    getTriggerRange: function(a, b, c) {
        return [
            [b, Math.min(c + 686, oS.W), 0]
        ]
    },
    NormalAttack: function() {
        PlayAudio("LaserBean");
        var f = this,
            d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 686, oS.W), f.R),
            e = d.length,
            g, c = f.id,
            b = $(c),
            a = c + "_Bullet";
        while (e--) {
            (g = d[e]).Altitude < 2 && g.getHit1(g, 850)
        }
        b.childNodes[1].src = "images/Plants/LaserPea/LaserPeaAttack.gif";
        SetVisible($(a));
        ImgSpriter(a, c, [
            ["0 0", 4, 1],
            ["0 -62px", 4, 2],
            ["0 -124px", 5, 3],
            ["0 -186px", 5, 4],
            ["0 -248px", 5, 5],
            ["0 -310px", 6, 6],
            ["0 -372px", 6, 7],
            ["0 -434px", 7, -1]
        ], 0, function(i, j) {
            var h = $(j);
            $P[j] && (h.childNodes[1].src = "images/Plants/LaserPea/LaserPea.gif", SetHidden($(i)))
        })
    }
}), oGoldenPrize = InheritO(CPlants, {
    EName: "oGoldenPrize",
    CName: "金葵花奖杯",
    PicArr: ["images/interface/0.gif", "images/interface/0.gif"],
    Tooltip: "恭喜你通过了本挑战关！"
}), oShovel = InheritO(CPlants, {
    EName: "oShovel",
    CName: "铲子",
    width: 130,
    height: 114,
    beAttackedPointR: 70,
    PicArr: ["images/interface/Shovel/0.gif", "images/interface/Shovel/0.gif"],
    Tooltip: "铲子可以移除植物！"
});
// pea 函数：创建并控制豌豆射手发射的子弹
// 参数 a: 发射子弹的植物对象
function pea(a,shootedFn) {
    // 为子弹生成随机ID
    b = "PB" + Math.random();

    // 克隆子弹元素并设置ID
    // EditEle 函数用于编辑DOM元素属性
    // a.BulletEle 是植物的子弹模板
    EditEle(a.BulletEle.cloneNode(false), {
        id: b
    }, 0, EDPZ);  // EDPZ 可能是放置子弹的容器

    // 15ms后使子弹可见
    oSym.addTask(15, function(d) {
        var c = $(d);  // 获取子弹DOM元素
        c && SetVisible(c)  // 如果元素存在，则设为可见
    }, [b]);

    // 1ms后开始子弹飞行逻辑
    oSym.addTask(1, function(f, j, h, c, n, i, m, k, o, g) {
        var l, e = GetC(n),  // 获取列数
            d = oZ["getZ" + c](n, i);  // 获取指定位置的僵尸
        // 检查是否经过火炬树桩转化为火球
        // m==0 表示普通豌豆，g[i + "_" + e]检查该位置是否有火炬树桩
        // k!=e 确保只在第一次经过时转换
        m == 0 && g[i + "_" + e] && k != e && (
            PlayAudio("firepea"),  // 播放火球音效
            m = 1,                 // m=1 表示火球
            h = 40,                // 伤害提升到40
            k = e,                 // 记录当前列
            j.src = "images/Plants/PB" + m + c + ".gif"  // 更新为火球图片
        );

        // 检查是否击中僵尸
        if (d && d.Altitude == 1) {  // Altitude==1 表示可被击中的僵尸
            // 根据子弹类型调用不同的伤害函数
            // m: -1=冰豌豆, 0=普通豌豆, 1=火豌豆
            d[{
                "-1": "getSnowPea",
                "0": "getPea",
                "1": "getFirePea"
            }[m]](d, h, c);
            if (shootedFn) {
                shootedFn(a, d);  // 调用传入的回调函数，传递植物ID和僵尸ID
            }
            // 显示子弹击中效果并在10ms后移除
            SetStyle(j, {
                left: o + 28 + "px"  // 调整击中效果位置
            }).src = ["images/Plants/PeaBulletHit.gif", "images/Plants/PeaBulletHit2.gif"][m];
            oSym.addTask(10, ClearChild, [j]);
        } else {
            // 子弹继续飞行
            // c为0表示向右飞行(正常方向)，为1表示向左飞行
            n += l = !c ? 5 : -5;

            // 检查子弹是否仍在有效范围内
            if (n < oS.W && n > 100) {
                // 更新子弹位置
                j.style.left = (o += l) + "px";
                // 递归调用自身，继续飞行
                oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g]);
            } else {
                // 超出范围，移除子弹
                ClearChild(j);
            }
        }
    }, [
        b,                    // 子弹ID
        $(b),                 // 子弹DOM元素
        20,                   // 初始伤害值
        0,                    // 飞行方向，0=向右
        a.AttackedLX,         // 子弹初始X坐标
        a.R,                  // 子弹所在行
        0,                    // 子弹类型，0=普通豌豆
        0,                    // 记录经过火炬的列
        a.AttackedLX - 40,    // 用于计算位置的初始值
        oGd.$Torch            // 火炬树桩位置信息
    ])
}
function eatFlower(a, b) {
    // 参数 a: 大嘴花植物的ID
    // 参数 b: 被攻击僵尸的ID

    // 立即播放大嘴花攻击动画（张嘴准备吞食）
    $(a).childNodes[1].src = "images/Plants/Chomper/ChomperAttack.gif" + $Random + Math.random();

    // 延迟70毫秒后执行吞食逻辑（等待攻击动画播放一段时间）
    oSym.addTask(70, function(c, d) {
        // c: 大嘴花植物ID, d: 僵尸ID

        // 播放"咀嚼"音效
        PlayAudio("chomp");

        // 检查植物是否仍然存在
        $P[c] && oSym.addTask(18, function(e, f) {
            // e: 大嘴花植物ID, f: 僵尸ID

            var g = $P[e],  // 获取大嘴花植物对象
                h;          // 僵尸对象变量

            // 如果大嘴花仍然存在
            g && (
                // 获取僵尸对象并检查其是否可被攻击且存在于场景中
                (h = $Z[f]) && h.beAttacked && h.PZ ?
                    // 僵尸存在且可被攻击的情况
                    $(e).childNodes[1].src = h.getRaven(e) ?
                        // 检查僵尸是否能被成功吞食（getRaven返回true表示被吞食）
                        (
                            // 僵尸被成功吞食，设置4200毫秒的消化时间
                            oSym.addTask(4200, function(i) {
                                var j = $P[i];  // 获取大嘴花对象
                                // 消化完成后，恢复大嘴花的攻击能力和正常状态
                                j && (
                                    j.canTrigger = 1,  // 重新允许触发攻击
                                    $(i).childNodes[1].src = "images/Plants/Chomper/Chomper.gif"  // 恢复正常外观
                                )
                            }, [e]),
                            "images/Plants/Chomper/ChomperDigest.gif"  // 显示消化中的动画
                        ) :
                        // 僵尸没有被成功吞食（可能有护甲等）
                        (
                            g.canTrigger = 1,  // 立即恢复攻击能力
                            "images/Plants/Chomper/Chomper.gif"  // 恢复正常外观
                        )
                :
                    // 僵尸不存在或无法攻击的情况，18毫秒后恢复大嘴花状态
                    oSym.addTask(18, function(i) {
                        var j = $P[i];
                        j && (
                            j.canTrigger = 1,  // 恢复攻击能力
                            $(i).childNodes[1].src = "images/Plants/Chomper/Chomper.gif"  // 恢复正常外观
                        )
                    }, [e])
            )
        }, [c, d])
    }, [a, b])
}
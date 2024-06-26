// @ts-nocheck
const METADATA = {
    website: "https://github.com/si-e/shapez-mods",
    author: "梦想天生",
    name: "SQ-X",
    version: "__dev__",
    id: "ShapezQuadrangle-X",
    description: "New subShape New journey.",
    minimumGameVersion: ">=1.5.0",
};

// ############################

// alias
const $ = shapez;
const T = $.T;
const Vector = $.Vector;
const globalConfig = $.globalConfig;
const enumDirection = $.enumDirection;
const defaultBuildingVariant = $.defaultBuildingVariant;

// shape shortkey
const REDPRINT_SHAPE_KEY = "--2r2r2r2r2r2r";
const BLUEPRINT_SHAPE_KEY_TMP = "RbRbRbRw";
const BLUEPRINT_SHAPE_KEY = "1b1b1b1b1b1b1b1b1b1b2b";
const m1 = "1w2u1w2w2u2u2w";
const m2 = "1w2b1w1w1w1w2r1w1w1w";
const m3 = "--1g2p2g2p1g2p2p";

// new reward
const R = $.enumHubGoalRewards;
R.reward_x_miner = "reward_x_miner";
R.reward_redprints = "reward_redprints";
R.reward_x_blueprints = "reward_x_blueprints";
R.reward_shape_swapper = "reward_shape_swapper";
R.reward_prioritizer = "reward_prioritizer";
R.reward_filter_swap = "reward_filter_swap";
R.reward_levers_and_filter = [R.reward_wires_painter_and_levers, R.reward_filter];
R.reward_balancer_and_tunnel = [R.reward_balancer, R.reward_tunnel];
R.reward_shape_swapper_and_rotater_180 = [R.reward_shape_swapper, R.reward_rotater_180];

// constant
const x_minerSpeedMultiplier = 2.5;
const shape_swapper = "shape_swapper";
const storageSize = 100;
const PrioritizerComponentID = "Prioritizer";
const MAX_ITEMS_IN_QUEUE_PRIORITIZER = 3;
const MAX_ITEMS_IN_QUEUE_FILTER = 2;
const REDPRINT_COST_PER_WASTED_SHAPE = 2;

// ############################

const TRANSLATIONS = {};
TRANSLATIONS["en"] = {
    keybindings: {
        mappings: {
            shape_swapper: "Shape Swapper (mod)",
            prioritizer: "Prioritizer (mod)",
        },
    },
    shopUpgrades: {
        belt:{
            name: "Belts, Distributor & Tunnels",
            description: "Speed x<currentMult> → x<newMult>"
        },
        miner:{
            name: "Extraction",
            description: "Speed x<currentMult> → x<newMult>"
        },
        processors:{
            name: "Swapping & Rotating",
            description: "Speed x<currentMult> → x<newMult>"
        },
        painting:{
            name: "Painting",
            description: "Speed x<currentMult> → x<newMult>"
        },
    },
    buildings: {
        shape_swapper: {
            default: {
                name: "Shape Swapper",
                description: "Swap the right part of two shapes."
            }
        },
        virtual_processor: {
            shape_swapper: {
                name: "Virtual Swapper",
                description: "Virtual swap the right part of two shapes."
            }
        },
        miner: {
            x_miner: {
                name: "X-Extractor",
                description: "Place over a shape to extract it. The product will have special patterns."
            }
        },
        prioritizer: {
            default: {
                name: "Prioritizer",
                description: "Prioritizes the bottom input."
            },
        },
        filter: {
            swap_filter: {
                name: "Swap Filter",
                description: "Filter out non-swapable shapes."
            }
        },
    },
    storyRewards: {
        reward_painter: {
            title: "New Painting",
            desc: "The <strong>painter</strong> has been unlocked \
            - Extract some color veins (just as you do with shapes) and combine it with a shape in the painter to color them!<br><br>\
            PS: You can mix colors by <strong>painting multiple times</strong>.",
        },
        reward_x_miner: {
            title: "New Shape: X-shape",
            desc: "Congrats! You have unlocked the <strong>X-Extractor</strong>\
            - It can mine shape into the <strong>X-shape</strong>.",
        },
        reward_shape_swapper: {  // shadow by reward_shape_swapper_and_rotater_180
            title: "Swap two shapes",
            desc: "Congrats! You unlocked the <strong>Shape Swapper</strong>\
            - It swaps the right half of two input <strong>shapes</strong>.",
        },
        reward_redprints: {
            title: "Redprints: Destroy wastes",
            desc: "You can now deliver <strong>other shapes</strong> (shapes other than the target) to the center hub!<br><br>\
            But it will consume your redprint and you need to create a redprint to afford it! (Those you just delivered).",
        },
        reward_x_blueprints: {
            title: "New Blueprints",
            desc: "Things can go wrong. The blueprints you delivered earlier are invalid.<br><br>\
            But don't worry, delivering new blueprint can solve this problem.",
        },
        reward_prioritizer: {
            title: "Prioritize Input",
            desc: "Congrats! You have unlocked the <strong>Prioritizer</strong>\
            - It prioritizes the input <strong>from the bottom</strong>, so you can make a <strong>throttle</strong> with it.\
            It is very useful in factories with ring belts.",
        },
        reward_filter_swap: {
            title: "Swap Filter",
            desc: "Congrats! You have unlocked the <strong>Swap Filter</strong>\
            - It will filter out</strong> non-swapable shapes <strong>.<br><br>\
            You can connect them <strong>in parallel</strong>, so that the waste can be passed along the right side.\
            It's very useful in automated factories.",
        },
        [R.reward_balancer_and_tunnel]: {
            title: "Balancer & Tunnel",
            desc: "The multifunctional <strong>balancer</strong> and <strong>tunnel</strong> have been unlocked\
            - It can be used to build bigger factories by <strong>splitting, merging and tunnelling</strong> items!",
        },
        [R.reward_shape_swapper_and_rotater_180]: {
            title: "Swap two shapes",
            desc: "Congrats! You unlocked the <strong>Shape Swapper</strong>\
            - It swaps the right half of two input <strong>shapes</strong>.<br><br>\
            At the same time, you are allowed to rotate a shape by 180 degrees.",
        },
        [R.reward_levers_and_filter]: {
            title: "Wires & Lever & Filter",
            desc: "You just unlocked the <strong>Wires Layer</strong>: \
            It is a separate layer on top of the regular layer and introduces a lot of new mechanics!<br><br>\
            For the beginning I unlocked you the <strong>Item Filter</strong> \
            - It will route items either to the top or the right output depending on the signal from the wires layer.<br><br>\
            To switch to the wires layer, press <strong>E</strong>.",
        },
    },
};
TRANSLATIONS["zh-CN"] = {
    keybindings: {
        mappings: {
            shape_swapper: "交换器 (mod)",
            prioritizer: "优先器 (mod)",
        },
    },
    shopUpgrades: {
        belt:{
            name: "传送、分发、隧道",
            description: "效率 <currentMult> 倍 → <newMult> 倍"
        },
        miner:{
            name: "开采",
            description: "效率 <currentMult> 倍 → <newMult> 倍"
        },
        processors:{
            name: "交换、旋转",
            description: "效率 <currentMult> 倍 → <newMult> 倍"
        },
        painting:{
            name: "上色",
            description: "效率 <currentMult> 倍 → <newMult> 倍"
        },
    },
    buildings: {
        shape_swapper: {
            default: {
                name: "交换器",
                description: "交换两个<strong>图形</strong>的<strong>右</strong>半部分。"
            }
        },
        virtual_processor: {
            shape_swapper: {
                name: "模拟交换器",
                description: "模拟交换两个<strong>图形</strong>的<strong>右</strong>半部分。"
            }
        },
        miner: {
            x_miner: {
                name: "X型-开采器",
                description: "放置在<strong>图形</strong>上进行开采。产物将呈现出特殊的纹路。"
            }
        },
        prioritizer: {
            default: {
                name: "优先器",
                description: "优先从底部</strong>输入。"
            },
        },
        filter: {
            swap_filter: {
                name: "交换过滤器",
                description: "过滤出不可交换的图形。"
            }
        },
    },
    storyRewards: {
        reward_painter: {
            title: "新·上色",
            desc: "恭喜！您解锁了<strong>上色器</strong>。\
            开采一些颜色（就像您开采图形一样），将其在上色器中与图形结合来将图形上色！<br><br>\
            注意: 您可以通过<strong>多次上色</strong>来混合颜色。",
        },
        reward_x_miner: {
            title: "新形状：X图形",
            desc: "恭喜！您解锁了<strong>X型-开采器</strong>。\
            它能将普通矿开采出<strong>X形状</strong>。",
        },
        reward_shape_swapper: {
            title: "图形交换",
            desc: "恭喜！您解锁了<strong>形状交换器</strong>。\
            它会将将输入的<strong>图形</strong>的右半部分交换。",
        },
        reward_redprints: {
            title: "红图：销毁废弃图形",
            desc: "您现在可以交付<strong>其它图形</strong>（目标以外的图形）到中心了！<br><br>\
            但是代价就是会<strong>消耗</strong>您的<strong>红图图形</strong>。<br><br>\
            您需要制造<strong>红图图形</strong>来负担。红图图形是您刚刚交付的图形。",
        },
        reward_x_blueprints: {
            title: "新蓝图",
            desc: "天有不测风云。您之前交付的蓝图图形都失效了。<br><br>\
            但别担心，交付新的蓝图图形可以解决这个问题。",
        },
        reward_prioritizer: {
            title: "优先器",
            desc: "恭喜！您已经解锁了<strong>优先器</strong>。\
            它将<strong>优先从底部</strong>输入，这样您就可以用它做一个<strong>节流门</strong>了。\
            它在有环路的工厂中十分有用。",
        },
        reward_filter_swap: {
            title: "交换过滤器",
            desc: "恭喜！您已经解锁了<strong>交换过滤器</strong>。\
            它将过滤出<strong>不可交换的</strong>图形。<br><br>\
            您可以将它们<strong>并联</strong>起来，使得废品可以沿右侧传递。\
            它在打造自动化工厂时十分有用。",
        },
        [R.reward_balancer_and_tunnel]: {
            title: "平衡器 & 隧道",
            desc: "恭喜！您解锁了多功能<strong>平衡器</strong>和<strong>隧道</strong>。\
            它能够<strong>分割、合并、运送</strong>多个传送带的资源，可以用来建造更大的工厂！",
        },
        [R.reward_shape_swapper_and_rotater_180]: {
            title: "图形交换",
            desc: "恭喜你！您已解锁<strong>交换器</strong>。\
            它能交换两个输入图形的<strong>右半部分</strong>。<br><br>\
            同时，您可以将图形旋转180度。",
        },
        [R.reward_levers_and_filter]: {
            title: "电线 & 开关 & 过滤器",
            desc: "恭喜！您解锁了<strong>电线层</strong>：它是正常层之上的一个层，它将带来了许多新的机制！<br><br>\
            首先我解锁了您的<strong>物品过滤器</strong>，它会根据在电线层上输入的信号决定是从上面还是右边输出物品。\
            按<strong>E</strong>键切换到电线层，然后用电线连接到槽，用开关来控制开启。",
        },
    },
};
// end TRANSATIONS

// ############################

function getLevels() {  // 关卡
    const LevelsForVariant = [
    // 1
    {
        shape: "RuRuRuRu",
        required: 10,
        reward: R.reward_painter,  // color
    },
    // 2
    {
        shape: "RbRbRbRb",
        required: 40,
        reward: R.reward_balancer_and_tunnel,
    },
    // 3
    {
        shape: "RpRpRpRp",
        required: 200,
        reward: R.reward_shape_swapper_and_rotater_180,  // swapper
    },
    // 4
    {
        shape: "RwRwRpRp",
        required: 400,
        reward: R.reward_rotater,  // angle
    },
    // 5
    {
        shape: "RbRbRbRw",
        required: 800,
        reward: R.reward_blueprints,  // blueprint
    },
    // 6
    {
        shape: "RrRgRrRg",
        required: 1200,
        reward: R.reward_rotater_ccw,
    },
    // 7 微软
    {
        shape: "RgRyRbRr",
        required: 2000,
        reward: R.reward_x_miner,  // X-shape
    },
    // 8 X矿 4
    {
        shape: "1u2u1u2u1u2u1u2u",
        required: 100,
        reward: R.reward_merger,
    },
    // 9 绿灰方块 4
    {
        shape: "1g2g1g2g1u2u1u2u",
        required: 200,
        reward: R.reward_underground_belt_tier_2,
    },
    // 10 青灰蝴蝶 4
    {
        shape: "1c2c1c2c2u1u2u1u",
        required: 400,
        reward: R.reward_splitter,
    },
    // 11 黄白魔方 4
    {
        shape: "1w2w2y1y1w2w2y1y",
        required: 800,
        reward: R.reward_belt_reader,
    },
    // 12 白色幽灵 4
    {
        shape: "1w1w2w2w2w2w1w1w",
        required: 1200,
        reward: R.reward_prioritizer,
    },
    // 13 红图 6
    {
        shape: "--2r2r2r2r2r2r",
        required: 6,
        reward: R.reward_redprints,  // redprint
        throughputOnly: true,
    },
    // 14 蓝图 1
    {
        shape: "1b1b1b1b1b1b1b1b1b1b2b",
        required: 2000,
        reward: R.reward_x_blueprints,  // blueprint
    },
    // 15 拼图 4
    {
        shape: "1p1u2u2b1b2r1r2p",
        required: 4000,
        reward: R.reward_levers_and_filter,
    },
    // 16 LOGO 5
    {
        shape: "1w2u1w2w2u2u2w",
        required: 6000,
        reward: R.reward_display,
    },
    // 17 红包 4
    {
        shape: "1y2y1r2r1r2r1r2y",
        required: 8000,
        reward: R.reward_constant_signal,
    },
    // 18 UFO 2
    {
        shape: "1w1w1w1w2p1p1p1p2p1w",
        required: 10000,
        reward: R.reward_filter_swap,
    },
    // 19 指南针 2
    {
        shape: "1w2b1w1w1w1w2r1w1w1w",
        required: 12000,
        reward: R.reward_storage,
    },
    // 20 色盘 0
    {
        shape: "1r1y1y1g1g1c1c1b1b1p1p1r",
        required: 150,
        reward: R.reward_virtual_processing,
        throughputOnly: true,
    },
    // 21 粽子 3
    {
        shape: "--1g1g2g1g1g2g1g1g2y",
        required: 14000,
        reward: R.reward_logic_gates,
    },
    // 22 EVA 5
    {
        shape: "--1g2p2g2p1g2p2p",
        required: 16000,
        reward: R.reward_freeplay,
    },
    ];

    // const difficulty = 0.1;
    // LevelsForVariant.forEach((level) => {
    //     if (!level.throughputOnly) {
    //         level.required *= difficulty;
    //     }
    // });
    return LevelsForVariant;
}

function getUpgrades() {  // 升级
    // 1-5-10--20 upgrade
    // 1-5-7.5-10 speed
    const fixedImprovements = [];
    const numFixedUpgrades = 4;
    const numExtraUpgrades = 15;
    const numTotalUpgrades = 20;

    for (let i = 1; i < numTotalUpgrades; ++i) {
        if (i < 5) {  // 1 + numFixedUpgrades
            fixedImprovements.push(1);
        } else if (i < 10) {
            fixedImprovements.push(0.5);
        } else {
            fixedImprovements.push(0.25);
        }
    }

    function generateEndgameUnlocks() {
        return new Array(numExtraUpgrades).fill(null).map((_, i) => {
            switch (i) {
                case 0:
                    return {
                        required: [{ shape: m1, amount: 1200 }],
                        excludePrevious: true,
                    };
                case 1:
                    return {
                        required: [{ shape: m1, amount: 2000 }, { shape: m2, amount: 3000 },],
                        excludePrevious: true,
                    };
                default:
                    return {
                        required: [
                            { shape: m1, amount: 2000 + (i-1) * 800 },
                            { shape: m2, amount: 3000 + (i-1) * 1000 },
                            { shape: m3, amount: 4000 + (i-2) * 1200 },
                        ],
                        excludePrevious: true,
                    };
            }
        });
    }

    const upgrades = {
        belt: [
            { required: [{ shape: "RuRuRuRu", amount: 100 }], },
            { required: [{ shape: "RwRuRuRu", amount: 300 }], },
            { required: [{ shape: "1u2w1u1u1u1u2u1u1u1u", amount: 2000 }], },
            { required: [{ shape: "1u2w1u1u1w2u2u1w1u", amount: 5000 }], },
            ...generateEndgameUnlocks(),
        ],
        miner: [
            { required: [{ shape: "RbRbRbRb", amount: 200 }], },
            { required: [{ shape: "RwRbRbRw", amount: 600 }], },
            { required: [{ shape: "1w1w1w1w2b1b2b1w1w1w", amount: 2000 }], },
            { required: [{ shape: "1w1w2y2b1b2b1w1w1w", amount: 5000 }], },
            ...generateEndgameUnlocks(),
        ],
        processors: [
            { required: [{ shape: "RgRgRcRc", amount: 300 }], },
            { required: [{ shape: "RcRuRcRg", amount: 900 }], },
            { required: [{ shape: "1g1g2c2c2c1g1g1g1g", amount: 2000 }], },
            { required: [{ shape: "1g2c2u2u2c1g1g1g", amount: 5000 }], },
            ...generateEndgameUnlocks(),
        ],
        painting: [
            { required: [{ shape: "RpRpRpRp", amount: 400 }], },
            { required: [{ shape: "RwRpRwRp", amount: 1200 }], },
            { required: [{ shape: "1p2w1p2w1p2w1p2w", amount: 2000, }], },
            { required: [{ shape: "1r2w1p1r2w1p1r2w1p", amount: 5000 }], },
            ...generateEndgameUnlocks(),
        ],
    };

    const difficulty = 1;
    const tierGrowth = 2;

    // Automatically generate tier levels
    for (const upgradeId in upgrades) {
        const upgradeTiers = upgrades[upgradeId];

        let currentTierRequirements = [];
        for (let i = 0; i < upgradeTiers.length; ++i) {
            const tierHandle = upgradeTiers[i];
            tierHandle.improvement = fixedImprovements[i];

            tierHandle.required.forEach(required => {
                required.amount = Math.round(required.amount * difficulty);
            });
            const originalRequired = tierHandle.required.slice();

            // add previous required
            if (!tierHandle.excludePrevious) {
                for (let k = currentTierRequirements.length - 1; k >= 0; --k) {
                    const oldTierRequirement = currentTierRequirements[k];
                    tierHandle.required.unshift({
                        shape: oldTierRequirement.shape,
                        amount: oldTierRequirement.amount,
                    });
                }
            }

            // update for next tier
            currentTierRequirements.push(
                ...originalRequired.map(req => ({
                    amount: req.amount,
                    shape: req.shape,
                }))
            );
            currentTierRequirements.forEach(tier => {
                tier.amount = tier.amount * tierGrowth;
            });
        }
    }
    return upgrades;
}

// ############################

// const logger = $.createLogger("SQ-X");
const logger = {log:()=>{}};

class Mod extends $.Mod {
    init() {
        this.registerSubShapeType({id: "X30", shortCode: "1"});
        this.registerSubShapeType({id: "X60", shortCode: "2"});

        for (const ClassName in STATIC_EXTENSION) {
            this.modInterface.extendObject($[ClassName], STATIC_EXTENSION[ClassName]);
        }
        for (const ClassName in CLASS_EXTENSION) {
            this.modInterface.extendClass($[ClassName], CLASS_EXTENSION[ClassName]);
        }
        for (const Signal in SIGNAL_FUNCTION) {
            this.signals[Signal].add(SIGNAL_FUNCTION[Signal]);
        }

        {  // 交付限制
            const Req_HUB = "limited_hub";
            $.enumItemProcessorRequirements.hub = Req_HUB;
            $.MODS_PROCESSING_REQUIREMENTS[Req_HUB] = checkRequirements_hub;
            $.MODS_CAN_PROCESS[Req_HUB] = () => true;
        }

        {  // X开采器
            $.enumMinerVariants.x_miner = "x_miner";
            this.modInterface.addVariantToExistingBuilding(
                //@ts-ignore
                $.MetaMinerBuilding,
                $.enumMinerVariants.x_miner,
                {
                    name: "_X-miner",
                    description: "_desc",

                    regularSpriteBase64: RESOURCES["building"]["x_miner.png"],
                    blueprintSpriteBase64: RESOURCES["blueprint"]["x_miner.png"],
                    tutorialImageBase64: RESOURCES["tutorial"]["x_miner.png"],

                    dimensions: new Vector(1, 1),
                    additionalStatistics(root) {
                        return [[
                                T.ingame.buildingPlacement.infoTexts.speed,
                                $.formatItemsPerSecond(root.hubGoals.getMinerBaseSpeed() * x_minerSpeedMultiplier),
                        ],];
                    },

                    isUnlocked(root) {
                        return root.hubGoals.isRewardUnlocked(R.reward_x_miner);
                    },
                }
            );
        }

        {  // 实体交换机
            $.enumItemProcessorRequirements.shape_swapper = shape_swapper;
            $.MODS_PROCESSING_REQUIREMENTS[$.enumItemProcessorRequirements.shape_swapper] = checkRequirements_shape_swapper;
            $.MODS_CAN_PROCESS[$.enumItemProcessorRequirements.shape_swapper] = canProcess_shape_swapper;

            $.enumItemProcessorTypes.shape_swapper = shape_swapper;
            $.MOD_ITEM_PROCESSOR_SPEEDS[$.enumItemProcessorTypes.shape_swapper] =
                (root) => globalConfig.beltSpeedItemsPerSecond * root.hubGoals.upgradeImprovements.processors * 1/3;
            $.MOD_ITEM_PROCESSOR_HANDLERS.shape_swapper = process_SWAPPER;
            // Register the new building
            this.modInterface.registerNewBuilding({
                metaClass: MetaShapeSwapperBuilding,
                buildingIconBase64: RESOURCES["icon"]["shape_swapper.png"],
            });
            // Add it to the regular toolbar
            this.modInterface.addNewBuildingToToolbar({
                toolbar: "regular",
                location: "primary",
                metaClass: MetaShapeSwapperBuilding,
            });
            $.KEYMAPPINGS.buildings.shape_swapper = { id: "shape_swapper", keyCode: $.keyToKeyCode("0") };  // same as trash
        }

        {  // 模拟交换机
            $.enumVirtualProcessorVariants.shape_swapper = shape_swapper;
            this.modInterface.addVariantToExistingBuilding(
                $.MetaVirtualProcessorBuilding,
                $.enumVirtualProcessorVariants.shape_swapper,
                {
                    name: "_shape_swapper",
                    description: "_desc",

                    tutorialImageBase64: RESOURCES["tutorial"]["virtual_processor-swapper.png"],
                    regularSpriteBase64: RESOURCES["building"]["virtual_processor-swapper.png"],
                    blueprintSpriteBase64: RESOURCES["blueprint"]["virtual_processor-swapper.png"],

                    dimensions: new Vector(2, 1),

                    isUnlocked(root) {
                        return true;
                    },
                }
            );

            $.enumLogicGateType.shape_swapper = shape_swapper;
        }

        {  // 优先器
            // getProcessorBaseSpeed
            $.enumItemProcessorTypes.prioritizer = "prioritizer";
            $.MOD_ITEM_PROCESSOR_SPEEDS[$.enumItemProcessorTypes.prioritizer] =
                (root) => $.globalConfig.beltSpeedItemsPerSecond * root.hubGoals.upgradeImprovements.belt;

            // Register the new building
            this.modInterface.registerNewBuilding({
                metaClass: MetaPrioritizerBuilding,
                buildingIconBase64: RESOURCES["icon"]["prioritizer.png"],
            });
    
            this.modInterface.registerComponent(PrioritizerComponent);
            this.modInterface.registerGameSystem({
                id: "prioritizer",
                systemClass: PrioritizerSystem,
                before: "end",
            });
            $.KEYMAPPINGS.buildings.prioritizer = { id: "prioritizer", keyCode: $.keyToKeyCode("8") };  // same as mixer
        }

        {  // 交换过滤器
            $.enumFilterVariants = {
                swap_filter: "swap_filter",
            };
            this.modInterface.addVariantToExistingBuilding(
                //@ts-ignore
                $.MetaFilterBuilding,
                $.enumFilterVariants.swap_filter,
                {
                    name: "_swap_filter",
                    description: "_desc",

                    regularSpriteBase64: RESOURCES["building"]["swap_filter.png"],
                    blueprintSpriteBase64: RESOURCES["blueprint"]["swap_filter.png"],
                    tutorialImageBase64: RESOURCES["tutorial"]["swap_filter.png"],

                    dimensions: new Vector(1, 1),
                    additionalStatistics(root) {
                        return [[
                                T.ingame.buildingPlacement.infoTexts.speed,
                                $.formatItemsPerSecond(root.hubGoals.getBeltBaseSpeed()),
                        ],];
                    },

                    isUnlocked(root) {
                        return root.hubGoals.isRewardUnlocked(R.reward_swap_filter);
                    },
                }
            );
        }

        {  // 过关图片展示
            const typed = x => x;
            const R2C = $.enumHubGoalRewardsToContentUnlocked;
            R2C[R.reward_x_miner] = typed([[$.MetaMinerBuilding, $.enumMinerVariants.x_miner]]);
            R2C[R.reward_prioritizer] = typed([[MetaPrioritizerBuilding, defaultBuildingVariant]]);
            R2C[R.reward_filter_swap] = typed([[$.MetaFilterBuilding, $.enumFilterVariants.swap_filter]]);
            R2C[R.reward_levers_and_filter] = typed([[$.MetaLeverBuilding, defaultBuildingVariant]]);
            R2C[R.reward_balancer_and_tunnel] = typed([[$.MetaBalancerBuilding, defaultBuildingVariant]]);
            R2C[R.reward_shape_swapper_and_rotater_180] = typed([[MetaShapeSwapperBuilding, defaultBuildingVariant]]);
        }

        for (const Language in TRANSLATIONS) {
            this.modInterface.registerTranslations(Language, TRANSLATIONS[Language]);
        }
    }

    /**
     *
     * @param {object} param0
     * @param {string} param0.id
     * @param {string} param0.shortCode
     */
    registerSubShapeType({id, shortCode}) {
        if (shortCode.length !== 1) {
            throw new Error("Bad short code: " + shortCode);
        }
        $.enumSubShape[id] = id;
        $.enumSubShapeToShortcode[id] = shortCode;
        $.enumShortcodeToSubShape[shortCode] = id;
    }
}

// ############################

/**
 * @typedef {{
*   linkedBefore: boolean,
*   linkedAfter: boolean,
*   subShape: enumSubShape,
*   color: enumColors,
* }} ShapeLayerItem
*/

/**
 * @typedef {[
 *      ShapeLayerItem?, ShapeLayerItem?, ShapeLayerItem?, ShapeLayerItem?, ShapeLayerItem?, ShapeLayerItem?, 
 *      ShapeLayerItem?, ShapeLayerItem?, ShapeLayerItem?, ShapeLayerItem?, ShapeLayerItem?, ShapeLayerItem?,
 * ]} ShapeLayer
 */

// ############################

const SIGNAL_FUNCTION = {

// 一次性初始化
// gameStarted: (root) => {
// }
// ,
hudElementInitialized: (element) => {
    if (element.constructor.name === "HUDBuildingsToolbar") {
        // 加到次级工具栏最左边
        element["secondaryBuildings"].unshift(MetaPrioritizerBuilding);
    }
}
,
gameLoadingStageEntered: (inGameState, stage) => {
    switch (stage) {
        case $.GAME_LOADING_STATES.s5_firstUpdate: {
            const root = inGameState.core.root;

            // 模拟交换机：处理逻辑注册
            const logicGateSystem = root.systemMgr.systems.logicGate;
            logicGateSystem.boundOperations[$.enumLogicGateType.shape_swapper] = logicGateSystem.compute_SWAPPER.bind(logicGateSystem);

            // 交付限制: 输入检查
            const hubEntity = root.map.getLayerContentXY(0, 0, "regular");
            hubEntity.components.ItemProcessor.processingRequirement = $.enumItemProcessorRequirements.hub;
        }
    }
}
,
// 升级
modifyUpgrades: (upgrades) => {
    Object.assign(upgrades, getUpgrades());
}
,
// 关卡
modifyLevelDefinitions: (levels) => {
    levels.length = 0;
    Object.assign(levels, getLevels());
}
,

};  // end SIGNAL_FUNCTION

// ############################

const STATIC_EXTENSION = {

// X形状
ShapeDefinition: ({ $super, $old }) => ({
    /**
     * Generates the definition from the given short key
     * @param {string} key
     * @returns {ShapeDefinition}
     */
    fromShortKey(key) {
        if (!key.includes('1') && !key.includes('2')) {
            return $old.fromShortKey(key);
        }
        logger.log("fromShortKey(", key, ")");
        const sourceLayers = key.split(":");
        let layers = [];
        for (let text of sourceLayers) {
            assert((text.length & 1) === 0, "Invalid shape short key: " + key);
    
            /** @type {ShapeLayer} */
            const quads = Array(12).fill(null);
            let quad = 0;
            for (let subShape_index = 0; subShape_index < text.length / 2; ++subShape_index) {
                const shapeText = text[subShape_index * 2 + 0];
                const subShape = $.enumShortcodeToSubShape[shapeText];
                if (subShape) {
                    const colorText = text[subShape_index * 2 + 1];
                    const color = $.enumShortcodeToColor[colorText];
                    assert(color, "Invalid color short key: " + key);

                    let angle;  // Number of quadrant in total 12 quadrants.
                    if (shapeText === '1') {
                        angle = 1;
                    } else if (shapeText === '2') {
                        angle = 2;
                    } else {  // for compatibility with the original. (BUT the Angle is off by 15 degrees)
                        // angle = 3;
                        assert(false, "Invalid x-shape key: " + shapeText);
                    }

                    // Fill in quadrants.
                    for (let a = 0; a < angle; ++a) {
                        assert(quads[quad] === null, "Quadrant overlap: " + key)
                        quads[quad] = {
                            linkedBefore: (a > 0),  // not first
                            linkedAfter: (a < angle - 1),  // not last
                            subShape,
                            color,
                        };
                        quad = (quad + 1) % 12;
                    }
                } else if (shapeText === "-") {
                    quad++;
                } else {
                    assert(false, "Invalid shape key: " + shapeText);
                }
            }
            layers.push(quads);
        }
    
        const definition = new $.ShapeDefinition({ layers });
        /// definition.cachedHash = key;  // I'm afraid of inconsistency.
        definition.getHash();
        return definition;
    },

    /**
     * INTERNAL
     * Checks if a given string is a valid short key
     * @param {string} key
     * @returns {boolean}
     */
    isValidShortKeyInternal(key) {
        if (!key.includes('1') && !key.includes('2')) {
            return $old.isValidShortKeyInternal(key);
        }
        logger.log("isValidShortKeyInternal(", key, ")");
        // logger.log("Check in isValidShortKeyInternal_new");
        const sourceLayers = key.split(":");
        if (sourceLayers.length === 0 || sourceLayers.length > 4) {
            logger.log("invalid layer number", sourceLayers.length);
            return false;
        }
        for (let text of sourceLayers) {
            if ((text.length & 1) !== 0) {
                logger.log("odd text length", text.length);
                return false;
            }

            const quads = Array(12).fill(null);
            var quad = 0;
            let anyFilled = false;
            for (let subShape_index = 0; subShape_index < text.length / 2; ++subShape_index) {
                const shapeText = text[subShape_index * 2 + 0];
                const colorText = text[subShape_index * 2 + 1];
                const subShape = $.enumShortcodeToSubShape[shapeText];
                const color = $.enumShortcodeToColor[colorText];

                if (subShape) {
                    if (!color) {
                        logger.log("invalid color", text);
                        return false;
                    }

                    let angle;  // Number of quadrant in total 12 quadrants.
                    if (shapeText === '1') {
                        angle = 1;
                    } else if (shapeText === '2') {
                        angle = 2;
                    } else {  // For compatibility with the original. (BUT the Angle is off by 15 degrees)
                        // angle = 3;
                        logger.log("invalid subShape for x-shape", text);
                        return false;
                    }

                    // Fill in quadrants.
                    if (quad >= 12) {  // No new quadrants are allowed, to make sure the key is unique.
                        logger.log("quadrants overflow", text)
                        return false;
                    }
                    for (let a = 0; a < angle; ++a) {
                        if (quads[quad % 12] !== null) {
                            logger.log("quadrant overlap", text)
                            return false;
                        }
                        quads[quad % 12] = 1;
                        quad++;
                        anyFilled = true;
                    }
                } else if (shapeText === "-") {
                    if (colorText !== "-") {
                        logger.log("not empty color but empty shape", text);
                        return false;
                    }
                    quad += 1;
                } else {
                    logger.log("invalid shape key", text);
                    return false;
                }
            }

            if (!anyFilled) {
                logger.log("empty layer", text);
                return false;
            }
            if (quad < 12) {
                logger.log("not enough quadrants", text)
                return false;
            }
        }
        return true;
    },
})
,

};  // end STATIC_EXTENSION

// ############################

const CLASS_EXTENSION = {

// X形状
ShapeDefinition: ({ $super, $old }) => ({
    /**
     * @returns {boolean}
     */
    isX_Shape() {
        return this.layers.length > 0 && this.layers[0].length != 4;
    },

    /**
     * Returns a unique id for this shape
     * @returns {string}
     */
    getHash() {
        if (this.cachedHash) {
            return this.cachedHash;
        }
        logger.log("getHash(", this, ")");

        let id = "";
        for (let layerIndex = 0; layerIndex < this.layers.length; ++layerIndex) {
            const layer = this.layers[layerIndex];

            let anyContents = false;
            for (let quadrant = 0; quadrant < layer.length; ++quadrant) {
                const item = layer[quadrant];

                if (item) {
                    if (item.linkedBefore) {  // New logic. (undefined\false or true)
                        if (!anyContents) {
                            id += "--";
                        }
                    } else {
                        id += $.enumSubShapeToShortcode[item.subShape] + $.enumColorToShortcode[item.color];
                        anyContents = true;
                    }
                } else {
                    id += "--";
                }
            }

            if (layerIndex < this.layers.length - 1) {
                id += ":";
            }
        }
        this.cachedHash = id;
        logger.log("Hash:", id);
        return id;
    },

    /**
     *
     * @param {HTMLCanvasElement} canvas
     * @param {CanvasRenderingContext2D} context
     * @param {number} w
     * @param {number} h
     * @param {number} dpi
     */
    internalGenerateShapeBuffer(canvas, context, w, h, dpi) {
        if (!this.isX_Shape()) {
            $old.internalGenerateShapeBuffer.bind(this)(canvas, context, w, h, dpi);
            return;
        }
        logger.log("internalGenerateShapeBuffer(", this, ")");

        context.translate((w * dpi) / 2, (h * dpi) / 2);
        // context.scale((dpi * w) / 23, (dpi * h) / 23);
        context.scale((dpi * w) / 25, (dpi * h) / 25);
        
        context.fillStyle = "#e9ecf7";
        
        const quadrantSize = 10;

        context.fillStyle = "rgba(47, 79, 79, 0.5)";  // New color for the substrate circle.
        // context.beginCircle(0, 0, quadrantSize * 1.15);
        const A = quadrantSize * 1.15
        context.beginRoundedRect(-A, -A, A * 2, A * 2, A * 0.5);
        context.fill();

        context.rotate(Math.radians(-90));

        // 添加切割提示线
        context.strokeStyle = "rgba(233, 236, 247, 0.5)";
        context.lineWidth = $.THEME.items.outlineWidth;
        context.beginPath();
        const moveInwards = A * Math.tan(Math.radians(30 / 2));
        context.moveTo(+A, -moveInwards);
        context.lineTo(-A, +moveInwards);
        context.closePath();
        context.stroke();
        
        for (let layerIndex = 0; layerIndex < this.layers.length; ++layerIndex) {
            const quadrants = this.layers[layerIndex];

            const layerScale = Math.max(0.1, 0.9 - layerIndex * 0.22);

            // logger.log("quadrants:", quadrants);
            for (let quadrant of quadrants) {
                if (!quadrant) {
                    context.rotate(Math.radians(30));
                    continue;
                }
                const { linkedBefore, linkedAfter, subShape, color } = quadrant;
                if (linkedBefore) {
                    context.rotate(Math.radians(30));
                    continue;
                }

                context.fillStyle = $.enumColorsToHexCode[color];
                context.strokeStyle = $.THEME.items.outline;
                context.lineWidth = $.THEME.items.outlineWidth;

                switch (subShape) {
                    case $.enumSubShape.X30: {
                        context.beginPath();
                        const dims = quadrantSize * layerScale;
                        const moveInwards = dims * Math.tan(Math.radians(30 / 2));
                        context.moveTo(dims, -moveInwards);
                        context.lineTo(dims, +moveInwards);
                        context.lineTo(0, 0);
                        context.closePath();
                        context.fill();
                        context.stroke();
                    
                        context.rotate(Math.radians(30));
                        break;
                    }
                    case $.enumSubShape.X60: {
                        context.rotate(Math.radians(-30));
                    
                        context.beginPath();
                        const dims = quadrantSize * layerScale;
                        const moveInwards = dims * Math.tan(Math.radians(30 / 2));
                        context.moveTo(dims, moveInwards);
                        context.lineTo(dims, dims);
                        context.lineTo(moveInwards, dims);
                        context.lineTo(0, 0);
                        context.closePath();
                        context.fill();
                        context.stroke();
                    
                        context.rotate(Math.radians(60));
                        break;
                    }

                    default: {
                        throw new Error("Unkown sub shape for X-shape: " + subShape);
                    }
                }
            }
        }
    },

    /**
     * Returns a definition with only the given quadrants
     * @param {Array<number>} includeQuadrants
     * @returns {ShapeDefinition}
     */
    cloneFilteredByQuadrants(includeQuadrants) {
        if (!this.isX_Shape()) {
            return $old.cloneFilteredByQuadrants.bind(this)(includeQuadrants);
        }
        logger.log("cloneFilteredByQuadrants(", this, ")");
        const convert = (q) => ~~(q / (12 / 4));  // 0 for [0,1,2], 1 for [3,4,5], etc.
        const newLayers = this.getClonedLayers();
        for (let layerIndex = 0; layerIndex < newLayers.length; ++layerIndex) {
            const quadrants = newLayers[layerIndex];
            let anyContents = false;
            for (let quad = 0; quad < 12; ++quad) {
                if (includeQuadrants.indexOf(convert(quad)) < 0) {
                    quadrants[quad] = null;
                } else if (quadrants[quad]) {
                    anyContents = true;
                }
            }

            // Check if the layer is entirely empty
            if (!anyContents) {
                newLayers.splice(layerIndex, 1);
                layerIndex -= 1;
                continue;
            }
            // Check if the X-layer is breaken
            for (let quad = 0; quad < 12; ++quad) {
                const cur = quadrants[quad];
                const next = quadrants[(quad + 1) % 12];
                if (!(cur && cur.linkedAfter) !== !(next && next.linkedBefore)) {
                    return new $.ShapeDefinition({});
                }
            }
        }
        return new $.ShapeDefinition({ layers: newLayers });
    },
    
    /**
     * Returns a definition which was rotated clockwise
     * @returns {ShapeDefinition}
     */
    cloneRotateCW() {
        const newLayers = this.getClonedLayers();
        for (let layerIndex = 0; layerIndex < newLayers.length; ++layerIndex) {
            const quadrants = newLayers[layerIndex];
            quadrants.unshift(quadrants[quadrants.length-1]);
            quadrants.pop();
        }
        return new $.ShapeDefinition({ layers: newLayers });
    },

    /**
     * Returns a definition which was rotated 180 degrees
     * @returns {ShapeDefinition}
     */
    cloneRotate180() {
        const newLayers = this.getClonedLayers();
        for (let layerIndex = 0; layerIndex < newLayers.length; ++layerIndex) {
            const quadrants = newLayers[layerIndex];
            const halfQuadLen = quadrants.length / 2;
            newLayers[layerIndex] = quadrants.slice(halfQuadLen).concat(quadrants.slice(0, halfQuadLen));
        }
        return new $.ShapeDefinition({ layers: newLayers });
    },
    
    /**
     * Stacks the given shape definition on top.
     * @param {ShapeDefinition} definition
     */
    cloneAndStackWith(definition) {
        logger.log("cloneAndStackWith(", this, ")");
        assert(!this.isEntirelyEmpty() && !definition.isEntirelyEmpty(), "Can not stack entirely empty definition");
        assert(this.isX_Shape() === definition.isX_Shape(), "Can not stack X-shape with non-X-shape");
        if (!this.isX_Shape()) {
            return $old.cloneAndStackWith.bind(this)(definition);
        }

        const topShapeLayers = definition.layers;

        findLayerToMergeAt:
        for (var layerToMergeAt = 3; layerToMergeAt >= 0; --layerToMergeAt) {
            // check shape overlap
            for (let layer = layerToMergeAt; layer < this.layers.length; ++layer) {
                const topLayer = layer - layerToMergeAt;
                if (topLayer > topShapeLayers.length) {
                    break;
                }
                // check layer overlap
                for (let quad = 0; quad < 12; ++quad) {
                    if (topShapeLayers[topLayer][quad] && this.layers[layer][quad]) {
                        break findLayerToMergeAt;
                    }
                }
            }
        }
        layerToMergeAt += 1;  // left up one layer to avoid overlap.
        logger.log("layerToMergeAt ", layerToMergeAt)

        const mergedLayers = this.getClonedLayers();
        for (let layer = mergedLayers.length; layer < layerToMergeAt + topShapeLayers.length; ++layer) {
            mergedLayers.push(Array(12).fill(null));
        }

        for (let layer = 0; layer < topShapeLayers.length; ++layer) {
            const layerMergingAt = layerToMergeAt + layer;
            const bottomShapeLayer = mergedLayers[layerMergingAt];
            const topShapeLayer = topShapeLayers[layer];
            for (let quad = 0; quad < 12; quad++) {
                assert(!(bottomShapeLayer[quad] && topShapeLayer[quad]), "Shape merge: Sub shape got lost");
                bottomShapeLayer[quad] = bottomShapeLayer[quad] || topShapeLayer[quad];
            }
        }

        // Limit to 4 layers at max
        mergedLayers.splice(4);

        return new $.ShapeDefinition({ layers: mergedLayers });
    },

    /**
     * Clones the shape and colors everything in the given color
     * @param {enumColors} color
     */
    cloneAndPaintWith(color) {
        const newLayers = this.getClonedLayers();

        for (let layerIndex = 0; layerIndex < newLayers.length; ++layerIndex) {
            const quadrants = newLayers[layerIndex];
            for (let quadrantIndex = 0; quadrantIndex < quadrants.length; ++quadrantIndex) {
                const item = quadrants[quadrantIndex];
                if (item) {
                    // item.color = color;
                    item.color = $.enumColorMixingResults[item.color][color];  // enhance paiter
                }
            }
        }
        return new $.ShapeDefinition({ layers: newLayers });
    },

    /**
     * Clones the shape and colors everything in the given colors
     * @param {[enumColors, enumColors, enumColors, enumColors]} colors
     */
    cloneAndPaintWith4Colors(colors) {
        return this;
    },
})
,
// 地图矿分布
MapChunk: ({ $super, $old }) => ({
    generatePredefined(rng) {
        return false;
    },

    internalGenerateRandomSubShape(rng, weights) {
        return $.enumSubShape.rect;
    },

    generatePatches({ rng, chunkCenter, distanceToOriginInChunks }) {
        const W = 4;
        const X = Math.abs(4 * this.x - this.y) > W && Math.abs(4 * this.x + this.y) > W && 
        Math.abs(this.x - 4 * this.y) > W && Math.abs(this.x + 4 * this.y) > W;
        // const X = rng.next() < 1 / 4;
        if (X) {
            if (rng.next() < 1 / 2) {
                const colorPatchSize = 1.25;
                this.internalGenerateColorPatch(rng, colorPatchSize, distanceToOriginInChunks);
            }
        } else {
            if (rng.next() < 1 / 2) {
                const shapePatchSize = 1.25;
                this.internalGenerateShapePatch(rng, shapePatchSize, distanceToOriginInChunks);
            }
        }
    },
})
,
// 红图
GameMode: ({ $super, $old }) => ({
    /** @returns {string} */
    getBlueprintShapeKey() {
        if (this.root.hubGoals.isRewardUnlocked(R.reward_x_blueprints)) {
            return BLUEPRINT_SHAPE_KEY;
        } else {
            return BLUEPRINT_SHAPE_KEY_TMP;
        }
    },

    /** @returns {string} */
    getRedprintShapeKey() {
        return REDPRINT_SHAPE_KEY;
    }
})
,
HUDPinnedShapes: ({ $super, $old }) => ({
    updateShapesAfterUpgrade() {
        for (let i = 0; i < this.pinnedShapes.length; ++i) {
            const key = this.pinnedShapes[i];
            if (
                key === this.root.gameMode.getBlueprintShapeKey() ||
                key === this.root.gameMode.getRedprintShapeKey()  // ADD
            ) {
                // Ignore blueprint shapes
                continue;
            }
            let goal = this.findGoalValueForShape(key);
            if (!goal) {
                // Seems no longer relevant
                this.pinnedShapes.splice(i, 1);
                i -= 1;
            }
        }

        this.rerenderFull();
    },
    findGoalValueForShape(key) {
        if (key === this.root.hubGoals.currentGoal.definition.getHash()) {
            return this.root.hubGoals.currentGoal.required;
        }
        if (
            key === this.root.gameMode.getBlueprintShapeKey() ||
            key === this.root.gameMode.getRedprintShapeKey()  // ADD
        ) {
            return null;
        }

        // Check if this shape is required for any upgrade
        const upgrades = this.root.gameMode.getUpgrades();
        for (const upgradeId in upgrades) {
            const upgradeTiers = upgrades[upgradeId];
            const currentTier = this.root.hubGoals.getUpgradeLevel(upgradeId);
            const tierHandle = upgradeTiers[currentTier];

            if (!tierHandle) {
                // Max level
                continue;
            }

            for (let i = 0; i < tierHandle.required.length; ++i) {
                const { shape, amount } = tierHandle.required[i];
                if (shape === key) {
                    return amount;
                }
            }
        }

        return null;
    },
    isShapePinned(key) {
        if (
            key === this.root.hubGoals.currentGoal.definition.getHash() ||
            key === this.root.gameMode.getBlueprintShapeKey() ||
            key === this.root.gameMode.getRedprintShapeKey()  // ADD
        ) {
            // This is a "special" shape which is always pinned
            return true;
        }

        return this.pinnedShapes.indexOf(key) >= 0;
    },
    rerenderFull() {
        const currentGoal = this.root.hubGoals.currentGoal;
        const currentKey = currentGoal.definition.getHash();

        // First, remove all old shapes
        for (let i = 0; i < this.handles.length; ++i) {
            this.handles[i].element.remove();
            const detector = this.handles[i].detector;
            if (detector) {
                detector.cleanup();
            }
            const infoDetector = this.handles[i].infoDetector;
            if (infoDetector) {
                infoDetector.cleanup();
            }
        }
        this.handles = [];

        // Pin story goal
        this.internalPinShape({
            key: currentKey,
            canUnpin: false,
            className: "goal",
            throughputOnly: currentGoal.throughputOnly,
        });

        // Pin blueprint shape as well
        if (this.root.hubGoals.isRewardUnlocked(R.reward_blueprints)) {
            this.internalPinShape({
                key: this.root.gameMode.getBlueprintShapeKey(),
                canUnpin: false,
                className: "blueprint",
            });
        }
        
        // ADD
        // Pin redprint shape as well
        if (this.root.hubGoals.isRewardUnlocked(R.reward_redprints)) {
            this.internalPinShape({
                key: this.root.gameMode.getRedprintShapeKey(),
                canUnpin: false,
                className: "redprint",
            });
        }

        // Pin manually pinned shapes
        for (let i = 0; i < this.pinnedShapes.length; ++i) {
            const key = this.pinnedShapes[i];
            if (key !== currentKey) {
                this.internalPinShape({ key });
            }
        }
    },
    pinNewShape(definition) {
        const key = definition.getHash();
        if (key === this.root.hubGoals.currentGoal.definition.getHash()) {
            // Can not pin current goal
            return;
        }

        if (
            key === this.root.gameMode.getBlueprintShapeKey() ||
            key === this.root.gameMode.getRedprintShapeKey()  // ADD
        ) {
            // Can not pin the blueprint shape
            return;
        }

        // Check if its already pinned
        if (this.pinnedShapes.indexOf(key) >= 0) {
            return;
        }

        this.pinnedShapes.push(key);
        this.rerenderFull();
    },
})
,
HUDConstantSignalEdit: ({ $super, $old }) => ({
    editConstantSignal(entity, { deleteOnCancel = true }) {
        if (!entity.components.ConstantSignal) {
            return;
        }

        // Ok, query, but also save the uid because it could get stale
        const uid = entity.uid;

        const signal = entity.components.ConstantSignal.signal;
        const signalValueInput = new $.FormElementInput({
            id: "signalValue",
            label: $.fillInLinkIntoTranslation(T.dialogs.editSignal.descShortKey, $.THIRDPARTY_URLS.shapeViewer),
            placeholder: "",
            defaultValue: signal ? signal.getAsCopyableKey() : "",
            validator: val => this.parseSignalCode(entity, val),
        });

        const items = [...Object.values($.COLOR_ITEM_SINGLETONS)];

        if (entity.components.WiredPins) {
            items.unshift($.BOOL_FALSE_SINGLETON, $.BOOL_TRUE_SINGLETON);
        }
        if (true) {
            items.push(
                this.root.shapeDefinitionMgr.getShapeItemFromShortKey(
                    this.root.gameMode.getBlueprintShapeKey()
                )
            );
            // ADD
            items.push(
                this.root.shapeDefinitionMgr.getShapeItemFromShortKey(
                    this.root.gameMode.getRedprintShapeKey()
                )
            );
            // producer which can produce virtually anything
            // const shapes = ["CuCuCuCu", "RuRuRuRu", "WuWuWuWu", "SuSuSuSu"];
            const shapes = ["RuRuRuRu", "1u2u1u2u1u2u1u2u"];
            items.unshift(
                ...shapes.reverse().map(key => this.root.shapeDefinitionMgr.getShapeItemFromShortKey(key))
            );
        }

        if (this.root.gameMode.hasHub()) {
            items.push(
                this.root.shapeDefinitionMgr.getShapeItemFromDefinition(
                    this.root.hubGoals.currentGoal.definition
                )
            );
        }

        if (this.root.hud.parts.pinnedShapes) {
            items.push(
                ...this.root.hud.parts.pinnedShapes.pinnedShapes.map(key =>
                    this.root.shapeDefinitionMgr.getShapeItemFromShortKey(key)
                )
            );
        }

        const itemInput = new $.FormElementItemChooser({
            id: "signalItem",
            label: null,
            items,
        });

        const dialog = new $.DialogWithForm({
            app: this.root.app,
            title: T.dialogs.editConstantProducer.title,
            desc: T.dialogs.editSignal.descItems,
            formElements: [itemInput, signalValueInput],
            buttons: ["cancel:bad:escape", "ok:good:enter"],
            closeButton: false,
        });
        this.root.hud.parts.dialogs.internalShowDialog(dialog);

        // When confirmed, set the signal
        const closeHandler = () => {
            if (!this.root || !this.root.entityMgr) {
                // Game got stopped
                return;
            }

            const entityRef = this.root.entityMgr.findByUid(uid, false);
            if (!entityRef) {
                // outdated
                return;
            }

            const constantComp = entityRef.components.ConstantSignal;
            if (!constantComp) {
                // no longer interesting
                return;
            }

            if (itemInput.chosenItem) {
                constantComp.signal = itemInput.chosenItem;
            } else {
                constantComp.signal = this.parseSignalCode(entity, signalValueInput.getValue());
            }
        };

        dialog.buttonSignals.ok.add(() => {
            closeHandler();
        });
        dialog.valueChosen.add(() => {
            dialog.closeRequested.dispatch();
            closeHandler();
        });

        // When cancelled, destroy the entity again
        if (deleteOnCancel) {
            dialog.buttonSignals.cancel.add(() => {
                if (!this.root || !this.root.entityMgr) {
                    // Game got stopped
                    return;
                }

                const entityRef = this.root.entityMgr.findByUid(uid, false);
                if (!entityRef) {
                    // outdated
                    return;
                }

                const constantComp = entityRef.components.ConstantSignal;
                if (!constantComp) {
                    // no longer interesting
                    return;
                }

                this.root.logic.tryDeleteBuilding(entityRef);
            });
        }
    }
})
,
// 解锁
RegularGameMode: ({ $super, $old }) => ({
    isBuildingExcluded(building) {
        return [
            $.MetaCutterBuilding,
            $.MetaStackerBuilding,
            $.MetaMixerBuilding,
            $.MetaTrashBuilding,

            $.MetaConstantProducerBuilding,
            $.MetaGoalAcceptorBuilding,
            $.MetaBlockBuilding,
            $.MetaItemProducerBuilding,
        ].indexOf(building) >= 0;
    },
})
,
MetaRotaterBuilding: ({ $super, $old }) => ({
    getIsUnlocked(root) {
        return root.hubGoals.isRewardUnlocked(R.reward_rotater)
            || root.hubGoals.isRewardUnlocked(R.reward_rotater_180)
            || root.hubGoals.isRewardUnlocked(R.reward_rotater_ccw);
    },
    getAvailableVariants(root) {
        let variants = [];
        if (root.hubGoals.isRewardUnlocked(R.reward_rotater)) {
            variants.push(defaultBuildingVariant);
        }
        if (root.hubGoals.isRewardUnlocked(R.reward_rotater_ccw)) {
            variants.push($.enumRotaterVariants.ccw);
        }
        if (root.hubGoals.isRewardUnlocked(R.reward_rotater_180)) {
            variants.push($.enumRotaterVariants.rotate180);
        }
        return variants;
    },
})
,
HubGoals: ({ $super, $old }) => ({
    deserialize(data, root) {  // Modify for 解锁: 允许合并解锁多项奖励
        $old.deserialize.bind(this)(data, root);

        const levels = root.gameMode.getLevelDefinitions();
        // Compute gained rewards
        for (let i = 0; i < this.level - 1; ++i) {
            if (i < levels.length) {
                const reward = levels[i].reward;
                this.gainedRewards[reward] = (this.gainedRewards[reward] || 0) + 1;
                if (reward instanceof Array) {  // add for combination rewards
                    for (const rewardId of reward) {
                        this.gainedRewards[rewardId] = (this.gainedRewards[rewardId] || 0) + 1;
                    }
                } //
            }
        }
    },

    onGoalCompleted() {  // Modify for 解锁: 允许合并解锁多项奖励
        const reward = this.currentGoal.reward;
        this.gainedRewards[reward] = (this.gainedRewards[reward] || 0) + 1;
        if (reward instanceof Array) {  // add for combination rewards
            for (const rewardId of reward) {
                this.gainedRewards[rewardId] = (this.gainedRewards[rewardId] || 0) + 1;
            }
        } //

        this.root.app.gameAnalytics.handleLevelCompleted(this.level);
        ++this.level;
        this.computeNextGoal();

        this.root.signals.storyGoalCompleted.dispatch(this.level - 1, reward);
    },

    updateRequiremenShapeKeys() {  // New method for 交付限制: 记录中心所需图形
        let keySet = new Set();
        // blueprint & redprint
        keySet.add(this.root.gameMode.getBlueprintShapeKey());
        keySet.add(this.root.gameMode.getRedprintShapeKey());
        // goal
        keySet.add(this.root.hubGoals.currentGoal.definition.getHash());
        // upgrades
        const upgrades = this.root.gameMode.getUpgrades();
        for (const upgradeId in upgrades) {  // each upgrade type
            const tiers = upgrades[upgradeId];
            const currentLevel = this.getUpgradeLevel(upgradeId);
            if (currentLevel >= tiers.length) {
                // Max level
                continue;
            }
            const tier = tiers[currentLevel];
            for (const requirement of tier.required) {  // each required shape
                keySet.add(requirement.shape);
            }
        }
        this.requiredShapeKeys = keySet;
        logger.log("requiredShapeKeys:", this.requiredShapeKeys);
    },

    computeFreeplayShape(level) {  // Modify for 自由关卡
        const SHAPE_ALL_KIND = [
            '111111111111', '11111111112_', '111111112_2_', '11111112_12_', 
            '1111112_112_', '1111112_2_2_', '111112_1112_', '111112_12_2_', 
            '111112_2_12_', '11112_11112_', '11112_112_2_', '11112_12_12_', 
            '11112_2_112_', '11112_2_2_2_', '1112_1112_2_', '1112_112_12_', 
            '1112_12_112_', '1112_12_2_2_', '1112_2_12_2_', '1112_2_2_12_', 
            '112_112_112_', '112_112_2_2_', '112_12_12_2_', '112_12_2_12_', 
            '112_2_112_2_', '112_2_12_12_', '112_2_2_2_2_', '12_12_12_12_', 
            '12_12_2_2_2_', '12_2_12_2_2_', '2_2_2_2_2_2_'
        ];  // length = 31

        const rng = new $.RandomNumberGenerator(this.root.map.seed + "/" + level);
        const hard = level >= 0;
    
        // let layers = rng.nextIntRange(maxLayer);
        let layers = 1;
        let code = "";
        for (var layerIndex = 0; layerIndex < layers; layerIndex++) {
            let quads = Array(12).fill(null);
    
            let subShapeStr;
            if (level < 100) {
                // iter all kind of shape
                let factor = this.root.map.seed;
                if (factor % 31 === 0 || factor % 31 === 1 || factor % 31 === 30) {
                    factor += 7;
                }
                const kind_index = factor * level % 31;
                logger.log(kind_index);
                subShapeStr = SHAPE_ALL_KIND[kind_index];
            } else {
                subShapeStr = rng.choice(SHAPE_ALL_KIND);
            }
            // rotation
            const rot = rng.nextIntRange(12);
            subShapeStr = subShapeStr.slice(rot).concat(subShapeStr.slice(0, rot));
        
            // subShape
            let angle = 0;
            for (let subShape of subShapeStr) {
                if (subShape == '1') {
                    quads[angle++] = { subShape, color: $.enumColors.uncolored, linkedBefore: false};
                } else if (subShape == '2') {
                    quads[angle++] = { subShape, color: $.enumColors.uncolored, linkedBefore: false};
                } else {
                    quads[angle++] = { subShape, color: $.enumColors.uncolored, linkedBefore: true};
                }
            }
    
            // color
            let groups = this._findFeature(rng, subShapeStr, hard);
            if (hard) {
                groups = [rng.choice(groups)];  // simple color group
                // logger.log("group", groups[0]);
            }
            const colors = this.generateRandomColorSet(rng, hard);
            if (hard) {
                colors.push($.enumColors.uncolored);
            }
            var color = rng.choice(colors); // init color
            for (let group of groups) {
                // diff color for diff part
                for (let part of group) {
                    // change color by chance
                    if (rng.next() > 0.5) {
                        color = rng.choice(colors);
                    }
                    // logger.log("part:", color, part);
                    part.forEach(i => {
                        if (quads[i % 12].linkedBefore) {
                            i += 11;  // i -= 1;
                        }
                        const oriColor = quads[i % 12].color;
                        quads[i % 12].color = $.enumColorMixingResults[oriColor][color];
                    });
                }
            }
    
            // convert to text
            let layertext = "";
            if (quads[0].linkedBefore)
                layertext = "--";
            for (let i = 0; i < quads.length; i++) {
                const {subShape, color, linkedBefore} = quads[i];
                if (linkedBefore)
                    continue;
                layertext += subShape + $.enumColorToShortcode[color];
            }
    
            if (layertext == "--2r2r2r2r2r2r"
                    || layerIndex == "1b1b1b1b1b1b1b1b1b1b2b"
                    || layerIndex == m1
                    || layerIndex == m2
                    || layerIndex == m3) {
                layerIndex--;
                continue;
            }
            code += layertext + ":";
        }
        code = code.replace(/:+$/, "");  // remove tail ':'
        const definition = $.ShapeDefinition.fromShortKey(code);
        return this.root.shapeDefinitionMgr.registerOrReturnHandle(definition);
    },

    _findFeature(rng, subShapes, acceptRandom = false) {
        let s = subShapes.replaceAll('_', '2');
    
        const [S, S_i] = this._longestPalindrome(s + s.slice(0, 6));
        const halfS = S.length / 2;
        const symmetricW = halfS * halfS;
        // const symmetricW = S.length * S.length;
        const [R, R_i, R_r] = this._longestRepeatedSubstring(s + s.slice(0, 3));
        const repeatedW = R.length * R.length;
        const randomizedW = acceptRandom ? 9 : 0;
        const rand = rng.nextIntRange(0, symmetricW + repeatedW + randomizedW);
    
        // logger = console;
        if (rand < symmetricW) {
            logger.log("symmetric", S, S_i);
            const group1 = [], group2 = [[], []];
            for (let i = 0; i < halfS; i++) {
                const a = S_i + i;
                const b = S_i + S.length - 1 - i;
                group1.push([a, b]);
                group2[0].push(a);
                group2[1].push(b);
            }
            return [group1, group2];
        } else if (rand < symmetricW + repeatedW) {
            logger.log("repeated", R, R_i, R_r);
            const group1 = [], group2 = [[], []];
            for (let i = 0; i < R.length; i++) {
                const a = R_i + i;
                const b = R_r + i;
                group1.push([a, b]);
                group2[0].push(a);
                group2[1].push(b);
            }
            return [group1, group2];
        } else {
            const partNum = rng.nextIntRange(2, 4);  // [2,3]
            const group = Array(partNum).fill([]);
            Array(12).fill(0).forEach(
                (_, index) => group[rng.nextIntRange(0, partNum)].push(index)
            );
            logger.log("randomized", partNum);
            return [group];
        }
    },

    _longestPalindrome(str) {
        function isPalindrome(str) {
            const reversed = str.split('').reverse().join('');
            return str === reversed;
        }
    
        let longest = '', longest_i = 0;
        for (let i = 0; i < str.length; i++) {
            for (let j = i + 1; j < str.length; j++) {
                const substring = str.slice(i, j + 1);
                if (isPalindrome(substring) && substring.length > longest.length) {
                    longest = substring;
                    longest_i = i;
                }
            }
        }
        return [longest, longest_i];
    },
    
    _longestRepeatedSubstring(str) {
        let longest = '', longest_i = 0, longest_r = 0;
        for (let i = 0; i < str.length; i++) {
            for (let j = i + 1; j < str.length; j++) {
                const substring = str.slice(i, j + 1);
                if (str.includes(substring, i + 1) && substring.length > longest.length) {
                    longest = substring;
                    longest_i = i;
                    longest_r = str.indexOf(substring, i + 1);
                }
            }
        }
        return [longest, longest_i, longest_r];
    },
})
,
HUDSandboxController: ({ $super, $old }) => ({
    modifyLevel(amount) {  // Modify for 解锁: 允许合并解锁多项奖励
        $old.modifyLevel.bind(this)(amount);
        const hubGoals = this.root.hubGoals;

        // Compute gained rewards
        hubGoals.gainedRewards = {};
        const levels = this.root.gameMode.getLevelDefinitions();
        for (let i = 0; i < hubGoals.level - 1; ++i) {
            if (i < levels.length) {
                const reward = levels[i].reward;
                hubGoals.gainedRewards[reward] = (hubGoals.gainedRewards[reward] || 0) + 1;
                if (reward instanceof Array) {  // add for combination rewards
                    for (const rewardId of reward) {
                        hubGoals.gainedRewards[rewardId] = (hubGoals.gainedRewards[rewardId] || 0) + 1;
                    }
                } //
            }
        }
        this.root.hubGoals.updateRequiremenShapeKeys();
    },
})
,
WiredPinsSystem: ({ $super, $old }) => ({
    drawChunk(parameters, chunk) {
        const contents = chunk.containedEntities;
    
        for (let i = 0; i < contents.length; ++i) {
            const entity = contents[i];
            const pinsComp = entity.components.WiredPins;
            if (!pinsComp) {
                continue;
            }
    
            const staticComp = entity.components.StaticMapEntity;
            const slots = pinsComp.slots;
    
            for (let j = 0; j < slots.length; ++j) {
                const slot = slots[j];
                const tile = staticComp.localTileToWorld(slot.pos);
                
                // 允许渲染区块外的部分
                // if (!chunk.tileSpaceRectangle.containsPoint(tile.x, tile.y)) {
                //     // Doesn't belong to this chunk
                //     continue;
                // }
                const worldPos = tile.toWorldSpaceCenterOfTile();
    
                // Culling
                if (
                    !parameters.visibleRect.containsCircle(worldPos.x, worldPos.y, globalConfig.halfTileSize)
                ) {
                    continue;
                }
    
                const effectiveRotation = Math.radians(
                    staticComp.rotation + $.enumDirectionToAngle[slot.direction]
                );
    
                if (staticComp.getMetaBuilding().getRenderPins()) {
                    $.drawRotatedSprite({
                        parameters,
                        sprite: this.pinSprites[slot.type],
                        x: worldPos.x,
                        y: worldPos.y,
                        angle: effectiveRotation,
                        size: globalConfig.tileSize + 2,
                        offsetX: 0,
                        offsetY: 0,
                    });
                }
    
                // Draw contained item to visualize whats emitted
                const enumTypeToSize = {
                    boolean: 9,
                    shape: 9,
                    color: 14,
                };
                const value = slot.value;
                if (value) {
                    const offset = new Vector(0, -9.1).rotated(effectiveRotation);
    
                    value.drawItemCenteredClipped(
                        worldPos.x + offset.x,
                        worldPos.y + offset.y,
                        parameters,
                        enumTypeToSize[value.getItemType()]
                    );
                }
            }
        }
    },
})
,
// 交付限制 & 交换过滤器
ItemProcessorOverlaysSystem: ({ $super, $old }) => ({
    /**
     *
     * @param {import("../../core/draw_utils").DrawParameters} parameters
     * @param {MapChunkView} chunk
     */
    drawChunk(parameters, chunk) {
        const contents = chunk.containedEntitiesByLayer.regular;
        for (let i = 0; i < contents.length; ++i) {
            const entity = contents[i];
            const processorComp = entity.components.ItemProcessor;
            const filterComp = entity.components.Filter;

            // Draw processor overlays
            if (processorComp) {
                const requirement = processorComp.processingRequirement;
                if (!requirement && processorComp.type !== $.enumItemProcessorTypes.reader) {
                    continue;
                }

                if (this.drawnUids.has(entity.uid)) {
                    continue;
                }
                this.drawnUids.add(entity.uid);

                switch (requirement) {
                    case $.enumItemProcessorRequirements.painterQuad: {
                        this.drawConnectedSlotRequirement(parameters, entity, { drawIfFalse: true });
                        break;
                    }
                    // add hub requirements
                    case $.enumItemProcessorRequirements.hub: {
                        this.drawHubDeliverSlotRequirement(parameters, entity);
                    }
                    //
                }

                if (processorComp.type === $.enumItemProcessorTypes.reader) {
                    this.drawReaderOverlays(parameters, entity);
                }
            }

            // Draw filter overlays
            else if (filterComp) {
                const variant = entity.components.StaticMapEntity.getVariant();
                // add for skip to draw ConnectedSlot on swap_filter
                if (variant === $.enumFilterVariants.swap_filter) {
                    continue;
                }
                //
                if (this.drawnUids.has(entity.uid)) {
                    continue;
                }
                this.drawnUids.add(entity.uid);

                this.drawConnectedSlotRequirement(parameters, entity, { drawIfFalse: false });
            }
        }
    },

    /**
     *
     * @param {import("../../core/draw_utils").DrawParameters} parameters
     * @param {Entity} entity
     */
    drawHubDeliverSlotRequirement(parameters, entity) {  // New method for 交付限制: 中心口画禁止标志
        // logger.log("drawHubDeliverSlotRequirement(", parameters, entity, ")");
        const staticComp = entity.components.StaticMapEntity;
        const acceptorComp = entity.components.ItemAcceptor;
        const slots = acceptorComp.slots;
        
        const now = this.root.time.now();
        for (let slotIndex = 0; slotIndex < slots.length; ++slotIndex) {
            const slot = slots[slotIndex];
            if (now < slot.showDisableDDL) {
                const pos = staticComp.origin.add(slot.pos);
                
                let bias;
                switch (slot.direction) {
                    case enumDirection.top: { bias = new $.Vector(0, -1); break; }
                    case enumDirection.right: { bias = new $.Vector(1, 0); break; }
                    case enumDirection.bottom: { bias = new $.Vector(0, 1); break; }
                    case enumDirection.left: { bias = new $.Vector(-1, 0); break; }
                }

                const pulse = $.smoothPulse(this.root.time.now());
                parameters.context.globalAlpha = 0.6 + 0.4 * pulse;
                const sprite = this.spriteDisabled;
                sprite.drawCachedCentered(
                    parameters,
                    (pos.x + bias.x + 0.5) * $.globalConfig.tileSize,
                    (pos.y + bias.y + 0.5) * $.globalConfig.tileSize,
                    $.globalConfig.tileSize * (0.7 + 0.2 * pulse)
                );
            }
        }
        parameters.context.globalAlpha = 1;
    },
})
,
// X开采器
MetaMinerBuilding: ({ $super, $old }) => ({
    getSpecialOverlayRenderMatrix(rotation, rotationVariant, variant, entity) {
        if (variant === $.enumMinerVariants.x_miner) {
            return $.generateMatrixRotations([1, 1, 1, 1, 0, 1, 1, 1, 1])[rotation];
        } else {
            return $old.getSpecialOverlayRenderMatrix.bind(this)(rotation, rotationVariant, variant, entity);
        }
    },

    updateVariants(entity, rotationVariant, variant) {
        entity.components.Miner.chainable = (variant === $.enumMinerVariants.chainable);
        entity.components.Miner.x_miner = (variant === $.enumMinerVariants.x_miner);
    },
})
,
MinerSystem: ({ $super, $old }) => ({
    update() {
        const baseMiningSpeed = this.root.hubGoals.getMinerBaseSpeed();
    
        for (let i = 0; i < this.allEntities.length; ++i) {
            const entity = this.allEntities[i];
            const minerComp = entity.components.Miner;
            let miningSpeed = baseMiningSpeed;
            if (globalConfig.debug.instantMiners) {
                miningSpeed *= 100;
            }
    
            // Reset everything on recompute
            if (this.needsRecompute) {
                minerComp.cachedChainedMiner = null;
            }
    
            // Check if miner is above an actual tile
            if (!minerComp.cachedMinedItem) {
                const staticComp = entity.components.StaticMapEntity;
                const tileBelow = this.root.map.getLowerLayerContentXY(
                    staticComp.origin.x,
                    staticComp.origin.y
                );
                if (!tileBelow) {
                    continue;
                }
                if (minerComp.x_miner) {
                    if (tileBelow.getItemType() === "shape") {
                        const x_def = $.ShapeDefinition.fromShortKey("1u2u1u2u1u2u1u2u");
                        minerComp.cachedMinedItem = new $.ShapeItem(x_def);
                    } else {
                        continue;
                    }
                } else {
                    minerComp.cachedMinedItem = tileBelow;
                }
            }
    
            // First, try to get rid of chained items
            if (minerComp.itemChainBuffer.length > 0) {
                if (this.tryPerformMinerEject(entity, minerComp.itemChainBuffer[0])) {
                    minerComp.itemChainBuffer.shift();
                    continue;
                }
            }
    
            if (minerComp.x_miner) {
                miningSpeed *= x_minerSpeedMultiplier;
            }
            const mineDuration = 1 / miningSpeed;
            const timeSinceMine = this.root.time.now() - minerComp.lastMiningTime;
            if (timeSinceMine > mineDuration) {
                // Store how much we overflowed
                const buffer = Math.min(timeSinceMine - mineDuration, this.root.dynamicTickrate.deltaSeconds);
    
                if (this.tryPerformMinerEject(entity, minerComp.cachedMinedItem)) {
                    // Analytics hook
                    this.root.signals.itemProduced.dispatch(minerComp.cachedMinedItem);
                    // Store mining time
                    minerComp.lastMiningTime = this.root.time.now() - buffer;
                }
            }
        }
    
        // After this frame we are done
        this.needsRecompute = false;
    },
})
,
// 交换逻辑
ShapeDefinitionManager: ({ $super, $old }) => ({
    /**
     * @param {ShapeDefinition} definition
     * @returns {boolean}
     */
    canCutHalf(definition) {
        const key = "cch/" + definition.getHash();
        if (this.operationCache[key]) {
            return this.operationCache[key];
        }
        if (!definition.isX_Shape()) {
            return (this.operationCache[key] = true);
        }

        for (let quadrants of definition.layers) {
            for (let quad of [5, 11]) {
                const cur = quadrants[quad];
                const next = quadrants[(quad + 1) % 12];
                if ((cur && cur.linkedAfter) || (next && next.linkedBefore)) {
                    // logger.log("canCutHalf[false](", definition, ")");
                    return (this.operationCache[key] = false);
                }
            }
        }
        // logger.log("canCutHalf[true](", definition, ")");
        return (this.operationCache[key] = true);
    },

    /**
     * Generates a definition for swapping two shapes
     * @param {ShapeDefinition} definition1
     * @param {ShapeDefinition} definition2
     * @returns {ShapeDefinition}
     */
    shapeActionSwap(definition1, definition2) {
        const key = "swap/" + definition1.getHash() + "/" + definition2.getHash();
        if (this.operationCache[key]) {
            return /** @type {[ShapeDefinition, ShapeDefinition]} */ (this.operationCache[key]);
        }

        let firstShape;
        let secondShape;
        if (this.canCutHalf(definition1) && this.canCutHalf(definition2)) {
            const r1 = definition1.cloneFilteredByQuadrants([2, 3]);
            const r2 = definition2.cloneFilteredByQuadrants([2, 3]);
            const l1 = definition1.cloneFilteredByQuadrants([0, 1]);
            const l2 = definition2.cloneFilteredByQuadrants([0, 1]);

            if (r1.isEntirelyEmpty()) {
                firstShape = l2;
            } else if (l2.isEntirelyEmpty()) {
                firstShape = r1;
            } else {
                firstShape = r1.cloneAndStackWith(l2);
            }
            if (l1.isEntirelyEmpty()) {
                secondShape = r2;
            } else if (r2.isEntirelyEmpty()) {
                secondShape = l1;
            } else {
                secondShape = l1.cloneAndStackWith(r2);
            }
        } else {
            // TODO:
            // firstShape = $.ShapeDefinition({ layers: [] });
            // secondShape = $.ShapeDefinition({ layers: [] });
            firstShape = definition1;
            secondShape = definition2;
        }

        return /** @type {[ShapeDefinition, ShapeDefinition]} */ (this.operationCache[key] = [
            this.registerOrReturnHandle(firstShape),
            this.registerOrReturnHandle(secondShape),
        ]);
    },
})
,
MetaVirtualProcessorBuilding: ({ $super, $old }) => ({
    getAvailableVariants(root) {  // Modify for 解锁: 删除模拟堆叠等
        return [
            $.enumVirtualProcessorVariants.rotater,
            $.enumVirtualProcessorVariants.painter,
            // $.enumVirtualProcessorVariants.shape_swapper,
        ];
    },

    updateVariants(entity, rotationVariant, variant) {  // Modify for 模拟交换器: 新增变体初始化
        if (variant == $.enumVirtualProcessorVariants.shape_swapper) {
            entity.components.LogicGate.type = $.enumLogicGateType.shape_swapper;
            const pinComp = entity.components.WiredPins;
            pinComp.setSlots([
                {
                    pos: new Vector(0, 0),
                    direction: enumDirection.top,
                    type: $.enumPinSlotType.logicalEjector,
                },
                {
                    pos: new Vector(0, 0),
                    direction: enumDirection.bottom,
                    type: $.enumPinSlotType.logicalAcceptor,
                },
                {
                    pos: new Vector(1, 0),
                    direction: enumDirection.top,
                    type: $.enumPinSlotType.logicalEjector,
                },
                {
                    pos: new Vector(1, 0),
                    direction: enumDirection.bottom,
                    type: $.enumPinSlotType.logicalAcceptor,
                },
            ]);
        } else {
            return $old.updateVariants.bind(this)(entity, rotationVariant, variant);
        }
    }
})
,
// 分析器 & 模拟交换器
LogicGateSystem: ({ $super, $old }) => ({
    compute_ANALYZE(parameters) {
        const item = parameters[0];
        if (!item || item.getItemType() !== "shape") {
            // Not a shape
            return [null, null];
        }
    
        const definition = /** @type {ShapeItem} */ (item).definition;
        const lowerLayer = /** @type {import("../shape_definition").ShapeLayer} */ (definition.layers[0]);
        if (!lowerLayer) {
            return [null, null];
        }
    
        if (!definition.isX_Shape()) {
            return $old.compute_ANALYZE.bind(this)(parameters);
        }
    
        const topRightContent = lowerLayer[0];
    
        if (!topRightContent || topRightContent.subShape === null) {
            return [null, null];
        }
    
        const subShape = topRightContent.subShape;
        // logger.log(topRightContent.subShape);
        if (subShape === $.enumSubShape.X30) {
            return [
                $.COLOR_ITEM_SINGLETONS[topRightContent.color],
                this.root.shapeDefinitionMgr.getShapeItemFromShortKey("1u1u1u1u1u1u1u1u1u1u1u1u"),
            ];
        } else if (subShape === $.enumSubShape.X60) {
            if (!topRightContent.linkedBefore) {
                return [
                    $.COLOR_ITEM_SINGLETONS[topRightContent.color],
                    this.root.shapeDefinitionMgr.getShapeItemFromShortKey("2u2u2u2u2u2u"),
                ];
            } else {
                return [
                    $.COLOR_ITEM_SINGLETONS[topRightContent.color],
                    this.root.shapeDefinitionMgr.getShapeItemFromShortKey("--2u2u2u2u2u2u"),
                ];
            }
        } else {
            // logger.log("shit");
            const layers = [Array(4).fill({ subShape, color: $.enumColors.uncolored }),];
            const newDefinition = new $.ShapeDefinition({ layers });
            return [
                $.COLOR_ITEM_SINGLETONS[topRightContent.color],
                this.root.shapeDefinitionMgr.getShapeItemFromDefinition(newDefinition),
            ];
        }
    },

    compute_SWAPPER(parameters) {
        const leftItem = parameters[0];
        const rightItem = parameters[1];

        if (!leftItem || !rightItem) {
            // Empty
            return [null, null];
        }

        if (leftItem.getItemType() !== "shape" || rightItem.getItemType() !== "shape") {
            // Bad type
            return [null, null];
        }

        const definition1 = /** @type {ShapeItem} */ (leftItem).definition;
        const definition2 = /** @type {ShapeItem} */ (rightItem).definition;
        if ( ! (
            ((definition1.isX_Shape && definition1.isX_Shape()) === (definition2.isX_Shape && definition2.isX_Shape()))
            && this.root.shapeDefinitionMgr.canCutHalf(definition1)
            && this.root.shapeDefinitionMgr.canCutHalf(definition2)
        ) ) {
            // Kind mismatch or Can't swap
            return [null, null];
        }

        const result = this.root.shapeDefinitionMgr.shapeActionSwap(definition1, definition2);

        return [
            result[0].isEntirelyEmpty()
                ? null
                : this.root.shapeDefinitionMgr.getShapeItemFromDefinition(result[0]),
            result[1].isEntirelyEmpty()
                ? null
                : this.root.shapeDefinitionMgr.getShapeItemFromDefinition(result[1]),
        ];
    },
})
,
// 存储器上限
MetaStorageBuilding: ({ $super, $old }) => ({
    getAdditionalStatistics(root, variant) {
        return [[T.ingame.buildingPlacement.infoTexts.storage, $.formatBigNumber(storageSize)]];
    },
    setupEntityComponents(entity) {
        $old.setupEntityComponents.bind(this)(entity);
        // do after, chang maximumStorage
        entity.components.Storage.maximumStorage = storageSize;
    }
})
,
// 蓝图显示
HUDBlueprintPlacer: ({ $super, $old }) => ({
    createElements(parent) {
        this.blueprintCostShapeKey = this.root.gameMode.getBlueprintShapeKey();
        const blueprintCostShape = this.root.shapeDefinitionMgr.getShapeFromShortKey(
            this.blueprintCostShapeKey
        );
        this.blueprintCostShapeCanvas = blueprintCostShape.generateAsCanvas(80);

        this.costDisplayParent = $.makeDiv(parent, "ingame_HUD_BlueprintPlacer", [], ``);

        $.makeDiv(this.costDisplayParent, null, ["label"], T.ingame.blueprintPlacer.cost);
        this.costContainer = $.makeDiv(this.costDisplayParent, null, ["costContainer"], "");
        this.costDisplayText = $.makeDiv(this.costContainer, null, ["costText"], "");
        this.costContainer.appendChild(this.blueprintCostShapeCanvas);
    },
    updateBlueprintCostShapeCanvas() {  // new method
        logger.log("update blueprint, from", this.blueprintCostShapeKey, "to", this.root.gameMode.getBlueprintShapeKey());
        this.blueprintCostShapeKey = this.root.gameMode.getBlueprintShapeKey();
        const blueprintCostShape = this.root.shapeDefinitionMgr.getShapeFromShortKey(
            this.blueprintCostShapeKey
        );
        const newBlueprintCostShapeCanvas = blueprintCostShape.generateAsCanvas(80);
        this.costContainer.replaceChild(newBlueprintCostShapeCanvas, this.blueprintCostShapeCanvas);
        this.blueprintCostShapeCanvas = newBlueprintCostShapeCanvas;
    },
    update() {
        if (this.blueprintCostShapeKey != this.root.gameMode.getBlueprintShapeKey()) {
            this.updateBlueprintCostShapeCanvas();
        }
        $old.update.bind(this)();
    },
})
,
// 四染去除
MetaPainterBuilding: ({ $super, $old }) => ({
    getAvailableVariants(root) {
        let variants = [defaultBuildingVariant, $.enumPainterVariants.mirrored];
        if (root.hubGoals.isRewardUnlocked(R.reward_painter_double)) {
            variants.push($.enumPainterVariants.double);
        }
        if (
            root.hubGoals.isRewardUnlocked(R.reward_painter_quad) &&
            root.gameMode.getSupportsWires()
        ) {
            variants.push($.enumPainterVariants.quad);
        }
        return variants;
    },
})
,
// 图形信息窗口
HUDShapeViewer: ({ $super, $old }) => ({
    renderForShape(definition) {
        this.visible = true;
        this.root.app.inputMgr.makeSureAttachedAndOnTop(this.inputReciever);

        $.removeAllChildren(this.renderArea);

        this.currentShapeKey = definition.getHash();
        const isX_Shape = definition.isX_Shape();

        const layers = definition.layers;
        this.contentDiv.setAttribute("data-layers", layers.length);

        for (let i = layers.length - 1; i >= 0; --i) {
            const layerElem = $.makeDiv(this.renderArea, null, ["layer", "layer-" + i]);

            let fakeLayers = [];
            for (let k = 0; k < i; ++k) {
                fakeLayers.push([null, null, null, null]);
            }
            fakeLayers.push(layers[i]);

            const thisLayerOnly = new $.ShapeDefinition({ layers: fakeLayers });
            const thisLayerCanvas = thisLayerOnly.generateAsCanvas(160);
            layerElem.appendChild(thisLayerCanvas);

            if (isX_Shape) {  // 不显示象限颜色信息（懒）
                continue;
            }

            for (let quad = 0; quad < 4; ++quad) {
                const quadElem = $.makeDiv(layerElem, null, ["quad", "quad-" + quad]);

                const contents = layers[i][quad];
                if (contents) {
                    const colorLabelElem = $.makeDiv(
                        quadElem,
                        null,
                        ["colorLabel"],
                        T.ingame.colors[contents.color]
                    );
                } else {
                    const emptyLabelElem = $.makeDiv(
                        quadElem,
                        null,
                        ["emptyLabel"],
                        T.ingame.shapeViewer.empty
                    );
                }
            }
        }
    },
})
,
// 优先器-接收入口
BeltPath: ({ $super, $old }) => ({
    computePassOverFunctionWithoutBelts(entity, matchingSlotIndex) {
        // do before
        const systems = this.root.systemMgr.systems;
        const prioritizerComp = entity.components[PrioritizerComponentID];
        if (prioritizerComp) {
            // It's a prioritizer
            return function (item) {
                if (systems.prioritizer.tryAcceptItem(entity, matchingSlotIndex, item)) {
                    return true;
                }
            }
        }

        return $old.computePassOverFunctionWithoutBelts.bind(this)(entity, matchingSlotIndex);
    },
})
,
ItemEjectorSystem: ({ $super, $old }) => ({
    tryPassOverItem(item, receiver, slotIndex) {
        // do before
        const systems = this.root.systemMgr.systems;
        const prioritizerComp = receiver.components[PrioritizerComponentID];
        if (prioritizerComp) {
            // It's a prioritizer
            if (systems.prioritizer.tryAcceptItem(receiver, slotIndex, item)) {
                return true;
            }

            return false;
        }

        return $old.tryPassOverItem.bind(this)(item, receiver, slotIndex);
    },
})
,
// 交换过滤器
MetaFilterBuilding: ({ $super, $old }) => ({
    getSpecialOverlayRenderMatrix(rotation, rotationVariant, variant, entity) {
        if (variant === $.enumFilterVariants.swap_filter) {
            return $.generateMatrixRotations([1, 0, 1, 1, 1, 1, 1, 1, 1])[rotation];
        } else {
            return $old.getSpecialOverlayRenderMatrix.bind(this)(rotation, rotationVariant, variant, entity);
        }
    },

    setupEntityComponents(entity) {
        entity.addComponent(new $.WiredPinsComponent({ slots: [] }));
        entity.addComponent(new $.ItemAcceptorComponent({ slots: [] }));
        entity.addComponent(new $.ItemEjectorComponent({ slots: [] }));
        entity.addComponent(new $.FilterComponent());
    },

    getAvailableVariants(root) {
        if (root.hubGoals.isRewardUnlocked(R.reward_filter_swap)) {
            return [defaultBuildingVariant, $.enumFilterVariants.swap_filter];
        }
        return [defaultBuildingVariant];
    },

    updateVariants(entity, rotationVariant, variant) {
        switch (variant) {
            case defaultBuildingVariant: {
                entity.components.WiredPins.setSlots([
                    { pos: new Vector(0, 0),  direction: enumDirection.left, type: $.enumPinSlotType.logicalAcceptor, },
                ]);
                entity.components.ItemAcceptor.setSlots([
                    { pos: new Vector(0, 0), direction: enumDirection.bottom, },
                ]);
                entity.components.ItemEjector.setSlots([
                    { pos: new Vector(0, 0), direction: enumDirection.top, },
                    { pos: new Vector(1, 0), direction: enumDirection.right, },
                ]);
                break;
            }
            case $.enumFilterVariants.swap_filter: {
                entity.components.WiredPins.setSlots([]);
                entity.components.ItemAcceptor.setSlots([
                    { pos: new Vector(0, 0), direction: enumDirection.bottom, },
                    { pos: new Vector(0, 0), direction: enumDirection.left, },
                ]);
                entity.components.ItemEjector.setSlots([
                    { pos: new Vector(0, 0), direction: enumDirection.top, },
                    { pos: new Vector(0, 0), direction: enumDirection.right, },
                ]);
                break;
            }
            default:
                assert(false, "Unknown filter variant: " + variant);
        };
    },
})
,
FilterSystem: ({ $super, $old }) => ({
    tryAcceptItem(entity, slot, item) {
        const variant = entity.components.StaticMapEntity.getVariant();
        if (variant === $.enumFilterVariants.swap_filter) {
            return this._tryAcceptItem_swap_filter(entity, slot, item);
        } else {
            return $old.tryAcceptItem.bind(this)(entity, slot, item);
        }
    },

    _tryAcceptItem_swap_filter(entity, slot, item) {
        const filterComp = entity.components.Filter;
        // assert(filterComp, "entity is no filter");

        // Figure out which list we have to check
        let listToCheck;
        if (slot === 0) {
            // MAIN SLOT
            if (item.getItemType() === "shape" &&
                    this.root.shapeDefinitionMgr.canCutHalf &&
                    this.root.shapeDefinitionMgr.canCutHalf(/** @type {ShapeItem} */ (item).definition) ) {
                listToCheck = filterComp.pendingItemsToLeaveThrough;
            } else {
                listToCheck = filterComp.pendingItemsToReject;
            }
        } else {
            // SECONDARY SLOT
            listToCheck = filterComp.pendingItemsToReject;
        }

        if (listToCheck.length >= MAX_ITEMS_IN_QUEUE_FILTER) {
            // Busy
            return false;
        }

        // Actually accept item
        listToCheck.push({
            item,
            progress: 0.0,
        });
        return true;
    }
})
,
// // some
// SomeClass: ({ $super, $old }) => ({
//     someFunction() {},
// })
// ,
};  // end CLASS_EXTENSION

// ############################


function checkRequirements_hub({entity, item, slotIndex}) {  // 交付限制: 检查交付物品
    // logger.log("checkRequirements_hub(", this, entity, item, slotIndex, ")");
    if (this.root.hubGoals.requiredShapeKeys === undefined) {
        this.root.hubGoals.updateRequiremenShapeKeys();
        this.root.signals.storyGoalCompleted.add(() => this.root.hubGoals.updateRequiremenShapeKeys());
        this.root.signals.upgradePurchased.add(() => this.root.hubGoals.updateRequiremenShapeKeys());
    }
    const key = item.definition.getHash();
    const required = this.root.hubGoals.requiredShapeKeys.has(key);
    if (required) {
        return true;
    }
    const now = this.root.time.now();
    // add an attr to {ItemAcceptorSlotConfig}
    entity.components.ItemAcceptor.slots[slotIndex].showDisableDDL = now + 1;

    if (this.root.gameMode.getRedprintShapeKey) {
        return affordRedprint(this.root, REDPRINT_COST_PER_WASTED_SHAPE);
    } else {
        return false;
    }
}

function affordRedprint(root, cost) {  // 交付限制: 支付红图
    if (root.gameMode.getHasFreeCopyPaste()) {
        return true;
    }
    const redprintKey = root.gameMode.getRedprintShapeKey();
    const store = root.hubGoals.getShapesStoredByKey(redprintKey);
    if (store >= cost) {
        root.hubGoals.takeShapeByKey(redprintKey, cost);
        return true;
    } else {
        return false;
    }
}

/**
 * Returns true if the entity should accept the given item on the given slot.
 * This should only be called with matching items! I.e. if a color item is expected
 * on the given slot, then only a color item must be passed.
 * @param {Entity} entity
 * @param {BaseItem} item The item to accept
 * @param {number} slotIndex The slot index
 * @returns {boolean}
 */
function checkRequirements_shape_swapper({entity, item, slotIndex}) {  // 交换器: 输入检查
    // assert item is {ShapeItem}
    return this.root.shapeDefinitionMgr.canCutHalf(item.definition);
}

/**
 * Checks whether it's possible to process something
 * @param {Entity} entity
 */
function canProcess_shape_swapper({entity}) {  // 交换器: 处理检查
    const processorComp = entity.components.ItemProcessor;
    const shapeItem1 = /** @type {ShapeItem} */ (processorComp.inputSlots.get(0));
    const shapeItem2 = /** @type {ShapeItem} */ (processorComp.inputSlots.get(1));
    if (!shapeItem1 || !shapeItem2) {
        return false;
    }

    const mgr = this.root.shapeDefinitionMgr;
    const definition1 = shapeItem1.definition;
    const definition2 = shapeItem2.definition;
    return (definition1.isX_Shape() === definition2.isX_Shape()) && mgr.canCutHalf(definition1) && mgr.canCutHalf(definition2);
}

// $.ItemProcessorSystem
function process_SWAPPER(payload) {  // 交换器: 处理
    const item1 = /** @type {ShapeItem} */ (payload.items.get(0));
    const item2 = /** @type {ShapeItem} */ (payload.items.get(1));
    assert(item1 instanceof $.ShapeItem, "Input for item 1 is not a shape");
    assert(item2 instanceof $.ShapeItem, "Input for item 2 is not a shape");

    const newDefinition = this.root.shapeDefinitionMgr.shapeActionSwap(item1.definition, item2.definition);

    const ejectorComp = payload.entity.components.ItemEjector;
    for (let i = 0; i < newDefinition.length; ++i) {
        const definition = newDefinition[i];

        if (definition.isEntirelyEmpty()) {
            ejectorComp.slots[i].lastItem = null;
            continue;
        }

        payload.outItems.push({
            item: this.root.shapeDefinitionMgr.getShapeItemFromDefinition(definition),
            requiredSlot: i,
        });
    }
};

// ############################

// 实体交换器-建筑类
class MetaShapeSwapperBuilding extends $.ModMetaBuilding {
    constructor() {
        super(shape_swapper);
    }

    static getAllVariantCombinations() {
        return [
            {
                name: "_swapper",
                description: "_desc",

                regularImageBase64: RESOURCES["building"]["shape_swapper.png"],
                blueprintImageBase64: RESOURCES["blueprint"]["shape_swapper.png"],
                tutorialImageBase64: RESOURCES["tutorial"]["shape_swapper.png"],
            },
        ];
    }

    getSilhouetteColor() {
        return "#114514";
    }

    getSpecialOverlayRenderMatrix(rotation, rotationVariant, variant, entity) {
        return $.generateMatrixRotations([1, 0, 1, 1, 1, 1, 1, 1, 1])[rotation];
    }
    
    getDimensions(variant = defaultBuildingVariant) {
        return new Vector(2, 1);
    }

    /**
     * @param {GameRoot} root
     * @returns {Array<[string, string]>}
     */
    getAdditionalStatistics(root) {
        const speed = root.hubGoals.getProcessorBaseSpeed($.enumItemProcessorTypes.shape_swapper);
        return [[$.T.ingame.buildingPlacement.infoTexts.speed, $.formatItemsPerSecond(speed)]];
    }

    /**
     * @param {GameRoot} root
     */
    getIsUnlocked(root) {
        return root.hubGoals.isRewardUnlocked(R.reward_shape_swapper);
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        entity.addComponent(
            new $.ItemAcceptorComponent({
                slots: [
                    { pos: new Vector(0, 0), direction: enumDirection.bottom, filter: "shape", },
                    { pos: new Vector(1, 0), direction: enumDirection.bottom, filter: "shape", },
                ],
            })
        );
        entity.addComponent(
            new $.ItemProcessorComponent({
                processorType: $.enumItemProcessorTypes.shape_swapper,
                processingRequirement: $.enumItemProcessorRequirements.shape_swapper,
                inputsPerCharge: 2,
            })
        );
        entity.addComponent(
            new $.ItemEjectorComponent({
                slots: [
                    { pos: new Vector(0, 0), direction: enumDirection.top },
                    { pos: new Vector(1, 0), direction: enumDirection.top },
                ],
            })
        );
    }
}

// 优先器-建筑类
class MetaPrioritizerBuilding extends $.ModMetaBuilding {
    static getAllVariantCombinations() {
        return [
            {
                variant: defaultBuildingVariant,
                name: "_prioritizer",
                description: "_desc",

                regularImageBase64:   RESOURCES["building"]["prioritizer.png"],
                blueprintImageBase64: RESOURCES["blueprint"]["prioritizer.png"],
                tutorialImageBase64:  RESOURCES["tutorial"]["prioritizer.png"],
            },
        ];
    }

    constructor() {
        super("prioritizer");
    }

    getSilhouetteColor() {
        return "#191981";
    }

    getSpecialOverlayRenderMatrix(rotation, rotationVariant, variant, entity) {
        return $.generateMatrixRotations([1,1,1, 0,1,0, 0,1,0])[rotation];
    }
    
    getDimensions(variant = defaultBuildingVariant) {
        return new Vector(1, 2);
    }

    /**
     * @param {GameRoot} root
     * @returns {Array<[string, string]>}
     */
    getAdditionalStatistics(root) {
        const speed = root.hubGoals.getProcessorBaseSpeed($.enumItemProcessorTypes.prioritizer);
        return [[T.ingame.buildingPlacement.infoTexts.speed, $.formatItemsPerSecond(speed)]];
    }

    /**
     * @param {GameRoot} root
     */
    getIsUnlocked(root) {
        return root.hubGoals.isRewardUnlocked(R.reward_prioritizer);
    }

    /**
    * @param {GameRoot} root
    */
    getAvailableVariants(root) {
        return [defaultBuildingVariant];
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        entity.addComponent(
            new $.ItemAcceptorComponent({
                slots: [
                    // The first slot has prior
                    { pos: new Vector(0, 1), direction: enumDirection.bottom },
                    { pos: new Vector(0, 0), direction: enumDirection.left },
                    { pos: new Vector(0, 0), direction: enumDirection.right },
                ],
            })
        );

        entity.addComponent(
            new PrioritizerComponent()
        );

        entity.addComponent(
            new $.ItemEjectorComponent({
                slots: [
                    { pos: new Vector(0, 0), direction: enumDirection.top },
                ],
            })
        );
    }
}

// 优先器-部件类
class PrioritizerComponent extends $.Component {
    static getId() {
        return PrioritizerComponentID;
    }

    static getSchema() {
        return {
            pendingItems: $.types.array(
                $.types.structured({
                    item: $.typeItemSingleton,
                    duration: $.types.float,
                })
            ),
        };
    }

    /**
     * @param {object} param0
     * @param {number=} param0.bufferSize How much this prioritizer can hold
     */
    constructor() {
        super();

        this.clear();
    }

    clear() {
        /**
         * Items in queue to leave through
         * @type {Array<BaseItem>}
         */
        this.pendingItems = [];

        /**
         * @type {Array<BaseItem>}
         */
        this.secondaryItems = [];
        this.secondaryBlocking = false;
    }

}

// 优先器-系统类
class PrioritizerSystem extends $.GameSystemWithFilter {
    constructor(root) {
        super(root, [PrioritizerComponent]);
    }

    update() {
        const now = this.root.time.now();
        for (let i = 0; i < this.allEntities.length; ++i) {
            const entity = this.allEntities[i];

            // Only one ouput slot "0"
            const ejectorSlot = 0;
            const ejectorComp = entity.components.ItemEjector;
            
            const prioritizerComp = entity.components[PrioritizerComponentID];
            const pendingItems = prioritizerComp.pendingItems;
            const secondaryItems = prioritizerComp.secondaryItems;

            // Eject from prioritizer
            if (pendingItems.length > 0) {
                const { item, duration } = pendingItems[0];
                // Check if it's ready to eject
                if (now > duration) {
                    if (ejectorComp.tryEject(ejectorSlot, item)) {
                        pendingItems.shift();
                    }
                }
            }

            if (secondaryItems.length > 0) {
                const item = secondaryItems[0];
                if (ejectorComp.tryEject(ejectorSlot, item)) {
                    secondaryItems.shift();
                }
            }
            prioritizerComp.secondaryBlocking = (secondaryItems.length > 0);
        }
    }

    /**
     * Returns whether this prioritizer accept the item success
     * @param {Entity} entity
     * @param {number} slot
     * @param {BaseItem} item
     */
    tryAcceptItem(entity, slot, item) {
        // logger.log("PrioritizerComponent", ".canAcceptItem", "{", entity, ", ", slot, ", ", item, "}");
        const prioritizerComp = entity.components[PrioritizerComponentID];

        if (slot === 0) {  // Priority to receive items from input slot "0"
            if (prioritizerComp.pendingItems.length >= MAX_ITEMS_IN_QUEUE_PRIORITIZER) {
                // Busy
                return false;
            }
            // refer from "UndergroundBeltComponent.tryAcceptTunneledItem"
            const beltSpeed = this.root.hubGoals.getBeltBaseSpeed();
            const travelDuration = 1.5 / beltSpeed / $.globalConfig.itemSpacingOnBelts;
            const now = this.root.time.now();

            prioritizerComp.pendingItems.push({
                item,
                duration: now + travelDuration,
            });
        } else {  // Secondary slots
            if (prioritizerComp.pendingItems.length > 0 || prioritizerComp.secondaryBlocking) {
                // Busy
                return false;
            }
            prioritizerComp.secondaryItems.push(item);
        }

        return true;
    }

}

// ############################

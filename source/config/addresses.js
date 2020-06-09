module.exports = {
  // List of addresses with a name or label attached

  // feeRecipients for 0x relayers,  https://github.com/0xProject/0x-relayer-registry/blob/master/relayers.json
  // https://github.com/0xTracker/0x-tracker-worker/blob/master/src/relayers/relayer-registry.js
  zrxRelayers: {
    '0xa258b39954cef5cb142fd567a46cddb31a670124': "RadarRelay",
    '0xeb71bad396acaa128aeadbc7dbd59ca32263de01': "IDT",
    '0xe269e891a2ec8585a378882ffa531141205e92e9': 'DDEX',
    '0x6f7ae872e995f98fcd2a7d3ba17b7ddfb884305f': 'Tokenlon',
    '0xb9e29984fe50602e7a619662ebed4f90d93824c7': 'Tokenlon',
    '0x55890b06f0877a01bb5349d93b202961f8e27a9b': 'Shark Relay',
    '0x5e150a33ffa97a8d22f59c77ae5487b089ef62e9': 'TokenJar',
    '0x5dd835a893734b8d556eccf87800b76dda5aedc5': 'BambooRelay',
    '0xc898fbee1cc94c0ff077faa5449915a506eff384': 'BambooRelay',
    '0xc22d5b2951db72b44cfb8089bb8cd374a3c354ea': 'OpenRelay',
    '0x89db81c2dc4adaf10a93705b69289d479d576635': 'OpenRelay',
    '0x4524baa98f9a3b9dec57caae7633936ef96bd708': 'LedgerDex',
    '0x7219612be7036d1bfa933e16ca1246008f38c5fe': 'The Ocean',
    '0x0e8ba001a821f3ce0734763d008c9d7c957f5852': 'Amadeus',
    '0xab8199eba802e7e6634d4389bf23999b7ae6b253': '3xchange',
    '0x66a836664adc7c525c0cc4527dee8619d4faf669': 'BoxSwap',
    '0x013ec57d1237e7727f818b1a35e3506f754304e4': 'GUDecks',
    '0xd9c3ed92520a2f3076a9bd5ea9d4a2c2a0cf6457': 'GUDecks',
    '0xb0d7398d779ee9ffc727d2d5b045a5b441da8233': 'Emoon',
    '0xdcae967431fb51aa7453ec6c06fa544c25e0f1ff': 'Emoon',
    '0x5620413261751d93978c6e752f6c351d10e75238': 'Lake Project',
    '0xa9274fda6d91a063f6aa0cfb172d6eb3b61ecf89': 'MetaMorph',
    '0x4a821aa1affbf7ee89a245bf750d1d7374e77409': 'Tokenmom',
    '0x853da5cecc1ea601ab978c2001565a0377a7dca6': 'Fordex',
    '0x2a5f5f36c20d7e56358db78bbfac0bace25c1198': 'EtherBlockchain',
    '0x8752d14a086cee9b8c108611ba9aefe04042c9f9': 'MARKET protocol',
    '0x0d056bb17ad4df5593b93a1efc29cb35ba4aa38d': 'TokenTrove',

    '0x8124071f810d533ff63de61d0c98db99eeb99d64': 'STAR BIT',
    '0x0681e844593a051e2882ec897ecd5444efe19ff2': 'STAR BIT',
    '0xc370d2a5920344aa6b7d8d11250e3e861434cbdd': 'STAR BIT',

    "0x58a5959a6c528c5d5e03f7b9e5102350e24005f1": 'Erc Dex',
    "0xa71deef328b2c40d0e6525cd248ae749e9208dbb": 'Erc Dex',
    "0x5bf2c11b0aa0c752c6de6fed48dd56fed2a4286d": 'Erc Dex',
    "0x1dd43bbe2264234bccfbb88aadbde331d87719ee": 'Erc Dex',
    "0x3b4ce2ea700ff327c3b4fe624f328c4106fd2885": 'Erc Dex',
    "0x3fa5f23d42847e49d242496ffe2a3c8fda66706c": 'Erc Dex',
    "0x173a2467cece1f752eb8416e337d0f0b58cad795": 'Erc Dex',
    "0x7df569a165bee41ca74374c76bd888ea02dcc4a8": 'Erc Dex',
    "0x3d974ce554fec1acd8d034f13b6640b300689a37": 'Erc Dex',
    "0xbd069e7ad0b7366ed1f0559dd8fe3e8efc0c4a72": 'Erc Dex',
    "0x4411c446756f8ed22343e8fbe8d24607027daffd": 'Erc Dex',
    "0xee2d43b8e4b57477acc2f4def265fe2887865ac0": 'Erc Dex',
    "0x8bf0785306eb675e38b742f59a7fcf05fccdf2b7": 'Erc Dex',
    "0x1956f5afa5d21000145e6cd2fa8ce3f52fa40875": 'Erc Dex',
    "0xa5b8d094f8364a9771c7a2287ee13efa08f847a4": 'Erc Dex',
    "0xc95bf3d3b4d6619119f3a8e29ec1d73ee801b9df": 'Erc Dex',
    "0x28f5cf7044f509af67f473c18b1f5f4f97fb4ce9": 'Erc Dex',
    "0xd592cfa56f4c443fb27008329d67ed7d4edb59c0": 'Erc Dex',

    '0xaf8ae6955d07776ab690e565ba6fbc79b8de3a5d': 'DiversiFi',
    "0x1000000000000000000000000000000000000011": '0x API',
    "0x382310cbb159b64c2e7c5675d110202701a436dd": 'Odee',
    "0x5265bde27f57e738be6c1f6ab3544e82cdc92a8f": 'VeriDex',
    "0xa5004c8b2d64ad08a80d33ad000820d63aa2ccc9": 'Udex',
    "0x68a17b587caf4f9329f0e372e3a78d23a46de6b5": '1inch',
    "0x4d37f28d2db99e8d35a6c725a5f1749a085850a3": '1inch',
    "0x1af29de80f743be444aa195e2cae38ee9bc74c4c": "OC2 Dex",
    "0x879047421625b87b5895ef1ac0d9dbd241805aa3": "OC2 Dex",
    "0x584860fe460a16cd11e6fdebb2e77146d1835be8": "MerchCoins",
    "0x3151e8ab9bfe754ada6682b9d75906e06a18a741": "Instex",
    "0x1b38d2613698488cbac0e7d21abb2fdbbe1d6704": "Bit2MeDex",

    // non zrx
    '0x61b9898c9b60a159fc91ae8026563cd226b7a0c1': 'Ethfinex', //0x clone contract
    '0x49497a4d914ae91d34ce80030fe620687bf333fd': 'DDEX', // DDEX hydro
  },
  // admin taker addresses for 0x relayers
  zrxTakers: {
    '0x6af9ec649821c2213dc488c36e3e3e999c3d7934': 'Tokenlon',
    '0x41f8d14c9475444f30a80431c68cf24dc9a8369a': 'Toeknlon',
    '0x4a821aa1affbf7ee89a245bf750d1d7374e77409': 'Tokenmom',
    '0x0681e844593a051e2882ec897ecd5444efe19ff2': 'STAR BIT',
    '0xdf1bc6498338135de5ffdbcb98817d81e2665912': 'Veil',
    '0x4969358e80cdc3d74477d7447bffa3b2e2acbe92': 'Paradex',
    '0xd2045edc40199019e221d71c0913343f7908d0d5': 'Paradex',
    '0x853da5cecc1ea601ab978c2001565a0377a7dca6': 'ForDex',
    '0xd3d0474124c1013ed6bfcfd9a49cfedb8c78fc44': 'Erc Dex', //indirect execution
    '0xe269e891a2ec8585a378882ffa531141205e92e9': 'DDEX', //v1 
    '0xb04239b53806ab31141e6cd47c63fb3480cac908': 'Gods Unchained',
  },
  // other addresses associated with DEX admins
  admins: {
    '0xceceaa8edc0830c7cec497e33bb3a3c28dd55a32': 'IDEX Admin',
    '0xa7a7899d944fe658c4b0a1803bab2f490bd3849e': 'IDEX Admin',
    '0xe269e891a2ec8585a378882ffa531141205e92e9': 'DDEX Admin', //0x v1
    '0x49497a4d914ae91d34ce80030fe620687bf333fd': 'DDEX Admin', // Hydro ex
    '0x61b9898c9b60a159fc91ae8026563cd226b7a0c1': 'Ethfinex Admin',
    '0xaf8ae6955d07776ab690e565ba6fbc79b8de3a5d': 'DiversiFi Admin', //ethfinex
    '0x1f8cdd31345faa00bbdf946fa257b7feb706b535': 'Switcheo Admin',
    '0x457804851eaf090dad4871f9609010c6868d99d4': 'BithumbDex Admin',
    '0xdb0a49ebed788cd412744a4f9f1ce8d16d019b2e': 'Totle Admin',
    '0x583d03451406d179182efc742a1d811a9e34c36b': 'Totle Admin',
    '0x571037cc2748c340e3c6d9c7af589c6d65806618': 'Switcheo Admin',
    '0x8ecf87fc9d7336cc0052d40abf806fb1af2ea81c': 'DINNGO Admin',
    '0x004dc6cb71104f64098fe70825516d2075cfa030': 'dex.blue Admin',
    '0x3d5a2fbed1b64ec88abacbd0c287461e8e8f7331': 'dex.blue Admin', //old one
  },
  // known (centralized) exchange wallets, (personal experience + https://etherscan.io/accounts/1?&l=Exchange )
  exchangeWallets: {
    '0xf73c3c65bde10bf26c2e1763104e609a41702efe': 'Bibox',
    '0xd4dcd2459bb78d7a645aa7e196857d421b10d93f': 'BigOne',
    '0xa30d8157911ef23c46c0eb71889efe6a648a41f7': 'BigOne',
    '0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be': 'Binance',
    '0xd551234ae421e3bcba99a0da6d736074f22192ff': 'Binance',
    '0x564286362092d8e7936f0549571a803b203aaced': 'Binance',
    '0x0681d8db095565fe8a346fa0277bffde9c0edbbf': 'Binance',
    '0x00799bbc833d5b168f0410312d2a8fd9e0e3079c': 'Binance',
    '0xfe9e8709d3215310075d67e3ed32a380ccf451c8': 'Binance',
    '0x4e9ce36e442e55ecd9025b9a6e0d88485d628a67': 'Binance',
    '0xbe0eb53f46cd790cd13851d5eff43d12404d33e8': 'Binance',	
    '0xf977814e90da44bfa03b6295a0616a897441acec': 'Binance',
    '0xab83d182f3485cf1d6ccdd34c7cfef95b4c08da4': 'Binance JEX',
    '0x1151314c646ce4e0efd76d1af4760ae66a9fe30f': 'Bitfinex',
    '0x7727e5113d1d161373623e5f49fd568b4f543a9e': 'Bitfinex',
    '0x4fdd5eb2fb260149a3903859043e962ab89d8ed4': 'Bitfinex',
    '0x876eabf441b2ee5b5b0554fd502a8e0600950cfa': 'Bitfinex',
    '0x7180eb39a6264938fdb3effd7341c4727c382153': 'Bitfinex',
    '0xcafb10ee663f465f9d10588ac44ed20ed608c11e': 'Bitfinex',
    '0xf7793d27a1b76cdf14db7c83e82c772cf7c92910': 'Bilaxy',
    '0x4b729cf402cfcffd057e254924b32241aedc1795': 'Bit-z',
    '0x8fa8af91c675452200e49b4683a33ca2e1a34e42': 'Bithumb',
    '0x3052cd6bf951449a984fe4b5a38b46aef9455c8e': 'Bithumb',
    '0x2140efd7ba31169c69dfff6cdc66c542f0211825': 'Bithumb',
    '0x3fbe1f8fc5ddb27d428aa60f661eaaab0d2000ce': 'Bithumb',
    '0x1522900b6dafac587d499a862861c0869be6e428': 'Bitstamp',
    '0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98': 'Bittrex',
    '0xe94b04a0fed112f3664e45adb2b8915693dd5ff3': 'Bittrex',
    '0x66f820a414680b5bcda5eeca5dea238543f42054': 'Bittrex',
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': 'Centre USDC',
    '0x96fc4553a00c117c5b0bed950dd625d1c16dc894': 'Changelly',
    '0x8958618332df62af93053cb9c535e26462c959b0': 'Cobinhood',
    '0xb726da4fbdc3e4dbda97bb20998cf899b0e727e0': 'Cobinhood',
    '0x9539e0b14021a43cde41d9d45dc34969be9c7cb0': 'CoinBene',
    '0xb6ba1931e4e74fd080587688f6db10e830f810d5': 'Coindelta',
    '0xb9ee1e551f538a464e8f8c41e9904498505b49b0': 'Coinex',
    '0x4b01721f0244e7c5b5f63c20942850e447f5a5ee': 'CoinExchange',
    '0x1d1bd550197c7c0787b9ad0aea9c1cca66ee0e90': 'Coinhako',
    '0x0d6b5a54f940bf3d52e438cab785981aaefdf40c': 'COSS',
    '0xd1560b3984b7481cd9a8f40435a53c860187174d': 'COSS',
    '0x521db06bf657ed1d6c98553a70319a8ddbac75a3': 'CREX24',
    '0x5baeac0a0417a05733884852aa068b706967e790': 'Cryptopia',
    '0xe17ee7b3c676701c66b395a35f0df4c2276a344e': 'DigiFinex',
    '0x8d76166c22658a144c0211d87abf152e6a2d9d95': 'EterBase',
    '0xd7b9a9b2f665849c4071ad5af77d8c76aa30fb32': 'Exmo',
    '0x1fd6267f0d86f62d88172b998390afee2a1f54b6': 'Exmo',
    '0x915d7915f2b469bb654a7d903a5d4417cb8ea7df': 'FCOin',
    '0x0d0707963952f2fba59dd06f2b425ace40b492fe': 'Gate.io',
    '0x7793cd85c11a924478d358d49b05b37e91b5810f': 'Gate.io',
    '0x1c4b70a3968436b9a0a9cf5205c787eb81bb558c': 'Gate.io',
    '0xd24400ae8bfebb18ca49be86258a3c749cf46853': 'Gemini',
    '0x6fc82a5fe25a5cdb58bc74600a40a69c065263f8': 'Gemini',
    '0x59a5208b32e627891c389ebafc644145224006e8': 'HitBTC',
    '0x9c67e141c0472115aa1b98bd0088418be68fd249': 'HitBTC',
    '0xa12431d0b9db640034b0cdfceef9cce161e62be4': 'HitBTC',
    '0x274f3c32c90517975e29dfc209a23f315c1e5fc7': 'Hotbit',
    '0xab5c66752a9e8167967685f1450532fb96d5d24f': 'Huobi',
    '0xe93381fb4c4f14bda253907b18fad305d799241a': 'Huobi',
    '0xfa4b5be3f2f84f56703c42eb22142744e95a2c58': 'Huobi',
    '0x46705dfff24256421a05d056c29e81bdc09723b8': 'Huobi',
    '0x1b93129f05cc2e840135aab154223c75097b69bf': 'Huobi',
    '0xeb6d43fe241fb2320b5a3c9be9cdfd4dd8226451': 'Huobi',
    '0x956e0dbecc0e873d34a5e39b25f364b2ca036730': 'Huobi',
    '0x6748f50f686bfbca6fe8ad62b22228b87f31ff2b': 'Huobi',
    '0xfdb16996831753d5331ff813c29a93c76834a0ad': 'Huobi',
    '0xeee28d484628d41a82d01e21d12e2e78d69920da': 'Huobi',
    '0x5c985e89dde482efe97ea9f1950ad149eb73829b': 'Huobi',
    '0xdc76cd25977e0a5ae17155770273ad58648900d3': 'Huobi',
    '0xadb2b42f6bd96f5c65920b9ac88619dce4166f94': 'Huobi',
    '0xa8660c8ffd6d578f657b72c0c811284aef0b735e': 'Huobi',
    '0x1062a747393198f70f71ec65a582423dba7e5ab3': 'Huobi',
    '0xeec606a66edb6f497662ea31b5eb1610da87ab5f': 'Huobi',
    '0x3c11c3025ce387d76c2eddf1493ec55a8cc2a0f7': 'Idax',
    '0x51836a753e344257b361519e948ffcaf5fb8d521': 'Indodax',
    '0x2910543af39aba0cd09dbb2d50200b3e800a63d2': 'Kraken',
    '0x0a869d79a7052c7f1b55a8ebabbea3420f0d1e13': 'Kraken',
    '0xe853c56864a2ebe4576a807d26fdc4a0ada51919': 'Kraken',
    '0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0': 'Kraken',
    '0xfa52274dd61e1643d2205169732f29114bc240b3': 'Kraken',
    '0x2b5634c42055806a59e9107ed44d43c426e58258': 'KuCoin',
    '0x689c56aef474df92d44a1b70850f808488f9769c': 'KuCoin',
    '0x0861fca546225fbf8806986d211c8398f7457734': 'LAToken',
    '0x1b6c1a0e20af81b922cb454c3e52408496ee7201': 'LAToken',
    '0x5e575279bf9f4acf0a130c186861454247394c06': 'Liqui',
    '0x8271b2e8cbe29396e9563229030c89679b9470db': 'Liqui',
    '0xedbb72e6b3cf66a792bff7faac5ea769fe810517': 'Liquid',
    '0x243bec9256c9a3469da22103891465b47583d9f1': 'Livecoin',
    '0xe03c23519e18d64f144d2800e30e81b0065c48b5': 'Mercatox',
    '0x6cc5f688a315f3dc28a7781717a9a798a59fda7b': 'Okex',
    '0x236f9f97e0e62388479bf9e5ba4889e46b0273c3': 'Okex',
    '0x32be343b94f860124dc4fee278fdcbd38c102d88': 'Poloniex',
    '0xb794f5ea0ba39494ce839613fffba74279579268': 'Poloniex',
    '0xab11204cfeaccffa63c2d23aef2ea9accdb0a0d5': 'Poloniex',
    '0x209c4784ab1e8183cf58ca33cb740efbf3fc18ef': 'Poloniex',
    '0x027beefcbad782faf69fad12dee97ed894c68549': 'QuadrigaCX',
    '0xb6aac3b56ff818496b747ea57fcbe42a9aae6218': 'QuadrigaCX',
    '0x70faa28a6b8d6829a4b1e649d26ec9a2a39ba413': 'ShapeShift',
    '0x120a270bbc009644e35f0bb6ab13f95b8199c4ad': 'ShapeShift',
    '0x9e6316f44baeeee5d41a1070516cc5fa47baf227': 'ShapeShift',
    '0xd3273eba07248020bf98a8b560ec1576a612102f': 'ShapeShift',
    '0x3b0bc51ab9de1e5b7b6e34e5b960285805c41736': 'ShapeShift',
    '0x563b377a956c80d77a7c613a9343699ad6123911': 'ShapeShift',
    '0xeed16856d551569d134530ee3967ec79995e2051': 'ShapeShift',
    '0x0a73573cf2903d2d8305b1ecb9e9730186a312ae': 'Tidex',
    '0x390de26d772d2e2005c6d1d24afc902bae37a4bb': 'Upbit',
    '0x5e032243d507c743b061ef021e2ec7fcc6d3ab89': 'Upbit',
    '0xba826fec90cefdf6706858e5fbafcb27a290fbe0': 'Upbit',
    '0xf5bec430576ff1b82e44ddb5a1c93f6f9d0884f3': 'Yobit',
    '0x60d0cc2ae15859f69bf74dadb8ae3bd58434976b': 'ZB',


    // other service addresses that can be useful to be named.
    '0x13032deb2d37556cf49301f713e9d7e1d1a8b169': 'Kyber-Uniswap', //kyber uniswap reserve

    //'0x0286f920f893513c7ec9fe35ba0a4760229a243e': 'SingularFund',
    '0x09678741bd50c3e74301f38fbd0136307099ae5d': 'Local Ethereum',
    '0x867ffb5a3871b500f65bdfafe0136f9667deae06': 'Local Ethereum',

    // Maker DAI cdp system, mark as exchange for now
    '0x448a5065aebb8e423f0896e6c5d525c040f59af3': 'Maker CDP',
    '0xbda109309f9fafa6dd6a9cb9f1df4085b27ee8ef': 'Maker CDP',
    '0x9b0f70df76165442ca6092939132bbaea77f2d7a': 'Maker CDP',
    '0x9b0ccf7c8994e19f39b2b4cf708e0a7df65fa8a3': 'Maker CDP',
    '0x059550a1ca3c46a2adb803e9e3ea4585a34f004a': 'dYdX',
    '0x36bf21c8e661b21e6166e4385f574941fdc6caff': 'dYdX',
    '0x1e0447b19bb6ecfdae1e4ae1694b0c3659614e4e': 'dYdX',
    '0xa8b39829ce2246f89b31c013b8cde15506fb9a76': 'dYdX',

    '0x3a306a399085f3460bbcb5b77015ab33806a10d5': 'InstaDapp',

    '0x5a4ade4f3e934a0885f42884f7077261c3f4f66f': 'Synthetix',

    '0x3baa64a4401bbe18865547e916a9be8e6dd89a5a': 'Request',

    '0xc692453625023c6e03fec04158ea31ab4de2650a': 'LocalCoin Dex 1',
    '0x37c4bcaba4bcf3a605414236b8b108f160eb45a6': 'LocalCoin Dex 2',
    '0x8d1c1571367a148e92d6ac83494b1bdf3b497d07': 'LocalCoin Dex 3',

    // saturn network aidrop
    '0x25f17d6cb23cc85bfa6c5e9b8f1d5226f5927cbc': 'Airdrop',
    //disperse.app multi token transfer
    '0xd152f549545093347a162dce210e7293f1452150': 'Airdrop',
    //bulksender
    '0x2f6321db2461f68676f42f396330a4dc4a8f49df': 'Airdrop',
    '0xd1917932a7db6af687b523d5db5d7f5c2734763f': 'Airdrop',
  },
};
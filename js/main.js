var vm =new Vue({
	el:"#app",
	data:{
		/*搜索内容*/
		title:"",
		/*歌手*/ 
		person:"歌手",
		/*专辑*/ 
		zhuanji:"专辑",
		/*歌曲时长*/
		time:"时长",
		/*音乐id*/
		musizId:"",
		/*音乐地址*/
		musiz:"",
		/*音乐图片*/
		musizimg:"",
		/*音乐搜索列表*/
		list:[],
		/*音乐搜索歌手列表id存放*/
		SearchPerson2:[],
		/*音乐搜索MV地址存放*/
		SearchlistMV:"",
		/*搜索专辑列表*/
		SearchZhuanji2:[],
		/*搜索视频结果存放列表*/
		SearchMV2:[],
		/*搜索歌单结果存放列表*/
		SearchGedan2:[],
		/*搜索歌词结果存放列表*/
		SearchGechi2:[],
		/*搜索电台结果存放列表*/
		SearchDianTai2:[],
		/*搜索用户存放列表*/
		SearchName2:[],
		/*没有搜索结果*/
		searchnull:false,
		/*搜索文字红色下滑线样式控制*/
		SearchRed:"0",
		/*视频播放页开关*/
		MVindex:false,
		/*视频热门评论*/
		MVPinlunhot:[],
		/*视频最新评论*/
		MVPinlunNew:[],
		/*视频信息存放*/
		MVneilong:[],
		/*视频标题*/
		MVtitle:"",
		/*相关视频列表存放*/
		MVXiangGuan:[],
		/*控制视频作者头像*/
		ShiPingImg:false,
		/*控制MV作者头像*/
		MVImg:false,
		/*控制图片旋转*/
		isplaying:true,
		/*控制歌手页面的切换*/
		personred:"1",
		/*控制加载中显示*/
		loading:false,
		/*歌手详情列表存放*/
		personMain:[],
		/*控制歌手页面显示开关*/
		personIndexSwitch:false,
		/*控制搜索页面显示开关*/
		SearchIndexSwitch:false,
		/*获取歌手热门50首列表*/
		PersonHot:[],
		/*歌手页面专题列表*/
		PersonZhuanJi:[],
		/*歌手页面MV列表*/
		PersonIndexMV:[],
		/*歌手详情列表*/
		personmeg:[],
		/*歌手页面歌手头像*/
		personimgsrc:"",
		/*歌手页面相似歌手*/
		personsimi:[],
		/*专辑页面切换*/
		zhuanjiindexred:1,
		/*专辑页面开关*/
		zhuanjiIndexSwitch:false,
		/*专辑音乐列表存放*/
		zhuanjilistmusiz:[],
		/*专辑信息存放*/
		zhuanjimain:[],
		/*专辑评论数量*/
		zhuanjipinlunnumber:0,
		/*专辑评论列表*/
		zhuanjipinlunlist:[],
		/*歌单页面显示控制*/
		gedanIndexSwitch:false,
		/*歌单下划线变红控制*/
		gedanindexred:1,
		/*歌单信息列表*/
		gedanmain:[],
		/*歌单评论列表*/
		gedancomment:[],
		/*歌单评论数量*/
		gedancommentnumber:0,
		/*歌单页面音乐列表*/
		gedanmusizlist:[],
		/*歌单收藏者*/
		gedansouchangperson:[],
		/*切换页面读取中*/
		loadingindex:false,
		/*读取失败*/
		loadingerr:false,
		/*发现音乐页面top部分变红*/
		faxianIndextopred:"1",
		/*发现音乐轮播存放*/
		faxianlunbo:[],
		/*个性推荐列表*/
		gexingtuijianlist:[],
		/*个性推荐轮播图*/
		gexingtuijianlunbo:[],
		/*左边排列选中器*/
		leftgo:1,
		/*音乐播放器显示控制*/
		musizswitch:true,
		/*推荐歌单*/
		tuijiangedan:[],
		/*轮播图显示隐藏*/
		lunboswitch:true,
		/*独家放送*/
		dujiafangsonglist:[],
		/*最新音乐*/
		zuixinmusizlist:[],
	},
	
	methods:{
		/*播放音乐*/
		play:function(index){
			var that=this;
			axios.get("https://autumnfish.cn/song/url?id="+index)
			.then(function(response){
				if(response.data.data[0].url==null){
					window.alert("歌曲不存在");
				}else{
					that.musiz=response.data.data[0].url;
					axios.get("https://autumnfish.cn/song/detail?ids="+index)
					.then(function(response){
						that.musizimg = response.data.songs[0].al.picUrl;
					},function(err){})
				}
			},function(err){})
		},
		/*搜索音乐*/
		searchMusiz:function(){
			var that=this;
			this.loading=true;
			this.loadingerr=false;
			this.personIndexSwitch=false;
			this.SearchIndexSwitch=true;
			this.list=[];
			this.searchnull=false;
			this.zhuanjiIndexSwitch=false;
			this.gedanIndexSwitch=false;
			this.leftgo=0;
			
			axios.get("https://autumnfish.cn/search?limit=100&keywords="+this.title)
			.then(function(response){
				if(response.data.result.songs == undefined){
					that.loading=false;
					that.searchnull=true;
				}else{
					that.list=response.data.result.songs;
					that.loading=false;
				}
				
			},function(err){
				that.loading=false;
				that.loadingerr=true;
			});
			that.SearchPerson2.splice(0,that.SearchPerson2.length);
			that.SearchZhuanji2.splice(0,that.SearchZhuanji2.length);
			that.SearchMV2.splice(0,that.SearchMV2.length);
			that.SearchGedan2.splice(0,that.SearchGedan2.length);
			that.SearchDianTai2.splice(0,that.SearchDianTai2.length);
			that.SearchName2.splice(0,that.SearchName2.length);
			that.SearchGechi2.splice(0,that.SearchGechi2.length);
			
			this.MVDiZhi="";
			this.ShiPingImg=false;
			this.MVImg=false;
			this.SearchRed=1;
		},
		/*搜索歌手*/
		SearchPerson:function(){
			var that=this;
			this.loading=true;
			this.searchnull=false;
			this.leftgo=0;
			
			axios.get("https://autumnfish.cn/search?limit=100&type=100&keywords="+this.title)
			.then(function(response){
				if(response.data.result.artists == undefined){
					that.loading=false;
					that.searchnull=true;
				}else{
					that.SearchPerson2=response.data.result.artists;
					that.loading=false;
				}
				
			},function(err){
				that.loading=false;
				that.loadingerr=true;
			});
			that.list.splice(0,that.list.length);
			that.SearchZhuanji2.splice(0,that.SearchZhuanji2.length);
			that.SearchMV2.splice(0,that.SearchMV2.length);
			that.SearchGedan2.splice(0,that.SearchGedan2.length);
			that.SearchGechi2.splice(0,that.SearchGechi2.length);
			that.SearchDianTai2.splice(0,that.SearchDianTai2.length);
			that.SearchName2.splice(0,that.SearchName2.length);
				
			this.SearchRed=2;
			},		
		/*搜索专辑*/
		SearchZhuanji:function(){
			var that=this;
			this.loading=true;
			this.searchnull=false;
			this.leftgo=0;
			
			axios.get("https://autumnfish.cn/search?limit=100&type=10&keywords="+this.title)
			.then(function(response){
				if(response.data.result.albums == undefined){
					that.loading=false;
					that.searchnull=true;
				}else{
					that.SearchZhuanji2=response.data.result.albums;
					that.loading=false;
				}
				
			},function(err){
				that.loading=false;
				that.loadingerr=true;
			});
			that.list.splice(0,that.list.length);
			that.SearchPerson2.splice(0,that.SearchPerson2.length);
			that.SearchMV2.splice(0,that.SearchMV2.length);
			that.SearchGedan2.splice(0,that.SearchGedan2.length);
			that.SearchGechi2.splice(0,that.SearchGechi2.length);
			that.SearchDianTai2.splice(0,that.SearchDianTai2.length);
			that.SearchName2.splice(0,that.SearchName2.length);
			this.SearchRed=3;
		},
		/*搜索视频*/
		SearchMV:function(){
			var that=this;
			this.loading=true;
			this.searchnull=false;
			this.leftgo=0;
			
			axios.get("https://autumnfish.cn/search?limit=100&type=1014&keywords="+this.title)
			.then(function(response){
				if(response.data.result.videos == undefined){
					that.loading=false;
					that.searchnull=true;
				}else{
					that.SearchMV2=response.data.result.videos;
					that.loading=false;
				}
		},function(err){
			that.loading=false;
			that.loadingerr=true;
		});
		that.list.splice(0,that.list.length);
		that.SearchPerson2.splice(0,that.SearchPerson2.length);
		that.SearchZhuanji2.splice(0,that.SearchZhuanji2.length);
		that.SearchGedan2.splice(0,that.SearchGedan2.length);
		that.SearchGechi2.splice(0,that.SearchGechi2.length);
		that.SearchDianTai2.splice(0,that.SearchDianTai2.length);
		that.SearchName2.splice(0,that.SearchName2.length);
		this.SearchRed=4;
		},
		/*搜索歌单*/
		SearchGedan:function(){
			var that=this;
			this.loading=true;
			this.searchnull=false;
			this.leftgo=0;
			
			axios.get("https://autumnfish.cn/search?limit=100&type=1000&keywords="+this.title)
			.then(function(response){
				if(response.data.result.playlists == undefined){
					that.loading=false;
					that.searchnull=true;
				}else{
					that.SearchGedan2=response.data.result.playlists;
					that.loading=false;
				}
				
			},function(err){
				that.loading=false;
				that.loadingerr=true;
			});
		that.list.splice(0,that.list.length);
		that.SearchPerson2.splice(0,that.SearchPerson2.length);
		that.SearchZhuanji2.splice(0,that.SearchZhuanji2.length);
		that.SearchMV2.splice(0,that.SearchMV2.length);
		that.SearchGechi2.splice(0,that.SearchGechi2.length);
		that.SearchDianTai2.splice(0,that.SearchDianTai2.length);
		that.SearchName2.splice(0,that.SearchName2.length);
		this.SearchRed=5;
		},
		/*搜索歌词*/
		SearchGechi:function(){
			var that=this;
			this.loading=true;
			this.searchnull=false;
			this.leftgo=0;
			
			axios.get("https://autumnfish.cn/search?limit=100&type=1006&keywords="+this.title)
			.then(function(response){
				if(response.data.result.songs == undefined){
					that.loading=false;
					that.searchnull=true;
				}else{
					that.SearchGechi2=response.data.result.songs;
					that.loading=false;
				}
				
			},function(err){
				that.loading=false;
				that.loadingerr=true;
			});
			that.list.splice(0,that.list.length);
			that.SearchPerson2.splice(0,that.SearchPerson2.length);
			that.SearchZhuanji2.splice(0,that.SearchZhuanji2.length);
			that.SearchMV2.splice(0,that.SearchMV2.length);
			that.SearchGedan2.splice(0,that.SearchGedan2.length);
			that.SearchDianTai2.splice(0,that.SearchDianTai2.length);
			that.SearchName2.splice(0,that.SearchName2.length);
			this.SearchRed=6;
		},
		/*展开歌词*/
		GechiGo:function(item,index){
			if(item.active==false){
				Vue.set(item,'active',true);
			}else{
				Vue.set(item,'active',false);
			}
		},
		/*搜索电台*/
		SearchDianTai:function(){
			var that=this;
			this.loading=true;
			this.searchnull=false;
			this.leftgo=0;
			
			axios.get("https://autumnfish.cn/search?limit=100&type=1009&keywords="+this.title)
			.then(function(response){
				if(response.data.result.djRadios == undefined){
					that.loading=false;
					that.searchnull=true;
				}else{
					that.SearchDianTai2=response.data.result.djRadios;
					that.loading=false;
				}
				
			},function(err){
				that.loading=false;
				that.loadingerr=true;
			})
			that.list.splice(0,that.list.length);
			that.SearchPerson2.splice(0,that.SearchPerson2.length);
			that.SearchZhuanji2.splice(0,that.SearchZhuanji2.length);
			that.SearchMV2.splice(0,that.SearchMV2.length);
			that.SearchGechi2.splice(0,that.SearchGechi2.length);
			that.SearchGedan2.splice(0,that.SearchGedan2.length);
			that.SearchName2.splice(0,that.SearchName2.length);
			this.SearchRed=7;
		},
		/*搜索用户*/
		SearchName:function(){
			var that=this;
			this.loading=true;
			this.searchnull=false;
			this.leftgo=0;
			
			axios.get("https://autumnfish.cn/search?limit=100&type=1004&keywords="+this.title)
			.then(function(response){
				if(response.data.result.mvs == undefined){
					that.loading=false;
					that.searchnull=true;
				}else{
					that.SearchName2=response.data.result.mvs;
					that.loading=false;
				}
				
			},function(err){
				that.loading=false;
				that.loadingerr=true;
			});
			that.list.splice(0,that.list.length);
			that.SearchPerson2.splice(0,that.SearchPerson2.length);
			that.SearchZhuanji2.splice(0,that.SearchZhuanji2.length);
			that.SearchMV2.splice(0,that.SearchMV2.length);
			that.SearchGedan2.splice(0,that.SearchGedan2.length);
			that.SearchGechi2.splice(0,that.SearchGechi2.length);
			that.SearchDianTai2.splice(0,that.SearchDianTai2.length);
			this.SearchRed=8;
			
			},
		/*打开视频*/
		PlayMV:function(MVid){
			/*视频播放器*/
			var that=this;
			this.musizswitch=false;
			this.lunboswitch=false;
			this.musizswitch=false;
			axios.get("https://autumnfish.cn/video/url?id="+MVid)
			.then(function(response){
				that.MVDiZhi=response.data.urls[0].url;
				// console.log(that.MVDiZhi);
			},function(err){})
			/*视频详细信息*/
			axios.get("https://autumnfish.cn/video/detail?id="+MVid)
			.then(function(response){
				that.MVneilong=response.data.data;
				that.MVtitle=that.MVneilong.creator.nickname;
				// console.log(that.MVneilong);
			},function(err){})
			/*视频热门评论*/
			axios.get("https://autumnfish.cn/comment/new?&sortType=2&type=5&id="+MVid)
			.then(function(response){
				that.MVPinlunhot=response.data.data.comments;
				// console.log(that.MVPinlunhot);
			},function(err){})
			/*视频最新评论*/
			axios.get("https://autumnfish.cn/comment/new?&sortType=3&type=5&id="+MVid)
			.then(function(response){
				that.MVPinlunNew=response.data.data.comments;
				// console.log(that.MVPinlunNew);
			},function(err){})
			/*相关视频*/
			axios.get("https://autumnfish.cn/related/allvideo?id="+MVid)
			.then(function(response){
				that.MVXiangGuan=response.data.data;
			},function(err){})
			
			this.ShiPingImg=true;
			this.MVImg=false;
		},
		/*打开mv页面*/
		PlayMV2:function(MVid2){
			var that=this;
			this.lunboswitch=false;
			this.loadingindex=true;
			this.MVindex=true;
			this.musizswitch=false;
			/*获取MV地址*/
			axios.get("https://autumnfish.cn/mv/url?id="+MVid2)
			.then(function(response){
				if(response.data.data.url==null){
					window.alert("视频不存在");
				}else{
					that.MVDiZhi=response.data.data.url;
					that.loadingindex=false;
				}
				
			},function(err){})			
			/*视频详细信息*/
			axios.get("https://autumnfish.cn/mv/detail?mvid="+MVid2)
			.then(function(response){
				that.MVneilong=response.data.data;
				that.MVtitle=that.MVneilong.artistName;
				// console.log(that.MVneilong);
			},function(err){})
			/*视频热门评论*/
			axios.get("https://autumnfish.cn/comment/new?&sortType=2&type=1&id="+MVid2)
			.then(function(response){
				that.MVPinlunhot=response.data.data.comments;
				// console.log(that.MVPinlunhot);
			},function(err){})
			/*视频最新评论*/
			axios.get("https://autumnfish.cn/comment/new?&sortType=3&type=1&id="+MVid2)
			.then(function(response){
				that.MVPinlunNew=response.data.data.comments;
				// console.log(that.MVPinlunNew);
			},function(err){})
			/*相关视频*/
			axios.get("https://autumnfish.cn/related/allvideo?id="+MVid2)
			.then(function(response){
				that.MVXiangGuan=response.data.data;
			},function(err){})
			
			this.ShiPingImg=false;
			this.MVImg=true;
		},
		/*暂停播放音乐*/
		pause2:function(){
			var x=document.getElementById("YingYue");
			x.pause();
		},
		/*打开歌手页面*/
		personindex:function(id,imgsrc){
			var that=this;
			this.loadingindex=true;
			this.lunboswitch=false;
			/*获取歌手信息*/
			axios.get("https://autumnfish.cn/artist/album"+"?id="+id+"&limit=50")
			.then(function(response){
				that.personMain=response.data;
				that.personimgsrc=imgsrc;
				that.personred=1;
				/*获取歌手专辑的歌曲列表*/
				var arr2 = new Array;
				for(let i=0; i<that.personMain.hotAlbums.length;i++){
					arr2[i]="https://autumnfish.cn/album?id="+that.personMain.hotAlbums[i].id;
				}
				axios.all(arr2.map(function(data){
					return axios.get(data);
				}))
				.then(axios.spread(function(){
					that.PersonZhuanJi=arguments;
					
					that.personIndexSwitch=true;
					that.loadingindex=false;
				}))
			},function(err){})
			
			/*获取歌手热门50首歌曲*/
			axios.get("https://autumnfish.cn/artist/top/song?id="+id)
			.then(function(response){
				that.PersonHot=response.data.songs;
			},function(err){})
			
			/*获取歌手MV信息*/
			axios.get("https://autumnfish.cn/artist/mv",{
				params:{
					id:id
				}
			})
			.then(function(response){
				that.PersonIndexMV=response.data.mvs;
			},function(err){})
			
			/*获取歌手描述*/
			axios.get("https://autumnfish.cn/artist/desc",{
				params:{
					id:id
				}
			})
			.then(function(response){
				that.personmeg=response.data;
			},function(err){})
			
			/*获取相似歌手*/
			axios.get("https://autumnfish.cn/simi/artist",{
				params:{
					id:id
				}
			})
			.then(function(response){
				that.personsimi=response.data.artists;
			},function(err){})
		},
		/*喜欢变红*/
		RedGo:function(item){
			if(item.kongzi){
				Vue.set(item,'kongzi',false);
			}else{
				Vue.set(item,'kongzi',true);
			}
		},
		/*打开专辑页面*/
		zhuanjiget:function(id){
			var that=this;
			this.lunboswitch=false;
			this.zhuanjiIndexSwitch=true;
			this.loading=true;
			/*专辑详细数据*/
			axios.get("https://autumnfish.cn/album",{
				params:{
					id:id
				}
			})
			.then(function(response){
				that.zhuanjimain=response;
				console.log(that.zhuanjimain);
			},function(err){})
			/*获取专辑评论数*/
			axios.get("https://autumnfish.cn/album/detail/dynamic",{
				params:{
					id:id
				}
			})
			.then(function(response){
				that.zhuanjipinlunnumber=response.data.commentCount;
			},function(err){})
			/*获取专辑评论*/
			axios.get("https://autumnfish.cn/comment/album",{
				params:{
					id:id,
					limit:10
				}
			})
			.then(function(response){
				that.zhuanjipinlunlist=response.data;
			},function(err){})
			
			this.loadingindex=false;
		},
		/*打开歌单页面*/
		gedanget:function(id){
			var that=this;
			this.loadingindex=true;
			this.lunboswitch=false;
			/*歌单信息*/
			axios.get("https://autumnfish.cn/playlist/detail",{
				params:{
					id:id
				}
			})
			.then(function(response){
				that.gedanmain=response.data;
				/*歌单歌曲列表*/
				var arr1 = new Array;
				for(let i=0; i<50;i++){
					if(that.gedanmain.playlist.trackIds[i] == undefined){
					}else{
						arr1[i] = "https://autumnfish.cn/song/detail?ids="+that.gedanmain.playlist.trackIds[i].id
					}
				}
				axios.all(arr1.map(function(data){
					return axios.get(data);
				}))
				.then(axios.spread(function(){
					var arr2 = new Array;
					that.gedanmusizlist = arguments;
					that.loadingindex=false;
					that.gedanIndexSwitch=true;
				}))
			},function(err){})
			
			/*歌单评论*/
			axios.get("https://autumnfish.cn/comment/playlist",{
				params:{
					id:id
				}
			})
			.then(function(response){
				that.gedancomment=response.data;
			},function(err){})
			/*歌单数据量数量*/
			axios.get("https://autumnfish.cn/playlist/detail/dynamic",{
				params:{
					id:id
				}
			})
			.then(function(response){
				that.gedancommentnumber=response.data;
			},function(err){})
			/*歌单收藏者*/
			axios.get("https://autumnfish.cn/playlist/subscribers",{
				params:{
					id:id
				}
			})
			.then(function(response){
				that.gedansouchangperson=response.data;
			},function(err){})
		},
		
		/*载入个性推荐*/
		gexingtuijian:function(){
			var that=this;
			/*轮播图*/
			axios.get("https://autumnfish.cn/homepage/block/page")
			.then(function(response){
				that.gexingtuijianlist=response.data.data;
				that.gexingtuijianlunbo=that.gexingtuijianlist.blocks[0].extInfo.banners;
			},function(err){})
			/*获取推荐歌单*/
			axios.get("https://autumnfish.cn/personalized",{
				params:{
					limit:14
				}
			})
			.then(function(response){
				that.tuijiangedan=response.data.result
			},function(err){})
			/*获取独家放送*/
			axios.get("https://autumnfish.cn/personalized/privatecontent")
			.then(function(response){
				that.dujiafangsonglist=response.data.result;
			},function(err){})
			/*获取最新音乐*/
			axios.get("https://autumnfish.cn/top/song",{
				params:{
					type:0
				}
			})
			.then(function(response){
				that.zuixinmusizlist=response.data.data.slice(0,9);
				console.log(response);
			},function(err){})
		},
	},
	mounted:function() {  //自动触发函数
		this.gexingtuijian()
	},
	watch:{
		
	}
});
/*
axios.get("https://autumnfish.cn",{
	params:{
		
	}
})
.then(function(response){
	console.log(response);
},function(err){})
*/

var swiper = new Swiper('.swiper-container', {
	        pagination: '.swiper-pagination',
	        paginationClickable: '.swiper-pagination',
	        nextButton: '.swiper-button-next',
	        prevButton: '.swiper-button-prev',
	        spaceBetween: 30
	    });
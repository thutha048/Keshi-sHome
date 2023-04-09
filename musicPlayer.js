const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "MUSIC_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: {},
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    songs: [
      {
        name: "LIMBO",
        singer: "keshi",
        path: "./assets/music/LikeINeedU.mp3",
        image: "./assets/img/song/song1.jpg"
      },
      {
        name: "beside you",
        singer: "keshi",
        path: "./assets/music/GieoQue.mp3",
        image: "./assets/img/song/song2.jpg"
          
      },
      {
        name: "IT'S YOU",
        singer: "MAX, keshi",
        path:"./assets/music/LuonYeuDoi.mp3",
        image: "./assets/img/song/song3.jpg"
      },
      {
        name: "2 soon",
        singer: "keshi",
        path: "./assets/music/NangTho.mp3",
        image:"./assets/img/song/song4.jpg"
      },
      {
        name: "like i need u",
        singer: "keshi",
        path: "./assets/music/NgayKhacLa.mp3",
        image:"./assets/img/song/song5.jpg"
      },
      {
        name: "skeletons",
        singer: "keshi",
        path:"./assets/music/NguDiDeThayNhauConHonNhien.mp3",
        image:"./assets/img/song/song6.jpg"
      },
      {
        name: "SOMEBODY",
        singer: "keshi",
        path: "./assets/music/VeNha.mp3",
        image:"./assets/img/song/song7.jpg"
      }
    ],
    setConfig: function (key, value) {
      this.config[key] = value;
      localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    render: function () {
      const htmls = this.songs.map((song, index) => {
        return `
                          <div class="song ${
                            index === this.currentIndex ? "active" : ""
                          }" data-index="${index}">
                              <div class="thumb"
                                  style="background-image: url('${song.image}')">
                              </div>
                              <div class="body">
                                  <h3 class="title">${song.name}</h3>
                                  <p class="author">${song.singer}</p>
                              </div>
                              <div class="option">
                                  <i class="fas fa-ellipsis-h"></i>
                              </div>
                          </div>
                      `;
      });
      playlist.innerHTML = htmls.join("");
    },
    defineProperties: function () {
      Object.defineProperty(this, "currentSong", {
        get: function () {
          return this.songs[this.currentIndex];
        }
      });
    },
    handleEvents: function () {
      const _this = this; //this này là app 
      
      // Handle when click play
      playBtn.onclick = function () {
        if (_this.isPlaying) {   //nếu dùng this.isPlaying ở đây thì đag trỏ đến playBtn.isPlaying
          audio.pause();
        } else {
          audio.play();
        }
      };

      // When the song is played
      audio.onplay = function () {
        _this.isPlaying = true;
        player.classList.add("playing");
      };

      // When the song is pause
      audio.onpause = function () {
        _this.isPlaying = false;
        player.classList.remove("playing");
      };

      // When the song progress changes
      audio.ontimeupdate = function () {
        if (audio.duration) {
          const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100);
          progress.value = progressPercent;
        }
      };

      // Handling when seek
      progress.oninput = function (e) {
        // console.log(e.target.value);//lấy ra %ở vị trí tua đến
        const seekTime = (audio.duration / 100) * e.target.value;
        audio.currentTime = seekTime;
      };

      // When next song
      nextBtn.onclick = function () {
        if (_this.isRandom) {
          _this.playRandomSong();
        } else {
          _this.nextSong();
        }
        audio.play();
        _this.render();
        _this.scrollToActiveSong();
      };

      // When prev song
      prevBtn.onclick = function () {
        if (_this.isRandom) {
          _this.playRandomSong();
        } else {
          _this.prevSong();
        }
        audio.play();
        _this.render();
        _this.scrollToActiveSong();
      };

      // Handling on / off random song
      randomBtn.onclick = function (e) {
        _this.isRandom = !_this.isRandom;
        _this.setConfig("isRandom", _this.isRandom);
        randomBtn.classList.toggle("active", _this.isRandom);
      };

      // Process repeated song
      repeatBtn.onclick = function (e) {
        _this.isRepeat = !_this.isRepeat;
        _this.setConfig("isRepeat", _this.isRepeat);
        repeatBtn.classList.toggle("active", _this.isRepeat);
      };

      // Handle next song when audio ended
      audio.onended = function () {
        if (_this.isRepeat) {
          audio.play();
        } else {
          nextBtn.click();
        }
      };

      // Listen to playlist clicks
      playlist.onclick = function (e) {
        const songNode = e.target.closest(".song:not(.active)");

        if (songNode || e.target.closest(".option")) {
          // Handle when clicking on the song
          if (songNode) {
            _this.currentIndex = Number(songNode.dataset.index);
            _this.loadCurrentSong();
            _this.render();
            audio.play();
          }

          // Handle when clicking on the song option
          if (e.target.closest(".option")) {
          }
        }
      };
    },
    scrollToActiveSong: function () {
      setTimeout(() => {
        $(".song.active").scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      }, 300);
    },
    loadCurrentSong: function () {
      heading.textContent = this.currentSong.name;
      audio.src = this.currentSong.path;
    },
    loadConfig: function () {
      this.isRandom = this.config.isRandom;
      this.isRepeat = this.config.isRepeat;
    },
    nextSong: function () {
      this.currentIndex++;
      if (this.currentIndex >= this.songs.length) {
        this.currentIndex = 0;
      }
      this.loadCurrentSong();
    },
    prevSong: function () {
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = this.songs.length - 1;
      }
      this.loadCurrentSong();
    },
    playRandomSong: function () {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * this.songs.length); //this đây là app
        // console.log(newIndex, this.currentIndex);
      } while (newIndex === this.currentIndex);

      this.currentIndex = newIndex;
      this.loadCurrentSong();
    },

    start: function () {
      // Assign configuration from config to application
      this.loadConfig();

      // Defines properties for the object
      this.defineProperties();

      // Listening / handling events (DOM events)
      this.handleEvents();

      // Load the first song information into the UI when running the app
      this.loadCurrentSong();

      // Render playlist
      this.render();

      // Display the initial state of the repeat & random button
      randomBtn.classList.toggle("active", this.isRandom);
      repeatBtn.classList.toggle("active", this.isRepeat);
    }
};

app.start();

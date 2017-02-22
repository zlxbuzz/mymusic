import axios from '../service/axios.js'

export const newList = ({ commit }) => {
  return new Promise((resolve, reject)=> {
    axios({
      method:'get',
      url: '?url=http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&format=json&type=1&offset=0&size=50',
      params: {
        // method:`baidu.ting.billboard.billList`,
        // format:`json`,
        // type:1,
        // offset:0,
        // size : 5
        // url:`http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&format=json&type=1&offset=0&size=5`
      }
    })
    .then((response) => {
        const ids = response.song_list;
        commit('setSongList',ids);
        resolve(response);
    })
    .catch((error) => {
            console.log(error);
    })
  });
}
export const play = ({ commit },music) => {
  return new Promise((resolve, reject)=> {
    axios({
      method:'get',
      // url: 'v1/restserver/ting',
      url: '?url=http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid='+music.song_id,
      params: {
        // method:`baidu.ting.song.play`,
        // songid:songid
      }
    })
    .then((response) => {
        commit('currentMusic',music)
        // 需要做一个域名替换
        commit('changeSong',{ src : response.bitrate.show_link.replace(/http:\/\/zhangmenshiting/,'http://musicdata'),id:music.song_id}); //获得的数据通过mutation，存入store中
        resolve(response);
    })
    .catch((error) => {
    })
  });
}


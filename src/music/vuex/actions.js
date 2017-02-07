import axios from '../service/axios.js'

export const newList = ({ commit }) => {
  return new Promise((resolve, reject)=> {
    axios({
      method:'get',
      url: 'v1/restserver/ting',
      params: {
        method:`baidu.ting.billboard.billList`,
        format:`json`,
        type:1,
        offset:0,
        size : 5
      }
    })
    .then((response) => {
        // commit(types.LOGIN,response.data.data); //获得的数据通过mutation，存入store中
        resolve(response);
    })
    .catch((error) => {
    })
  });
}
export const play = ({ commit },songid) => {
  return new Promise((resolve, reject)=> {
    axios({
      method:'get',
      url: 'v1/restserver/ting',
      params: {
        method:`baidu.ting.song.play`,
        songid:songid
      }
    })
    .then((response) => {
      console.log(response);
        // 需要做一个域名替换
        commit('changeSong',response.bitrate.show_link.replace(/http:\/\/zhangmenshiting/,'http://musicdata')); //获得的数据通过mutation，存入store中
        resolve(response);
    })
    .catch((error) => {
    })
  });
}


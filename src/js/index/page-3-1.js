var query = new AV.Query('Song')
var songsList = query.find().then((songs)=>{
  window.songsArray = songs.map((song)=>{
    return {id: song.id, ...song.attributes}
  })
})

let template = `
<li>
  <h3>{{song.name}}</h3>
  <p>
    <svg class="icon icon-sq">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-sq"></use>
    </svg>
    {{song.singer}}
  </p>
  <a class="playButton" href="./song.html?id={{song.id}}">
    <svg class="icon icon-play">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play"></use>
    </svg>
  </a>
</li>
`

let searchBtn = document.getElementById('namanyay-search-btn')
searchBtn.addEventListener('click', function(){
  let searchText = document.getElementById('search')
  let searchContent = searchText.value.trim()
  let result = searchSong(searchContent)
  result.map((song)=> {
    let li = template
      .replace('{{song.name}}', song.name)
      .replace('{{song.singer}}', song.singer)
      .replace('{{song.id}}', song.id);
      
    document.getElementById('searchResult').innerHTML = li
  })
})

// {
//   let $li = $(this.template
//     .replace('{{song.name}}', song.name)
//     .replace('{{song.singer}}', song.singer)
//     .replace('{{song.id}}', song.id)
//   )
//   this.$el.find('ol.list').append($li)
// }

function searchSong(searchContent) {
  let result = songsArray.filter((item)=> {
    return item.name.indexOf(searchContent)>=0
  })
  return result
}
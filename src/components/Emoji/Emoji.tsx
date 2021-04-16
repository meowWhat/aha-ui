import './Emoji.less'
import Picker from 'emoji-picker-react'

export default function Emoji(
  props: {
    onPick: (value: string) => void
  }
) {

  return <Picker
    onEmojiClick={(_, value) => {
      props.onPick(value.emoji)
    }}
    disableSearchBar
    disableSkinTonePicker
    groupNames={{
      smileys_people: '人脸',
      animals_nature: '表情',
      food_drink: '食物',
      travel_places: '旅游',
      activities: '游戏',
      objects: '物品',
      symbols: '标记',
      flags: '旗帜',
      recently_used: '最近使用',
    }}
    pickerStyle={{ width: '100%' }}
  />
}

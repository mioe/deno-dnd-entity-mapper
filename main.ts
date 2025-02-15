// https://gist.githubusercontent.com/tkfu/9819e4ac6d529e225e9fc58b358c3479/raw/d4df8804c25a662efc42936db60cfbc0a5b19db8/srd_5e_monsters.json
import DATA from './data.json' with { type: 'json' }
interface IInput {
	name: string
	meta: string
	"Armor Class": string
	Speed: string
	STR: string
  STR_mod: string
  DEX: string
  DEX_mod: string
  CON: string
  CON_mod: string
  INT: string
  INT_mod: string
  WIS: string
  WIS_mod: string
  CHA: string
  CHA_mod: string
  "Saving Throws": string
  Skills: string
  Senses: string
  Languages: string
  Challenge: string
  Traits: string
  Actions: string
  "Legendary Actions": string,
  img_url: string
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	const data = DATA as unknown as [IInput]
	console.log('🦕 data', data[0])

}

// deno-lint-ignore-file
// https://gist.githubusercontent.com/tkfu/9819e4ac6d529e225e9fc58b358c3479/raw/d4df8804c25a662efc42936db60cfbc0a5b19db8/srd_5e_monsters.json
import DATA from './srd_5e_monsters.json' with { type: 'json' }
import type { IEntity, INote, ISavingThrow, ISkill } from './interfaces.ts'
import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts'

// console.table(countUniqueKeys(data))
// ┌────────────────────────┬────────┐
// │ (idx)                  │ Values │
// ├────────────────────────┼────────┤
// │ name                   │ 327    │
// │ meta                   │ 327    │
// │ Armor Class            │ 327    │
// │ Hit Points             │ 327    │
// │ Speed                  │ 327    │
// │ STR                    │ 327    │
// │ STR_mod                │ 327    │
// │ DEX                    │ 327    │
// │ DEX_mod                │ 327    │
// │ CON                    │ 327    │
// │ CON_mod                │ 327    │
// │ INT                    │ 327    │
// │ INT_mod                │ 327    │
// │ WIS                    │ 327    │
// │ WIS_mod                │ 327    │
// │ CHA                    │ 327    │
// │ CHA_mod                │ 327    │
// │ Saving Throws          │ 93     │
// │ Skills                 │ 194    │
// │ Senses                 │ 327    │
// │ Languages              │ 327    │
// │ Challenge              │ 327    │
// │ Traits                 │ 270    │
// │ Actions                │ 324    │
// │ Legendary Actions      │ 30     │
// │ img_url                │ 327    │
// │ Damage Immunities      │ 129    │
// │ Condition Immunities   │ 92     │
// │ Damage Resistances     │ 65     │
// │ Damage Vulnerabilities │ 16     │
// │ Reactions              │ 13     │
// └────────────────────────┴────────┘

interface IInput {
	name: string
	meta: string
	"Armor Class": string
	"Hit Points": string
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
	"Saving Throws"?: string
	Skills?: string
	Senses: string
	Languages: string
	Challenge: string
	Traits?: string // html
	Actions: string // html
	"Legendary Actions"?: string // html
	img_url: string
	"Damage Immunities"?: string
	"Condition Immunities"?: string
	"Damage Resistances"?: string
	"Damage Vulnerabilities"?: string
	Reactions?: string
}

export const data = DATA as unknown as [IInput]

const keyHelperForSavingThrows = {
	str: 'savingThrowStrength',
	dex: 'savingThrowDexterity',
	con: 'savingThrowConstitution',
	int: 'savingThrowIntelligence',
	wis: 'savingThrowWisdom',
	cha: 'savingThrowCharisma',
}

const keyHelperForSkills = {
	'acrobatics': 'acrobatics',
	'animal handling': 'animalHandling',
	'arcana': 'arcana',
	'athletics': 'athletics',
	'deception': 'deception',
	'history': 'history',
	'insight': 'insight',
	'intimidation': 'intimidation',
	'investigation': 'investigation',
	'medicine': 'medicine',
	'nature': 'nature',
	'perception': 'perception',
	'performance': 'performance',
	'persuasion': 'persuasion',
	'religion': 'religion',
	'sleight of hand': 'sleightOfHand',
	'stealth': 'stealth',
	'survival': 'survival',
}

function htmlParser(htmlCode: string) {
	const doc = new DOMParser().parseFromString(htmlCode, 'text/html')
	if (!doc) {
		throw new Error('Ошибка парсинга HTML')
	}

	const result: [string, string][] = []
	doc.querySelectorAll('p').forEach((p) => {
		const title = p.querySelector('strong')?.textContent.trim() || ''
		const text = p.textContent.replace(title, '').trim()
		result.push([title, text])
	})
	return result
}

export function changeProperties(input: IInput): IEntity {
	let entity = {
		proficiencyBonus: '',
		sourceLink: 'https://gist.githubusercontent.com/tkfu/9819e4ac6d529e225e9fc58b358c3479/raw/d4df8804c25a662efc42936db60cfbc0a5b19db8/srd_5e_monsters.json',
		strength: { score: '', modifier: '' },
		dexterity: { score: '', modifier: '' },
		constitution: { score: '', modifier: '' },
		intelligence: { score: '', modifier: '' },
		wisdom: { score: '', modifier: '' },
		charisma: { score: '', modifier: '' },
		notes: [],
	} as unknown as IEntity
	Object.entries(input).forEach((row) => {
		const key = row[0] as keyof IInput
		const val = row[1]

		switch (key) {
			case 'name': {
				entity.name = val.trim()
				break
			}

			case 'meta': {
				entity.shortDescription = val.trim()
				break
			}

			case 'Armor Class': {
				const armor = val.split(' ')
				const armorClass = armor[0]
				entity.armorClass = armorClass.trim()
				entity.armorType = val.replace(armorClass, '').trim()
				break
			}

			case 'Hit Points': {
				entity.hits = val.trim()
				break
			}

			case 'Speed': {
				entity.speed = val.trim()
				break
			}

			case 'STR': {
				entity.strength.score = val.trim()
				break
			}
			case 'STR_mod': {
				entity.strength.modifier = val.replace(/[^+\d]/g, '').trim()
				break
			}

			case 'DEX': {
				entity.dexterity.score = val.trim()
				break
			}
			case 'DEX_mod': {
				entity.dexterity.modifier = val.replace(/[^+\d]/g, '').trim()
				break
			}

			case 'CON': {
				entity.constitution.score = val.trim()
				break
			}
			case 'CON_mod': {
				entity.constitution.modifier = val.replace(/[^+\d]/g, '').trim()
				break
			}

			case 'INT': {
				entity.intelligence.score = val.trim()
				break
			}
			case 'INT_mod': {
				entity.intelligence.modifier = val.replace(/[^+\d]/g, '').trim()
				break
			}

			case 'WIS': {
				entity.wisdom.score = val.trim()
				break
			}
			case 'WIS_mod': {
				entity.wisdom.modifier = val.replace(/[^+\d]/g, '').trim()
				break
			}

			case 'CHA': {
				entity.charisma.score = val.trim()
				break
			}
			case 'CHA_mod': {
				entity.charisma.modifier = val.replace(/[^+\d]/g, '').trim()
				break
			}

			case 'Saving Throws': {
				val.toLowerCase().split(',').forEach((strSavingThrow: string) => {
					const savingThrow = strSavingThrow.trim().split(' ')
					// @ts-ignore
					const savingThrowKey = keyHelperForSavingThrows[savingThrow[0]]
					if (savingThrowKey) {
						const savingThrowObj = {
							isSelected: true,
							score: '',
						} as ISavingThrow
						savingThrowObj.score = savingThrow[1].replace(/[^+\d]/g, '')
						// @ts-ignore
						entity[savingThrowKey] = savingThrowObj
					} else {
						console.error('🦕 NOT FOUND: Saving Throw:', savingThrow[0])
					}
				})
				break
			}

			case 'Skills': {
				// console.log('🦕 Skills', val)
				val.toLowerCase().split(',').forEach((strSkill: string) => {
					const skillVal = strSkill.trim().split(' ').at(-1)
					// @ts-ignore
					const skillKey = val.replace(skillVal, '').trim()
					if (skillKey) {
						const skillObj = {
							isSelected: true,
							score: '',
						} as ISkill
						// @ts-ignore
						skillObj.score = skillVal.replace(/[^+\d]/g, '')
						// @ts-ignore
						entity[skillKey] = skillObj
					} else {
						console.error('🦕 NOT FOUND: Skill:', skillKey)
					}
				})
				break
			}

			case 'Challenge': {
				const note = {
					title: key,
					text: val,
					color: 'purple',
				} as INote
				entity.notes?.push(note)
				break
			}

			case 'img_url': {
				entity.avatar = val
				break
			}

			case 'Traits': {
				const noteOnlyTitle = {
					title: key,
					text: '',
					color: 'blue',
				} as INote
				entity.notes?.push(noteOnlyTitle)

				const result = htmlParser(val)
				result.forEach(([title, text]) => {
					const note = {
						title,
						text,
					} as INote
					entity.notes?.push(note)
				})
				break
			}

			case 'Actions': {
				const noteOnlyTitle = {
					title: key,
					text: '',
					color: 'blue',
				} as INote
				entity.notes?.push(noteOnlyTitle)

				const result = htmlParser(val)
				result.forEach(([title, text]) => {
					const note = {
						title,
						text,
					} as INote
					entity.notes?.push(note)
				})
				break
			}

			case 'Legendary Actions': {
				const noteOnlyTitle = {
					title: key,
					text: '',
					color: 'orange',
				} as INote
				entity.notes?.push(noteOnlyTitle)

				const result = htmlParser(val)
				result.forEach(([title, text]) => {
					const note = {
						title,
						text,
					} as INote
					entity.notes?.push(note)
				})
				break
			}

			case 'Reactions': {
				const noteOnlyTitle = {
					title: key,
					text: '',
					color: 'blue',
				} as INote
				entity.notes?.push(noteOnlyTitle)

				const result = htmlParser(val)
				result.forEach(([title, text]) => {
					const note = {
						title,
						text,
					} as INote
					entity.notes?.push(note)
				})
				break
			}

			default: {
				// @ts-ignore
				const note = {
					title: key,
					text: val,
				} as INote
				entity.notes?.push(note)
				break
			}
		}
	})

	return entity
}

export interface IAbility {
	score: string
	modifier: string
}

export interface ISkill {
	isSelected: boolean
	score: string
}

export interface ISavingThrow {
	isSelected: boolean
	score: string
}

export interface INote {
	title: string
	text: string
	color?: string
}

export interface IEntity {
	id?: string
	name: string
	shortDescription: string
	sourceLink: string
	avatar?: string
	hits: string
	speed: string
	proficiencyBonus: string
	armorClass: string
	armorType: string

	strength: IAbility
	dexterity: IAbility
	constitution: IAbility
	intelligence: IAbility
	wisdom: IAbility
	charisma: IAbility

	notes?: INote[]

	acrobatics?: ISkill
	animalHandling?: ISkill
	arcana?: ISkill
	athletics?: ISkill
	deception?: ISkill
	history?: ISkill
	insight?: ISkill
	intimidation?: ISkill
	investigation?: ISkill
	medicine?: ISkill
	nature?: ISkill
	perception?: ISkill
	performance?: ISkill
	persuasion?: ISkill
	religion?: ISkill
	sleightOfHand?: ISkill
	stealth?: ISkill
	survival?: ISkill

	savingThrowStrength?: ISavingThrow
	savingThrowDexterity?: ISavingThrow
	savingThrowConstitution?: ISavingThrow
	savingThrowIntelligence?: ISavingThrow
	savingThrowWisdom?: ISavingThrow
	savingThrowCharisma?: ISavingThrow
}

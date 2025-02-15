import data from './srd_5e_monsters.ts'

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	console.log('🦕 data', data[0])
}

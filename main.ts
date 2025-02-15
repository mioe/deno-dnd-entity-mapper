import { changeProperties, data } from './srd_5e_monsters.ts'

export function countUniqueKeys(
	// deno-lint-ignore no-explicit-any
	objects: Record<string, any>[],
): Record<string, number> {
	const keyCounts: Record<string, number> = {}

	objects.forEach((obj) => {
		Object.keys(obj).forEach((key) => {
			keyCounts[key] = (keyCounts[key] || 0) + 1
		})
	})

	return keyCounts
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
	const result = data.map(row => changeProperties(row))
	console.log('🦕 result', result[0])

	const [isBuild] = Deno.args
	if (isBuild === 'build') {
		try {
			console.log('%c🦕 try generate output.json file', 'color: yellow;')
			await Deno.writeTextFile(`output-${Date.now()}.json`, JSON.stringify(result));
			console.log('%c✅ success', 'color: green;')
	} catch(e) {
			console.error(e);
		}
	}
}

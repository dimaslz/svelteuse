import { get, type Readable, writable } from "svelte/store";

export type EasingFunction = (n: number) => number;
export type CubicBezierPoints = [number, number, number, number];

export interface UseTransitionOptions {
	duration?: number;
	delay?: number;
	easing?: EasingFunction | CubicBezierPoints;
	disabled?: boolean;
	onStarted?: () => void;
	onFinished?: () => void;
}

function linear(n: number) {
	return n;
}

function createEasingFunction([p0, p1, p2, p3]: CubicBezierPoints): EasingFunction {
	const a = (a1: number, a2: number) => 1 - 3 * a2 + 3 * a1;
	const b = (a1: number, a2: number) => 3 * a2 - 6 * a1;
	const c = (a1: number) => 3 * a1;
	const calcBezier = (t: number, a1: number, a2: number) =>
		((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
	const getSlope = (t: number, a1: number, a2: number) =>
		3 * a(a1, a2) * t * t + 2 * b(a1, a2) * t + c(a1);
	const getTforX = (x: number) => {
		let aGuessT = x;
		for (let i = 0; i < 4; ++i) {
			const currentSlope = getSlope(aGuessT, p0, p2);
			if (currentSlope === 0) return aGuessT;
			const currentX = calcBezier(aGuessT, p0, p2) - x;
			aGuessT -= currentX / currentSlope;
		}
		return aGuessT;
	};
	return (x: number) => (p0 === p1 && p2 === p3 ? x : calcBezier(getTforX(x), p1, p3));
}

function lerp(a: number, b: number, alpha: number) {
	return a + alpha * (b - a);
}

export function useTransition(
	value: number | Readable<number>,
	options: UseTransitionOptions = {},
): Readable<number> {
	const {
		duration = 1000,
		delay = 0,
		disabled = false,
		easing = linear,
		onStarted,
		onFinished,
	} = options;

	const transition = writable(typeof value === "number" ? value : get(value));
	let animationFrame: number | null = null;
	let currentId = 0;

	let lastTarget = typeof value === "number" ? value : get(value);

	if (typeof value !== "number") {
		value.subscribe((newVal) => {
			if (disabled) {
				transition.set(newVal);
				return;
			}

			const start = get(transition);
			const end = newVal;
			if (start === end) return;

			currentId++;
			const id = currentId;

			if (animationFrame) cancelAnimationFrame(animationFrame);

			const easeFn = typeof easing === "function" ? easing : createEasingFunction(easing);
			const startTime = performance.now() + delay;

			onStarted?.();

			const loop = (now: number) => {
				if (id !== currentId) return;
				const elapsed = Math.max(0, now - startTime);
				const alpha = Math.min(1, elapsed / duration);
				transition.set(lerp(start, end, easeFn(alpha)));

				if (alpha < 1) {
					animationFrame = requestAnimationFrame(loop);
				} else {
					transition.set(end);
					onFinished?.();
				}
			};

			animationFrame = requestAnimationFrame(loop);
		});
	}

	return {
		subscribe: transition.subscribe,
	};
}

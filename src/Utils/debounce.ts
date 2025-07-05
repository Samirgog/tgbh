export function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timerId: ReturnType<typeof setTimeout> | undefined; // Тип для ID таймера

    return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
        // Очищаем предыдущий таймер, если он существует
        if (timerId !== undefined) {
            clearTimeout(timerId);
        }

        // Устанавливаем новый таймер
        timerId = setTimeout(() => {
            // Вызываем оригинальную функцию с правильным контекстом (this) и аргументами
            func.apply(this, args);
        }, delay);
    };
}

export function formatCurrency(
    amount: number,
    currencyCode: string = "usd"
): string {
    try {
        return new Intl.NumberFormat("en-us", {
            style: "currency",
            currency: currencyCode.toUpperCase(),
        }).format(amount);
    } catch (error) {
        console.error("Invalid currency code:", currencyCode, error);
        return `${currencyCode.toUpperCase()} ${amount.toFixed(2)}`;
    }
}
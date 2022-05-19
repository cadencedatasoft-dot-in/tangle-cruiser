export type AccountType = {
    id: number;
    key: string;
    amount: number;
};

export type AccountsType = {
    id: number;
    key: string;
    amount: number;
}[];

export type AddAccountType = {
    key: string;
    ok: boolean;
}
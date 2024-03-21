type ResponseFiltersType = FilterClauseType[];

type FilterClauseType = {
	id: string;
	condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
	value: number | string;
}

type ApiResponseDataType = {
	responses: any[];
}

export { ResponseFiltersType, FilterClauseType, ApiResponseDataType };
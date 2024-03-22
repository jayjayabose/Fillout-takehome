type ResponseFiltersType = FilterClauseType[];

type FilterClauseType = {
  id: string;
  condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
  value: number | string;
};

interface ISubmissionsResponse {
  responses: IResponse[];
  totalResponses: number;
  pageCount: number;
}

interface IResponse {
  submissionId: string;
  submissionTime: string;
  lastUpdatedAt: string;
  questions: IQuestion[] | [];
  calculations: ICalculation[] | []; 
  urlParameters: IUrlParameters[] | []; 
  quiz?: {
		score: number,
		maxScore: number
	} | {};
  documents: any[] | []; // any for now, did not find description: https://www.fillout.com/help/fillout-rest-api#51324dd9c31c46a39068d0be81ab54d4
}

interface IQuestion {
  id: string;
  name: string;
  type: QuestionType;
  value?: string | number | null;
}
const questionTypes = ['Address', 'AudioRecording', 'Calcom', 'Calendly', 'Captcha', 'Checkbox', 'Checkboxes', 'ColorPicker', 'CurrencyInput', 'DatePicker', 'DateRange', 'DateTimePicker', 'Dropdown', 'EmailInput', 'FileUpload', 'ImagePicker', 'LocationCoordinates', 'LongAnswer', 'Matrix', 'MultiSelect', 'MultipleChoice', 'NumberInput', 'OpinionScale', 'Password', 'Payment', 'PhoneNumber', 'Ranking', 'RecordPicker', 'ShortAnswer', 'Signature', 'Slider', 'StarRating', 'Switch', 'TimePicker', 'URLInput'] as const;
type QuestionType = typeof questionTypes[number];

interface ICalculation {
  id: string;
  name: string;
  type: 'number' | 'text';
	value?: string;
}

interface IUrlParameters {
  id: string;
  name: string;
	value?: string;
}

export {ISubmissionsResponse, IResponse, IQuestion, ResponseFiltersType, FilterClauseType}
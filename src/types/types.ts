type ResponseFiltersType = FilterClauseType[];

type FilterClauseType = {
  id: string;
  condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
  value: number | string;
};

interface SubmissionsResponseInterface {
  responses: ResponseInterface[];
  totalResponses: number;
  pageCount: number;
}

interface ResponseInterface {
  submissionId: string;
  submissionTime: string;
  lastUpdatedAt: string;
  questions: QuestionInterface[] | [];
  calculations: CalculationInterface[] | [];
  urlParameters: UrlParametersInterface[] | [];
  quiz?:
    | {
        score: number;
        maxScore: number;
      }
    | {};
  documents: any[] | []; // any for now, did not find type description: https://www.fillout.com/help/fillout-rest-api#51324dd9c31c46a39068d0be81ab54d4
}

interface QuestionInterface {
  id: string;
  name: string;
  type: QuestionTypeType;
  value?: string | number | null;
}
const questionTypes = [
  'Address',
  'AudioRecording',
  'Calcom',
  'Calendly',
  'Captcha',
  'Checkbox',
  'Checkboxes',
  'ColorPicker',
  'CurrencyInput',
  'DatePicker',
  'DateRange',
  'DateTimePicker',
  'Dropdown',
  'EmailInput',
  'FileUpload',
  'ImagePicker',
  'LocationCoordinates',
  'LongAnswer',
  'Matrix',
  'MultiSelect',
  'MultipleChoice',
  'NumberInput',
  'OpinionScale',
  'Password',
  'Payment',
  'PhoneNumber',
  'Ranking',
  'RecordPicker',
  'ShortAnswer',
  'Signature',
  'Slider',
  'StarRating',
  'Switch',
  'TimePicker',
  'URLInput',
] as const;
type QuestionTypeType = (typeof questionTypes)[number];

interface CalculationInterface {
  id: string;
  name: string;
  type: 'number' | 'text';
  value?: string;
}

interface UrlParametersInterface {
  id: string;
  name: string;
  value?: string;
}

export {
  SubmissionsResponseInterface,
  ResponseInterface,
  QuestionInterface,
  ResponseFiltersType,
  FilterClauseType,
};

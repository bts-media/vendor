import { DispatchType, LangType } from '~types/index';

export interface ILanguageContextData {
    lang: LangType;
    setLang: DispatchType<LangType>;
}

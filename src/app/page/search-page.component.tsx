import "./search-page.component.scss"
import * as React from "react";
import {TermService} from "@/shared/services/term.service";
import {StyleService} from "@/shared/services/style.service";
import {BrandService} from "@/shared/services/brand.service";
import {Select, SelectValue} from "@/shared/components/form/select.component";
import {formatDataToSelect} from "@/shared/helpers/api-data.helper";
import {useRouteMatch, useHistory} from "react-router-dom";
import {PageLoader} from "@/shared/components/page-loader.component";

type SelectDataType = {
    terms: SelectValue[],
    styles: SelectValue[],
    brands: SelectValue[],
}

export const SearchPage: React.FC = () => {
    const [selectData, setSelectData] = React.useState<SelectDataType>(null);

    const [selectedTerm, setSelectedTerm] = React.useState("");
    const [selectedStyle, setSelectedStyle] = React.useState("");
    const [selectedBrand, setSelectedBrand] = React.useState("");

    const [isLoadError, setIsLoadError] = React.useState(false);

    const urlData = useRouteMatch();
    const history = useHistory();

    React.useEffect(() => readDataFromUrl(Object.values(urlData.params)), []);

    React.useEffect(() => replaceUrlData(), [selectedTerm, selectedStyle, selectedBrand]);

    React.useEffect(() => {
        (async function () {
            await loadSearchData();
        })()
    }, []);


    function replaceUrlData() {
        let urlData = "";
        if (selectedTerm) {
            urlData += `/s-${selectedTerm}`;
        }
        if (selectedBrand) {
            urlData += `/b-${selectedBrand}`;
        }
        if (selectedStyle) {
            urlData += `/st-${selectedStyle}`;
        }
        history.replace(urlData);
    }

    function loadSearchData() {
        const promiseData = Promise.all([
            TermService.getTerms(),
            StyleService.getStyles(),
            BrandService.getBrands()
        ]);

        return promiseData
            .then(data => {
                const [terms, styles, brands] = data;
                setSelectData({
                    terms: formatDataToSelect(terms.data),
                    styles: formatDataToSelect(styles.data),
                    brands: formatDataToSelect(brands.data),
                })
            })
            .catch((error) => {
                console.log("Load data error", error)
                setIsLoadError(true);
            });
    }

    function readDataFromUrl(params: string[]) {
        let dataMatch = [
            {regExp: "^s-", replace: "s-", setData: setSelectedTerm},
            {regExp: "^b-", replace: "b-", setData: setSelectedBrand},
            {regExp: "^st-", replace: "st-", setData: setSelectedStyle},
        ];

        params
            .filter(Boolean)
            .forEach((param) => {
                dataMatch.forEach((data) => {
                    if (param.match(data.regExp)) {
                        data.setData(param.replace(data.replace, ''));
                    }
                });
            })
    }

    return (


        <div className="search-page">
            {selectData ? (
                <div className="search-page__select-wrapper">
                    <Select
                        selected={selectedTerm}
                        value={selectData.terms}
                        onChange={setSelectedTerm}
                        emptyOptionName="Выберите из списка..."
                    />
                    <Select
                        selected={selectedStyle}
                        value={selectData.styles}
                        onChange={setSelectedStyle}
                        emptyOptionName="Выберите из списка..."
                    />
                    <Select
                        selected={selectedBrand}
                        value={selectData.brands}
                        onChange={setSelectedBrand}
                        emptyOptionName="Выберите из списка..."
                    />
                </div>
            ) : (
                <>
                    {isLoadError
                        ? <div>Load error. Please reload page.</div>
                        : <PageLoader/>
                    }
                </>
            )}
        </div>
    );
};
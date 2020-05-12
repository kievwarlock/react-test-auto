import "./search-page.component.scss"
import * as React from "react";
import {TermService} from "@/shared/services/term.service";
import {StyleService} from "@/shared/services/style.service";
import {BrandService} from "@/shared/services/brand.service";
import {Select, SelectValue} from "@/shared/components/form/select.component";
import {useRouteMatch, useHistory} from "react-router-dom";
import {PageLoader} from "@/shared/components/page-loader.component";
import {ParseService, ParseLinkType} from "@/shared/services/parse.service";

type SelectDataType = {
    service?: SelectValue[],
    style?: SelectValue[],
    brand?: SelectValue[],
}

export const SearchPage: React.FC = () => {
    const urlData = useRouteMatch();
    const history = useHistory();

    const [selectData, setSelectData] = React.useState<SelectDataType>(null);
    const [selectedTerm, setSelectedTerm] = React.useState("");
    const [selectedStyle, setSelectedStyle] = React.useState("");
    const [selectedBrand, setSelectedBrand] = React.useState("");
    const [isLoadError, setIsLoadError] = React.useState(false);


    React.useEffect(() => replaceUrlData(), [selectedTerm, selectedStyle, selectedBrand]);

    React.useEffect(() => {
        (async function () {
            const urlProps = Object.values(urlData.params).filter(Boolean);
            if (urlProps?.length > 0) {
                await readDataFromUrl(urlProps);
            }
        })()
    }, []);

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
                    service: terms.data,
                    style: styles.data,
                    brand: brands.data,
                })
            })
            .catch((error) => {
                console.log("Load data error", error);
                setIsLoadError(true);
            });
    }

    async function readDataFromUrl(params: any[]) {
        let parseData: ParseLinkType = {};

        params.forEach((param) => {
            if (param.match("^s-")) {
                parseData.service = param.replace("s-", '');
                setSelectedTerm(parseData.service);
            }
            if (param.match("^b-")) {
                parseData.brand = param.replace("b-", '');
                setSelectedBrand(parseData.brand);
            }
            if (param.match("^st-")) {
                parseData.style = param.replace("st-", '');
                setSelectedStyle(parseData.style);
            }
        });

        try {
            const {service, brand, style} = await ParseService.parseLink(parseData);
            setSelectData({
                service: service.id ? [...service] : null,
                brand: brand.id ? [...brand] : null,
                style: style.id ? [...style] : null,
            });
        }catch (error) {
            setIsLoadError(true);
        }
    }

    return (
        <div className="search-page">
            {selectData ? (
                <div className="search-page__select-wrapper">
                    <Select
                        selected={selectedTerm}
                        value={selectData.service}
                        onChange={setSelectedTerm}
                        emptyOptionName="Выберите из списка..."
                    />
                    <Select
                        selected={selectedStyle}
                        value={selectData.style}
                        onChange={setSelectedStyle}
                        emptyOptionName="Выберите из списка..."
                    />
                    <Select
                        selected={selectedBrand}
                        value={selectData.brand}
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
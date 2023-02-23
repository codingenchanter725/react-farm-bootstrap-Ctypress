import React, { FC, ReactElement, useContext, useState, useEffect, useRef } from "react";
import { Button, Form, Card, Breadcrumb, Row } from "react-bootstrap";
import "../../../App.scss";
import { useNavigate, useParams } from "react-router-dom";
import * as ServicePlantUserDetails from "../services/PlantUserDetails";
import ReportFilterPlantUserDetails from "../filters/PlantUserDetails";
import { ReportGridPlantUserDetails } from "../visualization/grid/PlantUserDetails";
import * as ReportService from "../services/PlantUserDetails";
import { ReportPagination } from "../input-fields/Pagination";
import { ReportDetailThreeColPlantUserDetails } from "../visualization/detail-three-column/PlantUserDetails";

export const ReportConnectedPlantUserDetails: FC = (): ReactElement => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(1);
    const [initPageResponse, setInitPageResponse] = useState(new ReportService.InitResultInstance);
    const [queryResult, setQueryResult] = useState(new ReportService.QueryResultInstance); 
    const [query, setQuery] = useState(new ReportService.QueryRequestInstance);
    const [initialValues, setInitialValues] = useState(new ReportService.QueryRequestInstance);
    const isInitializedRef = useRef(false);

    const navigate = useNavigate();
    const { id } = useParams();
    const contextCode: string = id ?? "00000000-0000-0000-0000-000000000000";

    const displayItem:ReportService.QueryResultItem = queryResult.items.length > 0 ?  queryResult.items[0] : new ReportService.QueryResultItemInstance;

    const handleInit = (responseFull: any) => {
        
        const response: ReportService.InitResult = responseFull.data;

        if (!response.success) {
            return;
        }
        setInitPageResponse({...response})
    }

    const handleQueryResults = (responseFull: any) => {
        const queryResult: ReportService.QueryResult = responseFull.data;

        if (!queryResult.success) {
            return;
        }

        setQueryResult({ ...queryResult });
    }

    const onSubmit = (queryRequest: ReportService.QueryRequest) => {
        console.log('onSubmit setQuery');
        setQuery({ ...queryRequest });
    }

    const onPageSelection = (pageNumber: number) => {
        console.log('onPageSelection setQuery');
        setQuery({ ...query, pageNumber: pageNumber });
    }


    const onPageSizeChange = (pageSize: number) => {
        console.log('onPageSizeChange setQuery');
        setQuery({ ...query, ItemCountPerPage: pageSize });
    }

    const onRowSelect = (index: number) => {
    }

    const onRowUnselect = (index: number) => {
    }

    const onSelectAll = () => {
    }

    const onUnselectAll = () => {
    }

    const onNavigateTo = (url: string) => { 
        navigate(url); 
    }
    
    const navigateTo = (page: string, codeName:string) => { 
        let targetContextCode = contextCode; 
        Object.entries(initPageResponse)
        .forEach(([key, value]) => { 
            if(key == codeName)
            {
                if(value != ''
                    && value != '00000000-0000-0000-0000-000000000000') {
                    targetContextCode = value;
                } else {
                    return;
                }
            }
        })
        const url = '/' + page + '/' + targetContextCode; 
        navigate(url);
    }

    const onSort = (columnName: string) => {
        let orderByDescending = false;
        if (query.OrderByColumnName == columnName) {
            orderByDescending = !query.OrderByDescending;
        }
        console.log('onSort setQuery');
        setQuery({ ...query, OrderByColumnName: columnName, OrderByDescending: orderByDescending })
    }

    const onRefreshRequest =() => {
        console.log('onRefreshRequest setQuery');
        setQuery({ ...query});
    }

    useEffect(() => {
        if (isInitializedRef.current) {
            return;
        }
        isInitializedRef.current = true;
        ReportService.initPage(contextCode)
            .then(response => handleInit(response));
    });

    useEffect(() => {
        const newInitalValues = ReportService.buildQueryRequest(initPageResponse);   
        setInitialValues({ ...newInitalValues });
    }, [initPageResponse]); 
    

    useEffect(() => { 
        if(JSON.stringify(initialValues) !== JSON.stringify(query)){ 
            setQuery({ ...initialValues });
        }
    }, [initialValues]); 

    useEffect(() => { 
        ReportService.submitRequest(query, contextCode)
            .then(response => handleQueryResults(response));
    }, [query]); 

    return (

        <div className="plants-container" data-testid="reportConnectedPlantUserDetails">
            <div className="breadcrumb-container">
                <Breadcrumb>
                    <Breadcrumb.Item id="tacFarmDashboardBreadcrumb" onClick={() => navigateTo('tac-farm-dashboard',"tacCode")}>
                        Farm Dashboard breadcrumb text
                    </Breadcrumb.Item>
                    <Breadcrumb.Item id="landPlantListBreadcrumb" onClick={() => navigateTo('land-plant-list',"landCode")}>
                        Plant List breadcrumb text
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        Plant Details
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <h1>Plant Details</h1>
            <h6>Plant Details page intro text</h6>
            <div className="plants-list-button-header">
                <Button onClick={() => navigateTo("land-plant-list","landCode")} className='primary-button' data-testid="plant-btn" type="submit">
                    Plant List
                </Button>
            </div>  
            <ReportDetailThreeColPlantUserDetails 
                item= {displayItem}
                name="reportConnectedPlantUserDetails-table" 
                onNavigateTo={onNavigateTo} 
                onRefreshRequest={onRefreshRequest}
            /> 
        </div>
    );
};
export default ReportConnectedPlantUserDetails;
import "./Wikipage.css"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";

function WikiPage() {
    const {searchQuery} = useParams();
    const [data, setData] = useState(null);
    const [specific,setSpecific] = useState(null);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/players/${searchQuery}`);
                if (response.ok) {
                    const myData = await response.json();
                    setData(myData);
                    setSpecific(myData.운동_세부사항);
            } else {
                const errorMessage = await response.json()
                setError(errorMessage.message)

            }
        } catch (error) {
            setError("데이터를 가져오는 중 오류가 발생했습니다.")
        }
    };
    fetchData();
},[searchQuery])
    return(
        <div className="container">
            <h1>{searchQuery}</h1>
            <div className="article-container">
                {error ? (
                    <p>{error}</p>
                ) : data ? (
                    <div>
                    <p>부위: {data.부위}</p>
                    <p>근육 : {specific.근육}</p>
                    <p>맨몸운동 : {specific.맨몸운동}</p>
                    <p>바벨운동 : {specific.바벨운동}</p>
                    <p>덤벨운동 : {specific.덤벨운동}</p>
                    </div>
                ) : (
                    <p>데이터를 로드 중입니다.</p>
                )}
                
            </div>
        </div>
    )
}
export default WikiPage
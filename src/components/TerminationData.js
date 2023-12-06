import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function TerminationData() {
  const { enteredDate } = useParams();
  const [dataa, setData] = useState([]);
  const [fomatedData, setfomatedData] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.token == undefined){
      navigate('/')
    }
  },[])
  function get100thDayExcludingSundays(startDateStr) {
    const startDate = new Date(startDateStr);
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    let count = 0;

    while (count < 100) {
      startDate.setTime(startDate.getTime() + oneDayInMilliseconds);

      if (startDate.getDay() !== 0) {
        count++;
      }
    }
    if (startDate.getDay() == 0)
      startDate.setTime(startDate.getTime() - oneDayInMilliseconds);
    else if (startDate.getDay() == 1) {
      startDate.setTime(startDate.getTime() - oneDayInMilliseconds);
      startDate.setTime(startDate.getTime() - oneDayInMilliseconds);
    }
    var parts = startDate.toLocaleDateString().split("/");
    var formattedDate = parts[1] + "/" + parts[0] + "/" + parts[2];
    return formattedDate;
  }

  useEffect(() => {
    const fetchApiData = async () => {
      // const response1 = await fetch("http://localhost:5000/api/borrow/")
      const response1 = await fetch(window.backendUrl + "borrow/")
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Request failed with status: " + response.status);
          }
        })
        .then((data) => {
          setData(data);
          return data;
        })
        .then((data) => {
          function fetchDataByDate(date, d) {
            try {
              // Filter data where DateBorrow matches the received date
              const matches = [];
              const byDateBorrow = d.filter((user) => {
                const name = user.name;
                user.amountArray.forEach((item) => {
                  let temp = convertDateFormat2(
                    get100thDayExcludingSundays(item.DateBorrow)
                  );
                  temp = new Date(temp).toLocaleDateString();

                  if (temp === date) {
                    const obj = {
                      date: temp,
                      TotalBorrow: item.TotalBorrow,
                      name: name,
                      returned: item.TotalBorrow - item.Remaining,
                    };
                    matches.push(obj);
                  }
                });
                console.log(matches);
                return matches.length > 0;
              });

              // Extract and format the data as needed
              const formattedData = {
                byDateBorrow: matches,
              };

              return formattedData;
            } catch (error) {
              console.error("Error fetching data:", error);
              throw error;
            }
          }

          setfomatedData(
            fetchDataByDate(new Date(enteredDate).toLocaleDateString(), data)
          );
          //console.log(fomatedData);
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    };

    fetchApiData();
  }, []);

  useEffect(() => {
    // console.log(dataa);
    console.log(fomatedData);
  }, [fomatedData]);

  function convertDateFormat(inputDate) {
    var parts = inputDate.split("-");
    var formattedDate = parts[1] + "/" + parts[2] + "/" + parts[0];
    return formattedDate;
  }
  function convertDateFormat2(inputDate) {
    var parts = inputDate.split("/");
    var formattedDate = parts[1] + "/" + parts[0] + "/" + parts[2];
    return formattedDate;
  }

  return (
    <div>
      <div className="Bbody">
        <div className="Bcontainer example">
          <div className="Bheading">
            <h1 className="text-[35px] font-semibold underline ">
              Termination Data : ({convertDateFormat(enteredDate)})
            </h1>
          </div>
          <div className="Bamounts">
            <ul className="ull">
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  border: "1px solid #ccc",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                      Sr.No.
                    </th>
                    <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                      Name
                    </th>
                    <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                      Borrow Amount
                    </th>
                    <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                      Return Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fomatedData.length === 0 ? (
                    <>
                      <td>loading</td>
                    </>
                  ) : (
                    <>
                      {fomatedData.byDateBorrow.map((arr, index) => {
                        return (
                          <tr>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                              }}
                            >
                              {index + 1}
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                              }}
                            >
                              {arr.name}
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                              }}
                            >
                              {arr.TotalBorrow}
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                              }}
                            >
                              {arr.TotalBorrow * 10 / 9}
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TerminationData;

import React from 'react'

function TerminationData() {
    return (
        <div>
        <div className="Bbody">
          <div className="Bcontainer example">
            <div className="Bheading">
              <h1 className="" style={{ fontSize: "50px" }}>
                Termination Data
              </h1>
              {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
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
                        Loan Number
                      </th>
                      <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                        Name
                      </th>
                      <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                        Borrow Amount
                      </th>
                      <th style={{ padding: "10px", border: "1px solid #ccc" }}>
                        Lend Amount
                      </th>
                    </tr>
                  </thead>
                  {/* const processedData = response.data.map((obj, index) => {
            if (obj.dateArray.length != 0) {
              console.log(obj.name, obj.mobileNumber);
              obj.dateArray.map((d, idx) => {
                const temp = get100thDayExcludingSundays(d).toLocaleDateString();
                if (dates == temp) console.log("Termintion : ",temp, " loan number: ", idx+1);
              });
            }
            return obj;
          });   */}
    
                  <tbody>
                    <td>
                        h1
                    </td>
                    <td>
                        h2
                    </td>
                    <td>
                        h3
                    </td>
                    <td>
                        h4
                    </td>
                  </tbody>
                </table>
              </ul>
            </div>
          </div>
        </div>
      </div>
      )
}

export default TerminationData
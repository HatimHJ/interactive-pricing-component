import React, { useRef, useState } from "react";
import { useEffect } from "react";

const data = {
	"10K": 8,
	"50K": 12,
	"100K": 16,
	"500K": 24,
	"1M": 36,
};

const Card = () => {
	const [planValue, setPlanValue] = useState(2);
	const [billType, setBillType] = useState("Month");
	const [pageViewer, setPageViewer] = useState("100k");
	const [price, setPrice] = useState(16);
	const [discount, setDiscount] = useState("-25%");

	const keys = Object.keys(data);
	const values = Object.values(data);

	const handlePlan = (e) => {
		const value = e.target.value;
		setPlanValue(value);

		setPageViewer(keys[value]);
		if (billType == "Month") {
			setPrice(values[value]);
		} else {
			setPrice(values[value] - values[value] * 0.25);
		}
	};

	const handleBill = (e) => {
		const isChecked = e.target.checked;
		if (isChecked) {
			setBillType("Year");
			setPrice(values[planValue] - values[planValue] * 0.25);
		} else {
			setBillType("Month");
			setPrice(values[planValue]);
		}
	};

	useEffect(() => {
		window.addEventListener("resize", (e) => {
			const windowWidth = e.target.innerWidth;
			if (windowWidth > 767) {
				setDiscount("25% discount");
			} else {
				setDiscount("-25%");
			}
		});
	});
	return (
		<div className="card-wrapper">
			<div className="container">
				<div className="card">
					<div className="plan">
						<span className="block viewers">{pageViewer} Pageviews</span>
						<input
							type="range"
							className="plan-switch"
							min="0"
							max="4"
							value={planValue}
							step="1"
							onChange={(e) => handlePlan(e)}
							style={{ backgroundSize: `${planValue * 25}% 100%` }}
						/>
						<span className="block price">
							${price} <span className="billing">/ Month</span>
						</span>
					</div>
					<div className="toggle">
						<div className="input-wrapper">
							<input
								type="checkbox"
								id="bill-switch"
								className="billing-input"
								onClick={(e) => handleBill(e)}
							/>
							<label htmlFor="bill-switch" className="bill-switch"></label>
						</div>
						<span className="discount">{discount}</span>
					</div>
					<div className="desc">
						<ul>
							<li>
								<img src="./images/icon-check.svg" alt="" />
								<span>Unlimited websites</span>
							</li>
							<li>
								<img src="./images/icon-check.svg" alt="" />
								<span>100% data ownership</span>
							</li>
							<li>
								<img src="./images/icon-check.svg" alt="" />
								<span>Email reports</span>
							</li>
						</ul>
						<button className="btn">Start my trial</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;

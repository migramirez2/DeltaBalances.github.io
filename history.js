{
	'use strict';
	// Parameters
	// ##########################################################################################################################################
	
	/*
	let etherScanSocket = undefined;
	let pingID = -1;
	*/
	
	// shorthands
	let _util = bundle.utility;
	let _delta = bundle.EtherDelta;
	
	// initiation
	let initiated = false;
	let autoStart = false;
	
	let requestID = 0;
	
	// loading states
    let tableLoaded = false;
	let loadedLogs = 0;
	let displayedLogs = false;
	
	let trigger1 = false;
	let running = false;
	
	
	// settings
    let decimals = false;
	let fixedDecimals = 3; 
	
	let showTransactions = true;
    let showBalances = true;	
	let showCustomTokens = false;
	

    // user input & data
	let publicAddr = '';
    let lastResult = undefined;
	
	let blockReqs = 0;
	let blockLoaded = 0;
	
	// config
	let blocktime = 15;
	var blocknum = -1;
	let startblock = 0;
	let endblock = 'latest';	
	let transactionDays = 1;
	
	let uniqueTokens = {};
	let uniqueBlocks = {}; //date for each block
	let blockDates = {};
	
	// placeholder
	let transactionsPlaceholder = [
		{
			Type: 'Taker',
			Trade: 'Sell',
			Token:  { "name": "ETH"},
			Amount: 0,
			Price: 0,
			ETH: 0,
			Hash: '',
			Block: '',
			Date: toDateTimeNow(),
			Buyer: '',
			Seller: '',
			Details: window.location.origin + window.location.pathname + '/../tx.html',
			Unlisted: false,
		}
	];
		
		
		
	// Functions - initialisation
	// ##########################################################################################################################################
		
	init();
	
    $(document).ready(function() 
	{	
		readyInit();  
    });
	
	function init()
	{	
		// borrow some ED code for compatibility
        _delta.startEtherDelta(() => 
		{	
			//if(!autoStart)
			{
				if(blocknum > -1)
				{
					startblock = getStartBlock(blocknum, transactionDays);
				}
				else {
					_util.blockNumber(_delta.web3, (err, num) => 
					{
						if(!err && num)
						{
							blocknum = num;
							startblock = getStartBlock(blocknum, transactionDays);
						}
					});
				}
			}
			//import of etherdelta config
			if(etherDeltaConfig && etherDeltaConfig.tokens)
			{
				_delta.config.tokens = etherDeltaConfig.tokens;
			}
			else 
			{
				showError('failed to load token data');
				return;
			}
			
			// note all listed tokens
			for(let i = 0; i < _delta.config.tokens.length; i++)
			{
				let token = _delta.config.tokens[i];
				if(token && !tokenBlacklist[token.addr]) {
					token.name = escapeHtml(token.name); // escape nasty stuff in token symbol/name
					token.addr = token.addr.toLowerCase();
					token.unlisted = false;
					_delta.config.tokens[i] = token;
					if(!uniqueTokens[token.addr]) {
						uniqueTokens[token.addr] = token;
					}
				}	
			}
			
			//format MEW tokens like ED tokens
			offlineCustomTokens = offlineCustomTokens.map((x) => { return {"name": escapeHtml(x.symbol),
																		   "addr": x.address.toLowerCase(),
																		   "unlisted": true,
																		   "decimals":x.decimal,
																		  };
																 });
			//filter out custom tokens that have been listed by now
			_delta.config.customTokens = offlineCustomTokens.filter((x) => {return !(uniqueTokens[x.addr]) && true;});
			// note custom tokens
			for(let i = 0; i < _delta.config.customTokens.length; i++)
			{
				let token = _delta.config.customTokens[i];
				if(token && !tokenBlacklist[token.addr] && !uniqueTokens[token.addr]) {
					uniqueTokens[token.addr] = token;
				}
			}
			
			// treat tokens listed as staging as unlisted custom tokens
			if(stagingTokens && stagingTokens.tokens)
			{
				//filter tokens that we already know
				let stageTokens = stagingTokens.tokens.filter((x) => {return !(uniqueTokens[x.addr]) && true;});
				for(let i = 0; i < stageTokens.length; i++)
				{
					let token = stageTokens[i];
					if(token && !tokenBlacklist[token.addr] && !uniqueTokens[token.addr])
					{
						token.name = escapeHtml(token.name); // escape nasty stuff in token symbol/name
						token.unlisted = true;
						uniqueTokens[token.addr] = token;
						_delta.config.customTokens.push(token);
					}
				}
			}
			
			
			initiated = true;
			//if(autoStart)
			//	myClick();
		});
	}
	
	function readyInit()
	{	
		setAddrImage('0x0000000000000000000000000000000000000000');

		// detect enter & keypresses in input
        $('#address').keypress(function(e) 
		{
            if (e.keyCode == 13) {
                $('#refreshButton').click();
                return false;
            } else {
				hideError();
				return true;
			}
        });
		
		$(window).resize(function () { 
			$("#transactionsTable").trigger("applyWidgets"); 
		});
		
		getStorage();

        placeholderTable();
		
		// url parameter ?addr=0x... /#0x..
		let addr = getParameterByName('addr');
		if(! addr)
		{
			let hash = window.location.hash;  // url parameter /#0x...
			if(hash)
				addr = hash.slice(1);
		}
		if(addr)
		{
			addr = getAddress(addr);
			if(addr)
			{
				publicAddr = addr;
				//autoStart = true;
				// auto start loading
				//myClick();
			}
		} 
		else if(publicAddr) //autoload when remember is active
		{
			//autoStart = true;
			// auto start loading
			//myClick();
		}
		else if(!addr && !publicAddr)
		{
			$('#address').focus();
		}
	}
		

	// Functions - input
	// ##########################################################################################################################################
	

	function disableInput(disable)
	{
		$('#refreshButton').prop('disabled', disable);
       // $("#address").prop("disabled", disable);
		$('#loadingTransactions').addClass('dim');
		$("#loadingTransactions").prop("disabled", disable);
	}
	
	function showLoading(trans)
	{
		if(trans)
		{
			$('#loadingTransactions').addClass('fa-spin');
			$('#loadingTransactions').addClass('dim');
			$('#loadingTransactions').prop('disabled', true);
			$('#loadingTransactions').show();
		}
	}
	
	function buttonLoading(trans)
	{
		if(!publicAddr)
		{			
			hideLoading(trans);
			return;
		}
		if(trans)
		{
			$('#loadingTransactions').removeClass('fa-spin');
			$('#loadingTransactions').removeClass('dim');
			$('#loadingTransactions').prop('disabled', false);
			$('#loadingTransactions').show();
		}
	}

	function hideLoading(trans)
	{
		if(!publicAddr)
		{			
			trans = true;
		}

		if(trans) 
		{
			$('#loadingTransactions').hide();
		}
	}
	
	function myClick()
	{
		if(running)
			requestID++;
		if(!initiated)
		{
			//autoStart = true;
			return;
		}
		
		hideError();
		hideHint();
		//disableInput(true);
		$('#downloadTrades').html('');
		// validate address
		if(!autoStart)
			publicAddr = getAddress();
		
		autoStart = false;
		if(publicAddr)
		{
			window.location.hash = publicAddr;
			getAll(false, requestID);
		}
		else
		{
			console.log('invalid input');
            disableInput(false);
			hideLoading(true);
		}
	}
	
	function getAll(autoload, rqid)
	{
		running = true;
		
		trigger1 = true;
		
        lastResult = undefined;
		
        if (publicAddr) 
		{	
			setStorage();
			window.location.hash = publicAddr;
			getTrans(rqid);
        } else {
			running = false;
        }
	}
	
	
	function getTrans(rqid)
	{
		if(!trigger1)
			return;
		
		
		
		trigger1 = false;
		loadedLogs = 0;
		displayedLogs = false;
		disableInput(true);
		blockReqs = 0;
		blockLoaded = 0;
		
		showLoading(true);
			
		$('#transactionsTable tbody').empty();
		if(blocknum > 0) // blocknum also retrieved on page load, reuse it
		{
			console.log('blocknum re-used');
			startblock = getStartBlock(blocknum, transactionDays);
			getTransactions(rqid);
		}
		else 
		{
			console.log("try blocknum v2");
			_util.blockNumber(_delta.web3, (err, num) => 
			{
				if(num)
				{
					blocknum = num;
					startblock = getStartBlock(blocknum, transactionDays);
				}
				getTransactions(rqid);
			});
		}
		
	}
	
	// Functions - validation
	// ##########################################################################################################################################
	// check if input address is valid
    function getAddress(addr) 
	{
        let address = '';
        address = addr ? addr : document.getElementById('address').value;
        address = address.trim();
		
		if ( ! _delta.web3.isAddress(address))
		{
			//check if url ending in address
			if(address.indexOf('/0x') !== -1)
			{
				let parts = address.split('/');
				let lastSegment = parts.pop() || parts.pop();  // handle potential trailing slash
				if(lastSegment)
					address = lastSegment;
			}
			
			if(! _delta.web3.isAddress(address)) 
			{
				if (address.length == 66 && address.slice(0, 2) === '0x') 
				{
					// transaction hash, go to transaction details
					window.location = window.location.origin + window.location.pathname + '/../tx.html#' + address;
					return;
				} 

				// possible private key, show warning   (private key, or tx without 0x)
				if (address.length == 64 && address.slice(0, 2) !== '0x') 
				{
					if (!addr) // ignore if in url arguments
					{
						showError("You likely entered your private key, NEVER do that again");
						// be nice and try generate the address
						address = _util.generateAddress(address);
					}
				} 
				else if (address.length == 40 && address.slice(0, 2) !== '0x') 
				{
					address = `0x${addr}`;
					
				} 
				else 
				{
					if (!addr) // ignore if in url arguments
					{
					   showError("Invalid address, try again");
					}
					return undefined;
				}
				if(! _delta.web3.isAddress(address))
				{
					if (!addr) // ignore if in url arguments
					{
					   showError("Invalid address, try again");
					}
					return undefined;
				}
			}
		}
		
		document.getElementById('address').value = address;
		document.getElementById('addr').innerHTML = 'Address: <a target="_blank" href="' + _delta.addressLink(address) + '">' + address + '</a>';
		$('#overviewNav').attr("href", "index.html#" + address);
		setAddrImage(address);
		return address;
    }
	
	function setAddrImage(addr)
	{
		let icon = document.getElementById('addrIcon');
		icon.style.backgroundImage = 'url(' + blockies.create({ seed:addr.toLowerCase() ,size: 8,scale: 16}).toDataURL()+')';
	}
	
	
	function getStartBlock(blcknm, days)
	{
		startblock = Math.floor(blcknm - ((days * 24 * 60 * 60) / blocktime));
		startblock = Math.max(startblock, 3154197);  //https://etherscan.io/block/3154196  etherdelta_2 creation
		$('#selectedBlocks').html('Selected blocks: ' + startblock + ' - ' + blocknum);
		return startblock;
	}
	
	function validateDays(input)
	{ 
		input = parseInt(input);
		let days = 1;
		if(input < 1)
			days = 1;
		else if(input > 999)
			days = 999;
		else
			days = input;
		
		transactionDays = days;
		if(blocknum > 0)
		{
			getStartBlock(blocknum, transactionDays);
		}
	}
	
	// get parameter from url
	function getParameterByName(name, url) 
	{
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	
	
	
	function getTransactions(rqid)
	{
		
		let start = startblock;
		let end = blocknum;
		let max = 10000;
		
		
		loadedLogs = 0;
		
		let tradeLogResult = [];
		let contractAddr =_delta.config.contractEtherDeltaAddr.toLowerCase();

		let reqAmount = 0;
		for(let i = start; i <= end; i+= (max +1))
		{
			reqAmount++;
		}
		let rpcId = 6;
		for(let i = start; i <= end; i+= (max +1))
		{
			getLogsInRange(i, Math.min(i+max, end), rpcId);
			rpcId++;
		}
		
		function getLogsInRange(startNum, endNum, rpcID)
		{
			_util.getTradeLogs( _delta.web3, contractAddr, startNum, endNum, rpcID, receiveLogs);
		}
		
		function receiveLogs(logs)
		{
			if(rqid <= requestID)
			{
				if(logs)
				{
					loadedLogs++;
					let tradesInResult = parseOutput(logs);
					
					//get tx times
	
					let doneBlocks = {};
					for(let i = 0; i < tradesInResult.length; i++)
					{
						if(!blockDates[tradesInResult[i].Block] && !doneBlocks[tradesInResult[i].Block])
						{
							uniqueBlocks[tradesInResult[i].Block] = 1;
							doneBlocks[tradesInResult[i].Block] = true;
							let url = 'https://api.etherscan.io/api?module=block&action=getblockreward&blockno=' + tradesInResult[i].Block + '&apikey='+_delta.config.etherscanAPIKey;
							blockReqs++;
							$.getJSON( url, function( res ) {
							  if(res && res.status == "1" && res.result)
							  {
								  let unixtime = res.result.timeStamp;
								  if(unixtime)
									  blockDates[tradesInResult[i].Block] = toDateTime(unixtime);
							  }
							  blockLoaded++;
							  if(blockLoaded >= blockReqs)
							  {
								  //tradeLogResult = tradeLogResult.concat(tradesInResult);
								  if(!running)
									done();
							  }
							});
						}
					}
					tradeLogResult = tradeLogResult.concat(tradesInResult);
					done();
				} else
				{
					console.log('failed');
				}
			}
		}
		
		function done()
		{
			if(loadedLogs < reqAmount)
			{
				makeTable(tradeLogResult);
				return;
			}
			
			lastResult = tradeLogResult;
			displayedLogs = true;
			makeTable(lastResult);
		}
		
		function parseOutput(outputLogs)
		{
			let outputs = [];
			let myAddr = publicAddr.toLowerCase();
			let addrrr = myAddr.slice(2);
			
			for(i = 0; i < outputLogs.length; i++)
			{
				//quicker check, instead of decoding hex data
				if(outputLogs[i].data.indexOf(addrrr) === -1)
					continue;
				let unpacked = _util.processOutputMethod(_delta.web3, contractAddr, outputLogs[i]);
				
				if(!unpacked || unpacked.params.length < 6 || unpacked.name != 'Trade')
				{
					continue;
				}
				
				let maker = unpacked.params[4].value.toLowerCase();
				let taker = unpacked.params[5].value.toLowerCase();
				
				let transType = '';
				
				if(taker === myAddr)
					transType = 'Taker';
				else if(maker === myAddr)
					transType = 'Maker';
				
				if(transType)
				{ 
					let tradeType = '';
					let token = undefined;
					let base = undefined;
				
					if(unpacked.params[0].value === _delta.config.tokens[0].addr) // send get eth  -> buy form sell order
					{
						tradeType = 'Buy';
						token = uniqueTokens[unpacked.params[2].value];
						base = uniqueTokens[unpacked.params[0].value];
					}
					else // taker sell
					{
						tradeType = 'Sell';
						token = uniqueTokens[unpacked.params[0].value];
						base = uniqueTokens[unpacked.params[2].value];
					}
					
					if(token && base && token.addr && base.addr)
					{
						let amount = 0;
						let oppositeAmount = 0;
						let buyUser = '';
						let sellUser = '';
						if(tradeType === 'Sell')
						{
							amount = unpacked.params[1].value;
							oppositeAmount = unpacked.params[3].value;
							sellUser = unpacked.params[5].value;
							buyUser = unpacked.params[4].value;
						} else
						{
							oppositeAmount = unpacked.params[1].value;
							amount = unpacked.params[3].value;
							sellUser = unpacked.params[4].value;
							buyUser = unpacked.params[5].value;
						}
						
						let unlisted = token.unlisted;
						let dvsr = divisorFromDecimals(token.decimals)
						let dvsr2 = divisorFromDecimals(base.decimals)
						let val = _util.weiToEth(amount, dvsr);
						let val2 = _util.weiToEth(oppositeAmount, dvsr2);
						
						let price = 0;
						if(val !== 0)
						{
							price = val2 / val;
						}
						
						if(buyUser === myAddr)
							tradeType = "Buy";
						else if(sellUser === myAddr)
							tradeType = "Sell";
					
						let obj = {
							Type: transType,
							Trade: tradeType,
							Token: token,
							Amount: val,
							Price: price,
							ETH: val2,
							Hash: outputLogs[i].transactionHash,
							Date: '??', // TODO
							Block: _util.hexToDec(outputLogs[i].blockNumber),
							Buyer: buyUser,
							Seller: sellUser,
							Details: window.location.origin + window.location.pathname + '/../tx.html#' + outputLogs[i].transactionHash,
							Unlisted: false,
						}
						outputs.push(obj);
					}
				}
				// if
			} // for
			return outputs;
		}

	}
	
	// Functions - output
	// ##########################################################################################################################################
	
	function showHint(text)
	{
		$('#hinttext').html(text);
		$('#hint').show();
	}
	
	function hideHint()
	{
		$('#hint').hide();
	}
	
	function showError(text)
	{
		$('#errortext').html(text);
		$('#error').show();
	}
	
	function hideError()
	{
		$('#error').hide();
	}
	

	function checkBlockDates(trades)
	{
		for(let i = 0; i < trades.length; i++)
		{
			if(blockDates[trades[i].Block])
			{
				trades[i].Date = blockDates[trades[i].Block];
			}
		}
	}

	//balances table
	function makeTable(result)
	{
		checkBlockDates(result);
		$('#transactionsTable tbody').empty();
		let filtered = result;
		let loaded = tableLoaded;
        
		buildHtmlTable('#transactionsTable', filtered, loaded, tradeHeaders);
        trigger();
	}

	// save address for next time
    function setStorage() 
	{
        if (typeof(Storage) !== "undefined")
		{
            if (remember)
			{
                localStorage.setItem("member", 'true');
                if (publicAddr)
                    localStorage.setItem("address", publicAddr);
            } else
			{
                localStorage.removeItem('member');
                localStorage.removeItem('address');
            }
        } 
    }

    function getStorage() 
	{
        if (typeof(Storage) !== "undefined") 
		{
            remember = localStorage.getItem('member') && true;
            if (remember) 
			{
                let addr = localStorage.getItem("address");
				if(addr)
				{
					addr = getAddress(addr);
					if (addr) 
					{
						publicAddr = addr;
						document.getElementById('address').value = addr;
					}
				}
				$('#remember').prop('checked', true);
            }
        } 
    }



    // final callback to sort table
    function trigger() 
	{
        if (tableLoaded) // reload existing table
        {
            $("#transactionsTable").trigger("update", [true, () => {}]);
			$("#transactionsTable thead th").data("sorter", true);
			//$("table").trigger("sorton", [[0,0]]);
            
        } else 
		{
            $("#transactionsTable thead th").data("sorter", true);
            $("#transactionsTable").tablesorter({
				widgets: [ 'scroller' ],
				widgetOptions : {
				  scroller_height : 500,
				},
                sortList: [[7, 1]]
            });

            tableLoaded = true;
        }
		if(displayedLogs)
			trigger1 = true;
		
		
        if(trigger1)
		{
			disableInput(false);
			hideLoading(true);
			running = false;
			requestID++;
			buttonLoading(true);
			downloadTrades();
		}
		else
		{
			hideLoading(trigger1);
		}
        tableLoaded = true;
    }


 // Builds the HTML Table out of myList.
	function buildHtmlTable(selector, myList, loaded, headers) 
	{
        let body = $(selector +' tbody');
        let columns = addAllColumnHeaders(myList, selector, loaded, headers);
        
        for (var i = 0; i < myList.length; i++) 
		{
			if(!showCustomTokens && myList[i].Unlisted)
					continue;
            let row$ = $('<tr/>');

            
            {
                for (var colIndex = 0; colIndex < columns.length; colIndex++) 
				{
					let head = columns[colIndex];
                    let cellValue = myList[i][head];
                    if (cellValue === null) cellValue = "";

					
					if(head == 'Amount' || head == 'Price')
					{
						if(cellValue !== "" && cellValue !== undefined)
						{
							let dec = fixedDecimals;
							if(head == 'Price')
								dec += 2;
							let num = Number(cellValue).toFixed(dec);
							row$.append($('<td/>').html(num));
						}
						else
						{
							row$.append($('<td/>').html(cellValue));
						}
					}
					else if(head == 'Token')
					{
						cellValue = cellValue.name;
						// name  in <!-- --> for sorting
						if( !myList[i].Unlisted)
							row$.append($('<td/>').html('<!--' + cellValue + ' --><a  target="_blank" class="label label-primary" href="https://etherdelta.com/#' + cellValue + '-ETH">' + cellValue + '</a>'));
						else
							row$.append($('<td/>').html('<!--' + cellValue + ' --><a target="_blank" class="label label-warning" href="https://etherdelta.com/#' + myList[i].TokenAddr + '-ETH">' + cellValue + '</a>'));
					}
					else if(head == 'Type')
					{
						if(cellValue == 'Taker')
						{
							row$.append($('<td/>').html('<span class="label label-default" >' + cellValue + '</span>'));
						}
						else if(cellValue == 'Maker')
						{
							row$.append($('<td/>').html('<span class="label label-info" >' + cellValue + '</span>'));
						}
						else
						{
							row$.append($('<td/>').html('<span class="" >' + cellValue + '</span>'));
						}
					} 
					else if ( head == 'Trade')
					{
						if(cellValue == 'Buy')
						{
							row$.append($('<td/>').html('<span class="label label-success" >' + cellValue + '</span>'));
						}
						else if(cellValue == 'Sell')
						{
							row$.append($('<td/>').html('<span class="label label-danger" >' + cellValue + '</span>'));
						}
						else
						{
							row$.append($('<td/>').html('<span class="" >' + cellValue + '</span>'));
						}
					}
					else if( head == 'Hash')
					{
						row$.append($('<td/>').html('<a target="_blank" href="https://etherscan.io/address/' + cellValue + '">'+ cellValue.substring(0,8)  + '...</a>'));
					}
					else if( head == 'Buyer' || head == 'Seller')
					{
						row$.append($('<td/>').html('<a target="_blank" href="https://etherscan.io/address/' + cellValue + '">'+ cellValue.substring(0,8)  + '...</a>'));
					}
					else if(head == 'Details')
					{
						
						row$.append($('<td/>').html('<a href="'+cellValue+'" target="_blank"> See details</a>'));
					}
					else
					{
						row$.append($('<td/>').html(cellValue));
					}
                }
            }
			
			body.append(row$);
        }
    }

	let tradeHeaders = {'Type': 1, 'Trade': 1, 'Token' : 1, 'Amount':1, 'Price':1, 'ETH': 1, 'Hash':1, 'Date':1, 'Buyer':1, 'Seller' : 1, 'Details':1};
    // Adds a header row to the table and returns the set of columns.
    // Need to do union of keys from all records as some records may not contain
    // all records.
    function addAllColumnHeaders(myList, selector, loaded, headers) 
	{
        let columnSet = {};
		
		if(!loaded)
			$(selector + ' thead').empty();
		
        let header1 = $(selector + ' thead');
        let headerTr$ = $('<tr/>');

		if(!loaded)
		{
			header1.empty();
		}
		
        for (var i = 0; i < myList.length; i++) 
		{
            let rowHash = myList[i];
            for (var key in rowHash) 
			{
				if( !columnSet[key] && headers[key] ) 
				{
					columnSet[key] = 1;
					headerTr$.append($('<th/>').html(key));
				}
            }
        }
		if(!loaded)
		{
			header1.append(headerTr$);
			$(selector).append(header1);
		}
		columnSet = Object.keys(columnSet);
        return columnSet;
    }
		
	function toDateTime(secs)
	{
		var utcSeconds = secs;
		var d = new Date(0);
		d.setUTCSeconds(utcSeconds);
		return formatDate(d);
	}
	
	function toDateTimeNow(short)
	{
		var t = new Date();
		return formatDate(t, short);
	}

	function formatDate(d, short)
	{
		var month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear(),
			hour = d.getHours(),
			min = d.getMinutes();
			

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		if (hour < 10) hour = '0' + hour;
		if (min < 10) min = '0' + min;

		if(!short)
			return [year, month, day].join('-') + ' '+ [hour,min].join(':');
		else
			return [year, month, day].join('');
	}

	function divisorFromDecimals(decimals)
	{
		let result = 1000000000000000000;
		if (decimals !== undefined) 
		{
			result = Math.pow(10, decimals);
		}
		return new BigNumber(result);
	}
	
	function downloadTrades()
	{
		if(lastResult)
		{
			checkBlockDates(lastResult);
			let allTrades = lastResult;
			
			var A = [ ['Type', 'Trade', 'Token', 'Amount', 'Price (ETH)', 'Total ETH', 'Date', '', 'Transaction Hash', 'Buyer', 'Seller', 'Token Contract' ] ];  
			// initialize array of rows with header row as 1st item
			for(var i=0;i< allTrades.length;++i)
			{ 
				let arr = [allTrades[i]['Type'], allTrades[i]['Trade'], allTrades[i]['Token'].name, allTrades[i]['Amount'], allTrades[i]['Price'], 
							allTrades[i]['ETH'],  allTrades[i]['Date'], ' ', allTrades[i]['Hash'], allTrades[i]['Buyer'], allTrades[i]['Seller'], allTrades[i]['Token'].addr];
				A.push(arr); 
			}
			var csvRows = [];
			for(var i=0,l=A.length; i<l; ++i){
				csvRows.push(A[i].join(','));   // unquoted CSV row
			}
			var csvString = csvRows.join("\r\n");

			var sp = document.createElement('span');
			sp.innerHTML = "Export trades as CSV ";
			var a = document.createElement('a');
			a.innerHTML = '<i class="fa fa-download" aria-hidden="true"></i>';
			a.href     = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csvString);
			a.target   = '_blank';
			a.download = toDateTimeNow(true) + '-' + publicAddr + " TradeHistory.csv";
			sp.appendChild(a);
			
			$('#downloadTrades').html('');
			var parent = document.getElementById('downloadTrades');
			parent.appendChild(sp);
			//parent.appendCild(a);
			
		}
		
	}
	
	function placeholderTable()
	{
		let result = transactionsPlaceholder;
		makeTable(result);
	}
	
	function escapeHtml(text) {
	  var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	  };

		return text.replace(/[&<>"']/g, function(m) { return map[m]; });
	}

}
# f500_sentiment_analysis
An open-source sentiment analysis tool for tracking public opinion of Fortune-500 companies.
<br /><br />
Landing page (Vue.js, Bootstrap 5) hosted with Google Firebase (Firebase Cloud Functions, Firebase Hosting):
<br />
<a href="https://f500-sentiment.web.app/" target="_blank">FinTalk</a>

***
# **I. Abstract**

One of the most popular social media platforms with active financial discussion is Twitter. We would like to help further democratize stock trading by making  access to insightful stock research easier. We will use the labelled twitter data to train a sentiment analysis classifier in order to help any user quickly ascertain the outlook on markets within social media. This project aims to be particularly useful towards those, such as ourselves, who are interested in trading and investing in the stock market, but have little time to do their own research.

# **II. Introduction**

Sentiment analysis is a popular use of NLP with many different applications - here we aim to track the opinion of stocks as a potential alpha-generating predictor for retail investors' portfolios. One of the largest social medias, Twitter, is home to a large range of opinions and topics. As such, we can gain understanding of financial thoughts, as well as product thoughts: e.g. Tesla cars alongside company valuation. This unstructured data has huge potential in forming long-term buy/sell strategies, looking beyond the balance sheet.

A related work is [SwaggyStocks.com](https://swaggystocks.com/dashboard/home), which tracks market sentiment within Reddit's r/WallStreetBets.

# **III. Materials and Methods**

Our training [dataset](https://www.kaggle.com/datasets/kazanova/sentiment140) consists of random tweets from Twitter between April 6, 2009 to June 25, 2009 (see [Go, Alec, Richa Bhayani, and Lei Huang. "Twitter sentiment classification using distant supervision." CS224N project report, Stanford 1.12 (2009): 2009.](https://www-cs-faculty.stanford.edu/people/alecmgo/papers/TwitterDistantSupervision09.pdf)). We fine-tuned a DistilBERT model trained on general English language, with a fully-connected layer to classify embeddings as positive (1) or negative (0). We then deployed our model with MLFLow Model Registry, which can be used for inference via MLFlow Python API (REST API) with new tweets scraped with [snscrape](https://github.com/JustAnotherArchivist/snscrape) (we previously used the Twitter API v2, but due to API limitations we had to revamp all our code with snscrape instead which proved to be more flexible). The snscrape API is able to provide us with a lot of information about a given post such as the Tweet ID, Date, author, text, retweets, comments and more. We also used the Yahoo Finance's yfinance API to obtain financial data. This API provides the closing price, ticker, financials, cash-flow, volumes of a specific ticker and more.

## Data Preprocessing

We used tweet-preprocessor and SparkNLP's normalizers, lemmatizers and tokenizers to clean the data (remove URLs, mentions, hashtags, emojis, images, digits; lowercase; remove stop words) and tokenise lemmas.

# **IV. Results**

We achieved an accuracy of 87% fine-tuning our processed data, outperforming pretrained sentiment analysis models with character-level embeddings.

# **V. Discussion**

A major limitation of our work is that of the data used to fine-tune. The dataset comes from >10yrs ago, where internet slang, sarcasm, and general linguistics have changed drastically. The rise of r/WSB and other social media financial blogs have lead to new acronyms and other slang. For example, FUD (meaning fear, uncertainty and doubt) was consistently misclassified as positive by our classifier. A possible solution would be translating known acronyms into their individual English words, which in turn would form new tokens. The dataset used was also previously cleaned and made understandable. Therefore, it does not fully represent real-world Twitter data.

Nonetheless, with an accuracy of almost 90%, these are limitations of the method rather than results.

Future work could involve tracking sentiments of specific events/products within a company (sourced from credible financial news e.g. Financial Times), comparing different social media sentiments, and identifying investment stratgies when differences between financial analyst buy/sell recommendations and public sentiment are unusually large.

# **VI. Conclusion**

We fine-tuned a sentiment analysis DistilBERT classifier, with an accuracy of 87%. We also deployed the model using Databricks & MLFlow, where inferences can be made for unseen tweets queried on specific Fortune-500 companies (e.g. Bed, Bath & Beyond, $BBBY). This tool has applications as investment indicators, or as the foundations for future work.

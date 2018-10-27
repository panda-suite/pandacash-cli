# Distributed under the MIT license - https://opensource.org/licenses/MIT
FROM debian:stretch-slim 

ENV VERSION 1.5.0.0
ENV CHECKSUM ffca9f54cc35fcf6cc5a8bd96b4b9c9efa3f474528ab29828d4e4b6e84e7e33d

COPY bitcoin.conf /opt/bitcoin/bitcoin.conf
VOLUME /opt/bitcoin/regtest
ADD https://www.bitcoinunlimited.info/downloads/BUcash-${VERSION}-linux64.tar.gz /tmp/bu.tar.gz
RUN cd /tmp \
  && echo "$CHECKSUM  bu.tar.gz" | sha256sum -c - \
  && tar -xzvf bu.tar.gz -C /usr/local --strip-components=1 --exclude=*-qt \
  && rm bu.tar.gz

EXPOSE 18332 18333

CMD ["bitcoind", "-conf=/opt/bitcoin/bitcoin.conf"]
